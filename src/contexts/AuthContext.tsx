import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';
import { WalletPasswordDialog } from '../components/ui/wallet-password-dialog';
import { usePrivy, useWallets } from '@privy-io/react-auth';

// Phantom wallet types
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
    };
  }
}

interface AuthContextType {
  user: User | null; // Supabase user (for email/password) or Privy user (for wallet)
  profile: Profile | null;
  loading: boolean;
  showSignOutModal: boolean;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  closeSignOutModal: () => void;
  // Single wallet connection state
  connectedWallet: 'solana' | 'ethereum' | 'bitcoin' | null;
  walletAddress: string | null;
  connectWallet: (walletType: 'solana' | 'ethereum' | 'bitcoin') => Promise<void>;
  disconnectWallet: () => Promise<void>;
  // Password dialog state
  showPasswordDialog: boolean;
  passwordDialogWalletType: 'solana' | 'ethereum' | 'bitcoin' | null;
  openPasswordDialog: (walletType: 'solana' | 'ethereum' | 'bitcoin') => void;
  closePasswordDialog: () => void;
  validateWalletPassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Privy hooks for wallet authentication
  const { 
    ready: privyReady, 
    authenticated: privyAuthenticated, 
    user: privyUser, 
    login: privyLogin, 
    logout: privyLogout
  } = usePrivy();
  
  const { wallets, ready: walletsReady } = useWallets();
  
  // Supabase user state (for email/password auth)
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  // Single wallet connection state
  const [connectedWallet, setConnectedWallet] = useState<'solana' | 'ethereum' | 'bitcoin' | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  // Password dialog state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogWalletType, setPasswordDialogWalletType] = useState<'solana' | 'ethereum' | 'bitcoin' | null>(null);

  // Initialize Supabase auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Privy wallet user with Supabase profile
  useEffect(() => {
    if (privyReady && privyAuthenticated && privyUser && wallets.length > 0) {
      syncPrivyUserWithSupabase(privyUser);
    }
  }, [privyReady, privyAuthenticated, privyUser, wallets]);

  // Update wallet connection state based on Privy wallets
  useEffect(() => {
    if (walletsReady && wallets.length > 0) {
      const wallet = wallets[0]; // Use first connected wallet
      const chainId = wallet.chainId;
      
      let walletType: 'solana' | 'ethereum' | 'bitcoin';
      
      // Determine wallet type from chain
      if (chainId === 'solana' || chainId === 'solana:mainnet' || chainId === 'solana:devnet') {
        walletType = 'solana';
      } else if (chainId === 'eip155:1' || chainId === 'eip155:5' || chainId?.startsWith('eip155:')) {
        walletType = 'ethereum';
      } else {
        // Default to ethereum for other EVM chains
        walletType = 'ethereum';
      }
      
      setConnectedWallet(walletType);
      setWalletAddress(wallet.address);
      
      // Save wallet state to profile for persistence
      saveWalletStateToProfile(walletType, wallet.address);
    } else if (walletsReady && wallets.length === 0) {
      // Only clear wallet state if Privy is ready and no wallets are connected
      // This prevents clearing wallet state when Privy is still loading
      setConnectedWallet(null);
      setWalletAddress(null);
      
      // Clear wallet state from profile
      const userId = user?.id || privyUser?.id;
      if (userId) {
        supabase
          .from('profiles')
          .update({
            connected_wallet_type: null,
            connected_wallet_address: null,
          })
          .eq('id', userId);
      }
    }
  }, [walletsReady, wallets, user, privyUser]);

  // Fallback: if Privy wallets aren't ready yet but profile has a saved connection,
  // reflect it in UI so Profile shows "Connected" after navigation.
  useEffect(() => {
    if (profile && (!walletsReady || wallets.length === 0)) {
      const savedType = (profile as any).connected_wallet_type as ('solana' | 'ethereum' | 'bitcoin' | null);
      const savedAddr = (profile as any).connected_wallet_address as (string | null);
      if (savedType && savedAddr) {
        setConnectedWallet(savedType);
        setWalletAddress(savedAddr);
      }
    }
  }, [profile, walletsReady, wallets]);

  // Sync Privy user with Supabase profile
  const syncPrivyUserWithSupabase = async (privyUser: any) => {
    try {
      // Get Privy user ID (use wallet address or email as identifier)
      const privyUserId = privyUser.id;
      const email = privyUser.email?.address || privyUser.linkedAccounts?.find((acc: any) => acc.type === 'email')?.address;
      
      // Check if profile exists in Supabase
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', privyUserId)
        .maybeSingle();

      if (fetchError && !fetchError.message.includes('Could not find')) {
        throw fetchError;
      }

      if (!existingProfile) {
        // Create profile if it doesn't exist
        const username = email?.split('@')[0] || `user_${privyUserId.substring(0, 8)}`;
        const fullName = privyUser.linkedAccounts?.find((acc: any) => acc.type === 'email')?.name || username;
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: privyUserId,
            username: username,
            full_name: fullName,
            mail_address: email,
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          setShowSignOutModal(true);
          setProfile(null);
        } else {
          setProfile(newProfile);
          setShowSignOutModal(false);
        }
      } else {
        setProfile(existingProfile);
        setShowSignOutModal(false);
      }
    } catch (error) {
      console.error('Error syncing Privy user with Supabase:', error);
      setShowSignOutModal(true);
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      console.log('Profile data:', data);
      
      if (!data) {
        // Profile not found - create it if user is authenticated
        if (user?.email) {
          await createProfileForUser(userId, user.email);
          // Reload profile after creation
          const { data: created } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
          if (created) {
            setProfile(created);
          } else {
            setProfile(null);
          }
        } else {
          // User is not authenticated or no email
          setProfile(null);
        }
      } else {
        setProfile(data);
        setShowSignOutModal(false);
        
        // Load saved wallet connection state from profile
        if (data.connected_wallet_type && data.connected_wallet_address) {
          setConnectedWallet(data.connected_wallet_type as 'solana' | 'ethereum' | 'bitcoin');
          setWalletAddress(data.connected_wallet_address);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Create profile for user after email confirmation
  const createProfileForUser = async (userId: string, email: string) => {
    try {
      const username = email.split('@')[0]; // Use email prefix as username
      const fullName = username; // Use username as full name initially
      
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username,
          full_name: fullName,
          mail_address: email,
        });
      
      if (error) throw error;
      console.log('Profile created for user:', userId);
    } catch (error) {
      console.error('Error creating profile for user:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, _username: string, _fullName: string) => {
    // Use Supabase for email/password authentication
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // Do NOT insert into profiles from the client here.
    // RLS will block unauthenticated inserts when email confirmation is required.
    // A DB trigger will create the profile automatically upon user creation.

    if (data.user && !data.session) {
      // Email confirmation required
      throw new Error('Please check your email and click the confirmation link to complete your registration.');
    }
  };

  const signIn = async (email: string, password: string) => {
    // Use Supabase for email/password authentication
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signOut = async () => {
    // Sign out from both Supabase and Privy
    await supabase.auth.signOut();
    if (privyAuthenticated) {
      await privyLogout();
    }
    setProfile(null);
    setConnectedWallet(null);
    setWalletAddress(null);
    setShowSignOutModal(false);
  };

  const closeSignOutModal = () => {
    setShowSignOutModal(false);
  };

  // Single wallet connection functions using Privy
  const connectWallet = async (walletType: 'solana' | 'ethereum' | 'bitcoin') => {
    try {
      // Use Privy to connect wallet
      // Privy handles wallet connections through its modal
      privyLogin();
      
      // For email/password users, we need to save wallet state to profile
      // This will be handled after Privy connection via the useEffect

      // Optimistically reflect connection in UI so buttons flip to "Disconnect"
      // Final address will be populated by the wallets useEffect once Privy finishes.
      setConnectedWallet(walletType);
    } catch (error: any) {
      console.error(`Error connecting ${walletType} wallet:`, error);
      if (error?.message?.includes('User rejected')) {
        alert('Wallet connection was cancelled');
      } else {
        alert(`Failed to connect ${walletType} wallet. Please ensure your wallet is installed and unlocked.`);
      }
    }
  };

  // Save wallet connection state to profile
  const saveWalletStateToProfile = async (walletType: 'solana' | 'ethereum' | 'bitcoin', address: string) => {
    try {
      const userId = user?.id || privyUser?.id;
      if (!userId) return;

      await supabase
        .from('profiles')
        .update({
          connected_wallet_type: walletType,
          connected_wallet_address: address,
        })
        .eq('id', userId);

      console.log(`Saved wallet state: ${walletType} - ${address}`);
    } catch (error) {
      console.error('Error saving wallet state to profile:', error);
    }
  };

  const openPasswordDialog = (walletType: 'solana' | 'ethereum' | 'bitcoin') => {
    // Privy handles wallet authentication natively, so we just connect directly
    connectWallet(walletType);
  };

  const closePasswordDialog = () => {
    setShowPasswordDialog(false);
    setPasswordDialogWalletType(null);
  };

  const validateWalletPassword = async (_password: string): Promise<boolean> => {
    // Privy handles wallet authentication natively through wallet extensions
    // No password validation needed - password parameter kept for interface compatibility
    if (passwordDialogWalletType) {
      await connectWallet(passwordDialogWalletType);
      closePasswordDialog();
      return true;
    }
    return false;
  };

  const disconnectWallet = async () => {
    try {
      // Clear local state
      setConnectedWallet(null);
      setWalletAddress(null);
      
      // Clear wallet state from profile
      const userId = user?.id || privyUser?.id;
      if (userId) {
        await supabase
          .from('profiles')
          .update({
            connected_wallet_type: null,
            connected_wallet_address: null,
          })
          .eq('id', userId);
      }
    } catch (e) {
      console.error('Error disconnecting from wallet:', e);
      setConnectedWallet(null);
      setWalletAddress(null);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    // Use Supabase user ID if available, otherwise Privy user ID
    const userId = user?.id || privyUser?.id;
    if (!userId) throw new Error('No user logged in');

    // Try full update first
    const { error: firstError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (firstError) {
      const msg = String(firstError.message || '');
      // Handle missing columns gracefully
      if (msg.includes("Could not find the 'website' column") || msg.includes("Could not find the 'x_url' column")) {
        console.warn('Missing website/x_url columns detected. Please add them to your Supabase database:');
        console.warn('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS website text;');
        console.warn('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS x_url text;');
        
        // Update without the missing columns
        const retry = { ...updates } as any;
        delete retry.website;
        delete retry.x_url;

        const { error: retryError } = await supabase
          .from('profiles')
          .update(retry)
          .eq('id', userId);
        if (retryError) throw retryError;
      } else {
        throw firstError;
      }
    }

    await loadProfile(userId);
  };

  return (
    <AuthContext.Provider value={{ 
      user: user || privyUser as any, // Use Supabase user or Privy user 
      profile, 
      loading, 
      showSignOutModal, 
      signUp, 
      signIn, 
      signOut, 
      updateProfile, 
      closeSignOutModal,
      // Single wallet connection state and functions
      connectedWallet,
      walletAddress,
      connectWallet,
      disconnectWallet,
      // Password dialog state and functions
      showPasswordDialog,
      passwordDialogWalletType,
      openPasswordDialog,
      closePasswordDialog,
      validateWalletPassword
    }}>
      {children}
      {showSignOutModal && <SignOutModal />}
      {showPasswordDialog && passwordDialogWalletType && (
        <WalletPasswordDialog
          isOpen={showPasswordDialog}
          onClose={closePasswordDialog}
          onConfirm={validateWalletPassword}
          walletType={passwordDialogWalletType}
          loading={false}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Sign Out Modal Component
const SignOutModal: React.FC = () => {
  const { signOut, closeSignOutModal } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#171B20] rounded-lg shadow-lg w-[335px] h-[200px] min-[450px]:w-[400px] min-[450px]:h-[200px] mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-light-modegrey dark:text-light-modewhite dark:text-[#F4FAFF]">
            Profile Not Found
          </h2>
          <button
            onClick={closeSignOutModal}
            className="w-8 h-8 bg-[#F9F9F9] dark:bg-[#0D1117] rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-light-modegrey dark:text-light-modewhite dark:text-[#F4FAFF] text-lg">×</span>
          </button>
        </div>
        
        <p className="text-light-modegrey dark:text-light-modewhite dark:text-[#F4FAFF] mb-6">
          Your profile could not be found. Please sign out and try again.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={closeSignOutModal}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 px-4 py-2 bg-red-600 text-light-modewhite dark:text-[#F4FAFF] rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

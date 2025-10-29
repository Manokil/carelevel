import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

export const EditProfile = (): JSX.Element => {
  const { 
    user, 
    profile, 
    updateProfile, 
    loading: authLoading,
    connectedWallet,
    connectWallet,
    disconnectWallet
  } = useAuth();
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [category, setCategory] = useState('');
  const [website, setWebsite] = useState('');
  const [xUrl, setXUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [walletMessage, setWalletMessage] = useState('');
  const navigate = useNavigate();


  // Categories for the dropdown
  const categories = [
    'Entrepreneur',
    'Lifestyle',
    'Web3',
    'Audio',
    'Visual Arts',
    'Education',
    'Health',
    'Content & Social Media',
    'Finance & Marketing',
    'Software & Technology',
    'Other'
  ];

  // Username validation (at least 3 chars, alphanumeric and underscores)
  const isValidUsername = (name: string) => /^[a-zA-Z0-9_]{3,}$/.test(name);

  // Handle wallet connection with feedback
  const handleWalletConnection = async (walletType: 'solana' | 'ethereum' | 'bitcoin') => {
    if (connectedWallet === walletType) {
      // Disconnect if already connected
      try {
        setWalletConnecting(true);
        setWalletMessage('Disconnecting wallet...');
        await disconnectWallet();
        setWalletMessage('Wallet disconnected successfully!');
        setTimeout(() => setWalletMessage(''), 3000);
      } catch (error) {
        setWalletMessage('Failed to disconnect wallet');
        setTimeout(() => setWalletMessage(''), 3000);
      } finally {
        setWalletConnecting(false);
      }
    } else {
      // Connect wallet
      try {
        setWalletConnecting(true);
        setWalletMessage(`Connecting to ${walletType} wallet...`);
        await connectWallet(walletType);
        setWalletMessage(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} wallet connected successfully!`);
        setTimeout(() => setWalletMessage(''), 3000);
      } catch (error) {
        setWalletMessage(`Failed to connect ${walletType} wallet`);
        setTimeout(() => setWalletMessage(''), 3000);
      } finally {
        setWalletConnecting(false);
      }
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile) {
      setFullName(profile.full_name);
      setBio(profile.bio || '');
      // Note: category field needs to be added to the database schema
      setCategory((profile as any).category || '');
      setWebsite((profile as any).website || '');
      setXUrl((profile as any).x_url || '');
    }
  }, [user, profile, authLoading, navigate]);

  // Listen for wallet connection changes
  useEffect(() => {
    if (connectedWallet && !walletConnecting) {
      setWalletMessage(`${connectedWallet.charAt(0).toUpperCase() + connectedWallet.slice(1)} wallet connected!`);
      setTimeout(() => setWalletMessage(''), 3000);
    }
  }, [connectedWallet, walletConnecting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
        await updateProfile({
          full_name: fullName,
          bio: bio || undefined,
          // Note: category field needs to be added to the database schema
          category: category || undefined,
          website: website || undefined,
          x_url: xUrl || undefined,
        } as any);
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#171B20] transition-colors duration-100">
      <div className="mx-auto">
        <div className="flex flex-col gap-6">                         

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">               

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className='w-full'>
                    <Label htmlFor="fullName" className="text-light-modegrey">
                      Username
                    </Label>
                    <div className='relative'>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modewhite dark:text-[#F4FAFF] pr-8"
                        required
                      />
                      {isValidUsername(fullName) && (
                        <img src="/tick.svg" alt="Tick" className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
                      )}
                    </div>  
                  </div> 
                  <div className='w-full'>
                    <Label htmlFor="fullName" className="text-light-modegrey">
                      Email
                    </Label>
                     <Input
                       id="email"
                       type="email"
                       value={user?.email || ''}
                       disabled
                       placeholder="Email address"
                       className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modegrey cursor-not-allowed placeholder:text-light-modegrey"
                     />                     
                  </div>  
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio" className="text-light-modegrey">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe yourself"
                    className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey min-h-[80px]"
                    maxLength={400}
                  />                  
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="category" className="text-light-modegrey">
                    Category
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
                  >
                    <option value="" className="bg-light-modeblack text-light-modewhite dark:text-[#F4FAFF]">
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-light-modeblack text-light-modewhite dark:text-[#F4FAFF]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio" className="text-light-modegrey">
                    Connected wallet
                  </Label>
                  <div className='bg-light-modeblack w-full rounded-md py-1'>                   
                    {/* Solana Wallet */}
                    <div 
                      className={`flex items-center justify-between w-full transition-colors duration-200 ${walletConnecting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-white/30'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!walletConnecting) {
                          handleWalletConnection('solana');
                        }
                      }}>
                      <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-white dark:text-[#F4FAFF] text-base px-2 py-1 truncate">
                        <img src="/token-branded-sol.svg" alt="Link" className="w-4 h-4 mx-1 flex-shrink-0" />
                        Solana Wallet ( SOL )
                      </p>  
                      <button 
                        className={`text-white dark:text-[#F4FAFF] text-sm py-0.5 px-2 rounded-md mr-4 ${connectedWallet === 'solana' ? 'bg-gray-500' : 'bg-green'} ${walletConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={walletConnecting}
                      >
                        {walletConnecting ? '...' : (connectedWallet === 'solana' ? 'Disconnect' : 'Connect')}
                      </button>                   
                    </div>
                    
                    {/* Ethereum Wallet */}
                    <div 
                      className={`flex items-center justify-between w-full transition-colors duration-200 ${walletConnecting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-white/30'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!walletConnecting) {
                          handleWalletConnection('ethereum');
                        }
                      }}>
                      <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-white dark:text-[#F4FAFF] text-base px-2 py-1 truncate">
                        <img src="/image-2.png" alt="Link" className="w-4 h-4 mx-1 flex-shrink-0" />
                        Ethereum Wallet ( EVM )
                      </p>
                      <button 
                        className={`text-white dark:text-[#F4FAFF] text-sm py-0.5 px-2 rounded-md mr-4 ${connectedWallet === 'ethereum' ? 'bg-gray-500' : 'bg-green'} ${walletConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={walletConnecting}
                      >
                        {walletConnecting ? '...' : (connectedWallet === 'ethereum' ? 'Disconnect' : 'Connect')}
                      </button>                      
                    </div>
                    
                    {/* Bitcoin Wallet */}
                    <div 
                      className={`flex items-center justify-between w-full transition-colors duration-200 ${walletConnecting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-white/30'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!walletConnecting) {
                          handleWalletConnection('bitcoin');
                        }
                      }}>
                      <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-white dark:text-[#F4FAFF] text-base px-2 py-1 truncate">
                        <img src="/cryptocurrency-color-btc.svg" alt="Link" className="w-4 h-4 mx-1 flex-shrink-0" />
                        Bitcoin Wallet ( BTC )
                      </p>          
                      <button 
                        className={`text-white dark:text-[#F4FAFF] text-sm py-0.5 px-2 rounded-md mr-4 ${connectedWallet === 'bitcoin' ? 'bg-gray-500' : 'bg-green'} ${walletConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={walletConnecting}
                      >
                        {walletConnecting ? '...' : (connectedWallet === 'bitcoin' ? 'Disconnect' : 'Connect')}
                      </button>            
                    </div>                   
                  </div>                 
                </div>

                {/* Wallet Connection Feedback */}
                {walletMessage && (
                  <div className={`p-3 rounded-md border ${
                    walletMessage.includes('successfully') 
                      ? 'bg-green/10 border-green text-green' 
                      : walletMessage.includes('Failed') || walletMessage.includes('Failed')
                      ? 'bg-red/10 border-red text-red'
                      : 'bg-blue/10 border-blue text-blue'
                  }`}>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-sm">
                      {walletMessage}
                    </p>
                  </div>
                )}

                {walletConnecting && (
                  <div className="p-3 rounded-md bg-blue/10 border border-blue">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-blue text-sm flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue border-t-transparent rounded-full animate-spin"></div>
                      {walletMessage}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <div className='w-full'>
                    <Label htmlFor="fullName" className="text-light-modegrey">
                      Website
                    </Label>
                    <div className='relative'>
                      <Input
                        id="website"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="ex. carelevel.website.com"
                        className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey pr-8"
                        required
                      />                      
                    </div>  
                  </div> 
                  <div className='w-full'>
                    <Label htmlFor="fullName" className="text-light-modegrey">
                    X (formerly Twitter) url
                    </Label>
                     <Input
                       id="x-url"
                       type="text"
                       value={xUrl}
                       onChange={(e) => setXUrl(e.target.value)}
                       placeholder="ex. @carelevelprofile"
                       className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey pr-8"
                       required
                     />                     
                  </div>  
                </div>

                <div className="h-px bg-light-modegrey w-full my-2"></div>

                {error && (
                  <div className="p-3 rounded-md bg-red/10 border border-red">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-red text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {success && (
                  <div className="p-3 rounded-md bg-green/10 border border-green">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-green text-sm">
                      Profile updated successfully! Redirecting...
                    </p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-[50%] sm:w-[35%] "
                  >                  
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
};

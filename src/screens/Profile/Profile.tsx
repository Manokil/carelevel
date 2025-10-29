import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase, Transaction } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '../../components/ui/table';
import {Menu, X } from 'lucide-react';

// Phantom wallet types
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
    };
  }
}

export const Profile = (): JSX.Element => {
  const { user, profile, loading: authLoading, connectedWallet, disconnectWallet } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      loadTransactions();
    }
  }, [user, authLoading, navigate]);

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Loading...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center transition-colors duration-300">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Profile not found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light-modeblack dark:bg-light-modeblack w-full min-h-screen flex flex-col transition-colors duration-100">
      <header className="flex items-center justify-between px-4 md:px-8 lg:px-[170px] py-6 lg:py-8 relative z-20 gap-4">
        {/* Logo */}
        <div className="inline-flex items-center gap-2">
          <img
            className="w-8 h-8"
            alt="Subtract"
            src="/subtract.svg"
          />
          <div className="font-carelevel text-light-modewhite dark:text-[#F4FAFF] text-lg leading-[26px]">
            CARELEVEL
          </div>
          <nav className="hidden min-[1120px]:flex inline-flex items-center gap-4">
            <a
              href="#about"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite dark:text-[#F4FAFF] transition-colors"
            >
              About
            </a>
            <a
              href="#leaderboards"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite dark:text-[#F4FAFF] transition-colors"
            >
              Leaderboards
            </a>
            <a
              href="#spotlight"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite dark:text-[#F4FAFF] transition-colors"
            >
              Spotlight
            </a>
          </nav>
        </div>

        {/* Desktop Navigation - Hidden below 1120px */}
        <div className="hidden min-[1120px]:flex items-center gap-[50px]">
          <div className="inline-flex items-center gap-2">
            <Button
              onClick={() => navigate('/buy')}
              className="h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-xs hover:bg-green/90 transition-all duration-200">
              Buy $CARELEVEL
            </Button>

        <Button
              onClick={() => navigate('/profile')}
              className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-xs hover:bg-light-modedark-grey/90 transition-all duration-200">
              <img src="/profile.svg" alt="Profile" className="w-3 h-3 brightness-0 dark:brightness-0 dark:invert" />
              {profile?.username || 'Profile'}
            </Button>

            <div className="inline-flex gap-0.5 p-[3px] bg-light-modeblack rounded-[32px] border border-solid border-[#d7dce5] dark:border-white/20">
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'light' ? 'bg-light-modeborder-2' : ''}`}
              >
                <img
                  className="w-3.5 h-3.5"
                  alt="Icon solid sun"
                  src="/icon-solid-sun.svg"
                />
              </button>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'dark' ? 'bg-light-modeborder-2' : ''}`}
              >
                <img
                  className="w-3.5 h-3.5"
                  alt="Icon outline moon"
                  src="/icon-outline-moon.svg"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Controls - Shown below 1120px */}
        <div className="min-[1120px]:hidden flex items-center gap-2">
          {/* Theme Toggle - Always visible */}
          <div className="inline-flex gap-0.5 p-[3px] bg-light-modeblack rounded-[32px] border border-solid border-[#d7dce5] dark:border-white/20">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'light' ? 'bg-light-modeborder-2' : ''}`}
            >
              <img
                className="w-3.5 h-3.5"
                alt="Icon solid sun"
                src="/icon-solid-sun.svg"
              />
            </button>
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'dark' ? 'bg-light-modeborder-2' : ''}`}
            >
              <img
                className="w-3.5 h-3.5"
                alt="Icon outline moon"
                src="/icon-outline-moon.svg"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 hover:bg-light-modedark-grey/90 transition-all duration-100"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
            ) : (
              <Menu className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-full bg-light-modedark-grey border-l border-light-modeborder dark:border-white/20 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } min-[1120px]:hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between">                    
            <div className="inline-flex items-center gap-2">
            <img
              className="w-8 h-8"
              alt="Subtract"
              src="/subtract.svg"
            />
            <div className="font-carelevel text-light-modewhite dark:text-[#F4FAFF] text-lg leading-[26px]">
              CARELEVEL
            </div>
          </div>  
          <div className="flex items-center justify-center">
            <div className="inline-flex gap-0.5 items-center justify-center p-[3px] bg-light-modeblack rounded-[32px] border border-solid border-[#d7dce5] dark:border-white/20">
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'light' ? 'bg-light-modeborder-2' : ''}`}
              >
                <img
                  className="w-3.5 h-3.5"
                  alt="Icon solid sun"
                  src="/icon-solid-sun.svg"
                />
              </button>
              <button
                onClick={toggleTheme}
                className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-100 ${theme === 'dark' ? 'bg-light-modeborder-2' : ''}`}
              >
                <img
                  className="w-3.5 h-3.5"
                  alt="Icon outline moon"
                  src="/icon-outline-moon.svg"
                />
              </button>
            </div>
            <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end p-1 ml-3 text-light-modewhite dark:text-[#F4FAFF] hover:bg-light-modeblack rounded-md transition-colors border border-solid border-[#d7dce5] dark:border-white/20">
              <X className="w-6 h-6" />
            </button>
          </div>      
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 mb-8 items-center justify-center">
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-base tracking-[0] leading-5 hover:text-green transition-colors py-2"
            >
              About
            </a>
            <a
              href="#leaderboards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-base tracking-[0] leading-5 hover:text-green transition-colors py-2"
            >
              Leaderboards
            </a>
            <a
              href="#spotlight"
              onClick={() => setIsMobileMenuOpen(false)}
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-base tracking-[0] leading-5 hover:text-green transition-colors py-2"
            >
              Spotlight
            </a>
          </nav>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/buy');
              }}
              className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-green/90 transition-all duration-200">
              Buy $CARELEVEL
        </Button>

            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/edit-profile');
              }}
              className="w-full h-auto bg-light-modeblack rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-light-modedark-grey/90 transition-all duration-200">
              Edit Profile
            </Button>
              </div>
              </div>
            </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 min-[1120px]:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="px-4 py-8 md:px-8 lg:px-[170px]">
        <div className="max-w-6xl mx-auto">       

        <div className="flex gap-6 md:flex-row flex-col">
          <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] dark:border-white/20 transition-all duration-100 md:w-[40%] w-full">
            <CardContent className="p-6 md:p-8">
              <div className=" md:items-start gap-6">                

                <div className=" ">
                  <div className="mb-2">
                    <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-xl md:text-3xl">
                      {profile.full_name}
                    </h1>
                    <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                      @{user?.email}
                    </span>
                  </div>
                </div>
                <div className='py-4'>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">Bio</p>
                  <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal  text-light-modewhite dark:text-[#F4FAFF] text-xs py-1 rounded-md">                    
                      {profile.bio}
                    </p>
                </div>
                 <div>
                   <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">Connected Wallet</p>
                   {connectedWallet ? (
                     <div 
                       className="flex items-center justify-between bg-white/20 w-full border border-solid border-[#d7dce5] dark:border-white/20 rounded-md cursor-pointer bg-light-modeblack hover:bg-white/30 transition-colors duration-200 py-0.5 my-1"
                       onClick={() => disconnectWallet()}
                     >
                       <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-light-modewhite dark:text-[#F4FAFF] text-xs px-2 py-1 truncate">
                         {connectedWallet === 'solana' && <img src="/token-branded-sol.svg" alt="Solana" className="w-4 h-4 mx-1 flex-shrink-0 brightness-0 dark:brightness-0 dark:invert" />}
                         {connectedWallet === 'ethereum' && <img src="/image-2.png" alt="Ethereum" className="w-4 h-4 mx-1 flex-shrink-0" />}
                         {connectedWallet === 'bitcoin' && <img src="/cryptocurrency-color-btc.svg" alt="Bitcoin" className="w-4 h-4 mx-1 flex-shrink-0" />}
                         {connectedWallet === 'solana' && 'Solana Wallet ( SOL )'}
                         {connectedWallet === 'ethereum' && 'Ethereum Wallet ( EVM )'}
                         {connectedWallet === 'bitcoin' && 'Bitcoin Wallet ( BTC )'}
                       </p>
                       <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-[12px] px-2 truncate text-[#29A140]">              
                         Connected
                       </p>
                     </div>
                   ) : (
                     <div 
                       className="flex items-center justify-between bg-white/20 w-full border border-solid border-[#d7dce5] dark:border-white/20 rounded-md cursor-pointer bg-light-modeblack hover:bg-white/30 transition-colors duration-200 py-0.5 my-1"
                       onClick={() => navigate('/edit-profile')}
                     >
                       <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-light-modewhite dark:text-[#F4FAFF] text-xs px-2 py-1 truncate">
                         <img src="/token-branded-sol.svg" alt="Wallet" className="w-4 h-4 mx-1 flex-shrink-0 brightness-0 dark:brightness-0 dark:invert" />
                         No Wallet Connected
                       </p>
                       <p className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-[12px] px-2 truncate text-[#f44336]">              
                         Click to Connect
                       </p>
                     </div>
                   )}                   
                 </div>
                <div className='py-4'>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                   Links
                  </p>
                  <p 
                    className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-light-modewhite dark:text-[#F4FAFF] text-xs py-1 underline cursor-pointer hover:text-grey dark:hover:text-white/50 transition-colors duration-200"
                    onClick={() => profile.website && window.open(profile.website.startsWith('http') ? profile.website : `https://${profile.website}`, '_blank')}
                  >
                    <img src="/twitter.svg" alt="Link" className="w-4 h-4 mr-1 brightness-0 dark:brightness-0 dark:invert" />
                     {profile.website}
                  </p>
                  <p 
                    className="[font-family:'Noto_Sans',Helvetica] flex items-center gap-2 font-normal text-light-modewhite dark:text-[#F4FAFF] text-xs underline cursor-pointer hover:text-grey dark:hover:text-white/50 transition-colors duration-200"
                    onClick={() => profile.x_url && window.open(profile.x_url.startsWith('http') ? profile.x_url : `https://${profile.x_url}`, '_blank')}
                  >
                    <img src="/world.svg" alt="Link" className="w-4 h-4 mr-1 brightness-0 dark:brightness-0 dark:invert" />
                   {profile.x_url}
                  </p>

                </div>
                <div className="h-px bg-light-modegrey w-full my-2 dark:bg-white/20"></div>
                <div className="flex text-center md:text-left gap-2 mt-3 mb-2">
                  <Button
                    onClick={() => navigate('/edit-profile')}
                    className="h-auto bg-light-modeblack dark:bg-white/20 rounded-md border border-solid border-[#d7dce5] dark:border-white/20 tracking-tight px-3 py-1.5 my-2 [font-family:'Noto_Sans',Helvetica] text-light-modewhite dark:text-[#F4FAFF] text-[10px] hover:bg-light-modedark-grey/90"
                  >
                    <img 
                      src="/edit.svg"
                      alt="Edit Profile"
                      className="lg:w-4 lg:h-4 w-3 h-3 mx-1 brightness-0 dark:brightness-0 dark:invert"
                    />
                    Edit Profile
                  </Button>

                  <Button
                    onClick={() => navigate('/edit-profile')}
                    className="h-auto bg-light-modeblack dark:bg-white/20 rounded-md border border-solid border-white/20 px-3 py-1.5 my-2 [font-family:'Noto_Sans',Helvetica] tracking-tight text-light-modewhite dark:text-[#F4FAFF] text-[10px] hover:bg-light-modedark-grey/90"
                  >
                    <img 
                      src="/password.svg"
                      alt="Change Password"
                      className="lg:w-4 lg:h-4 w-3 h-3 mx-1 brightness-0 dark:brightness-0 dark:invert"
                    />
                    Change Password
                  </Button>
                </div>
                <Button
                  onClick={() => navigate('/edit-profile')}
                    className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#f44336] px-3 py-2 [font-family:'Noto_Sans',Helvetica] tracking-tight text-[#f44336] text-[10px] hover:bg-light-modedark-grey/90"
                >
                    Delete Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="md:w-[60%] w-full">
            <div className="flex gap-6">
              <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] dark:border-white/20 transition-all duration-100 w-full items-center justify-center flex">
                <CardContent className="p-3">
                <div className="flex flex-col items-center gap-3">
                    <div className="text-center">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                        Rank
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-xl">
                        {parseFloat(profile.carelevel_score.toString()).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] dark:border-white/20 transition-all duration-100 w-full items-center justify-center flex">
                <CardContent className="p-3">
                   <div className="flex items-center gap-1">
                  <img
                    src="/ph-coin-vertical-fill.svg"
                    alt="Score"
                       className="flex items-center justify-center w-4 h-4 brightness-0 dark:brightness-0 dark:invert"
                  />
                  <div className="text-center">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                         Total Score
                       </p>                      
                     </div>                    
                   </div>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-xl text-center">
                        ${parseFloat(profile.total_donated.toString()).toLocaleString()}
                  </p>
                </CardContent>
              </Card>

            </div> 
            <div className="flex gap-6 mt-4 mb-6">
              <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey items-center border-[#d7dce5] dark:border-white/20 transition-all duration-100 w-full items-center justify-center flex">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center gap-3">                    
                    <div className="text-center">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                        Total Donation
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-xl">
                      {parseFloat(profile.carelevel_score.toString()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

              <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] dark:border-white/20 transition-all duration-100 w-full items-center justify-center flex">
                <CardContent className="p-3">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                        Total Purchase
                    </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-xl">
                      ${parseFloat(profile.total_donated.toString()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

                  </div>
            <Card className="bg-light-modeblack dark:bg-light-modeblack border-[#d7dce5] dark:border-white/20 transition-all duration-100 h-full">
            <CardContent className="p-0">
              <div className="bg-white dark:bg-light-modedark-grey p-2 rounded-t-md border-b border-solid border-black/30 dark:border-white/20">
                <h2 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-sm">
                  Donation History
                </h2>
          </div>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base">
                    No transactions yet
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-light-modeblack">
                  <Table>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-0 hover:bg-light-modeblack/50">
                          <TableCell className="w-[40%]">
                          {new Date(transaction.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="w-[20%] [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm">
                            ${transaction.amount}
                          </TableCell>
                          <TableCell className="w-[20%] [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                            {transaction.token_type}
                          </TableCell>                         
                          <TableCell className=" w-[15%] [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm px-0">
                          <span
                              className={`inline-block py-1 rounded text-xs font-medium flex items-center justify-center${
                                transaction.status === 'success'
                                  ? 'bg-green/20 text-green'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow/20 text-yellow'
                                  : 'bg-red/20 text-red'
                              }`}
                            >
                              {transaction.status}
                            <img src="/share.svg" alt="Share" className="w-4 h-4 mx-5 brightness-0 dark:brightness-0 dark:invert" />
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

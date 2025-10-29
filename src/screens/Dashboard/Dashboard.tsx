import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase, Profile } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  HeartIcon,
  TrendingUpIcon,
  Menu,
  X,
} from 'lucide-react';

const acceptedTokens = [
  { src: "/token-branded-sol.svg", alt: "SOL" },
  { src: "/image-2.png", alt: "Token" },
  { src: "/cryptocurrency-color-btc.svg", alt: "BTC" },
];

const statsCards = [
  {
    icon: '/icon-outline-currency-dollar.svg',
    title: 'Price',
    value: '$0.0000083262',
    change: '+2.5%',
    changeType: 'positive',
  },
  {
    icon: '/mdi-chart-timeline-variant-shimmer.svg',
    title: 'Market Cap',
    value: '$793K',
    status: 'Live',
    statusType: 'live',
  },
  {
    icon: '/icon-outline-heart.svg',
    title: 'Donated',
    value: '$158.2K',
    status: 'Active',
    statusType: 'active',
  },
];

export const Dashboard = (): JSX.Element => {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      loadLeaderboard();
    }
  }, [user, authLoading, navigate]);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('carelevel_score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center transition-colors duration-100">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Loading...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center transition-colors duration-100">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Profile not found
        </p>
      </div>
    );
  }

  const userRank = leaderboard.findIndex((p) => p.id === profile.id) + 1;

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
                navigate('/profile');
              }}
              className="w-full h-auto bg-light-modeblack rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-light-modedark-grey/90 transition-all duration-200">
              Profile
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

      <section className="relative items-start justify-center px-4 md:py-32 pt-16 pb-0 md:px-8 lg:px-[240px]">
        <div className="relative flex flex-col items-center min-[576px]:items-start gap-6 w-full z-[10]">
          <div className=" items-start">
            
              <h1 className="[font-family:'Noto_Sans',Helvetica] font-medium  text-light-modewhite dark:text-[#F4FAFF] text-[48px] tracking-[-2.00px] leading-[56px] md:leading-[84px] md:text-7xl min-[576px]:text-left w-full max-w-[280px] min-[576px]:max-w-[335px] md:max-w-none">
                <span className="whitespace-nowrap">Improve Your</span>
                <br />
                Carelevel
          </h1>

          </div>
          <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[16px] md:text-xl tracking-[0] leading-[24px] md:leading-[30px] text-center min-[576px]:text-left whitespace-nowrap">The cryptocurrency that levels up your passion.</p>

          <div className="flex flex-col md:flex-row items-center min-[576px]:items-start md:items-center gap-4 md:gap-6 w-full max-w-[280px] min-[576px]:max-w-[335px] md:max-w-none">
            <Button
              onClick={() => user ? navigate('/donate') : navigate('/login')}
              className="h-auto flex items-center gap-2 md:px-20 px-32 py-2 rounded-md border border-solid border-[#cccccc2e] shadow-button bg-[linear-gradient(163deg,rgba(75,93,217,1)_0%,rgba(75,162,255,1)_100%)] hover:opacity-90 transition-all duration-200">
              <HeartIcon className="w-4 h-4 text-white dark:text-[#F4FAFF]" />
              <span className="[font-family:'Noto_Sans',Helvetica] font-semibold text-white dark:text-[#F4FAFF] text-base tracking-[0] leading-6">
                Donate
              </span>
            </Button>

            <div className="flex gap-4 items-center rounded-md">
              <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5">
                Accepts:
              </div>

              <div className="inline-flex items-center gap-1">
                {acceptedTokens.map((token, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 p-1 bg-light-modedark-grey rounded-[32px] border border-solid border-[#cccccc2e]"
                  >
                    <img
                      className="w-5 h-5 rounded-[32px] object-cover"
                      alt={token.alt}
                      src={token.src}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Pattern background - absolute on desktop, relative on mobile */}
        <div className="relative top-[-80px] min-[576px]:absolute top-0 min-[576px]:top-[-100px] right-0 w-full min-[576px]:w-[733px] h-[400px] min-[576px]:h-full pointer-events-none z-0 mt-8 min-[576px]:mt-0">
          <img
            className="absolute top-0 right-0 w-full h-auto object-contain opacity-90"
            alt="Pattern"
            src={theme === 'light' ? "/Pattern-light.svg" : "/Pattern-dark.svg"}
          />
          <img
            className="absolute top-[285px] left-[308px] min-[576px]:left-[421px] -translate-x-1/2 w-[27px] h-[61px] z-10"
            alt="Vector"
            src="/vector-1.svg"
          />
        </div>
      </section>   
      <section className="flex flex-col items-center gap-12 md:gap-[100px] pt-32 md:pt-[90px] pb-12 md:pb-[100px] px-4 md:px-8 lg:px-[170px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {statsCards.map((card, index) => (
            <Card
              key={index}
              className="flex-1 bg-white dark:bg-[#171B20] rounded-md overflow-hidden border border-solid border-[#d7dce5] dark:border-white/20 shadow-button"
            >
              <CardContent className="flex flex-col items-start gap-4 px-8 py-6 bg-white dark:bg-[#171B20] relative">
                <div className="flex items-center justify-center gap-2 w-full">
                  <img className="w-5 h-5" alt={card.title} src={card.icon} />
                  <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey dark:text-light-modegrey text-base text-center tracking-[0] leading-6">
                    {card.title}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <div className="[font-family:'Noto_Sans',Helvetica] font-semibold text-black dark:text-light-modewhite dark:text-[#F4FAFF] text-[32px] tracking-[0] leading-10">
                    {card.value}
                  </div>

                  <div className="inline-flex gap-[4.44px] items-center">
                    {card.change && (
                      <>
                        <TrendingUpIcon className="w-4 h-4 text-green" />
                        <div className="[font-family:'Noto_Sans',Helvetica] font-bold text-green text-base tracking-[0] leading-6">
                          {card.change}
                        </div>
                      </>
                    )}
                    {card.status && (
                      <div
                        className={`[font-family:'Noto_Sans',Helvetica] font-normal text-base tracking-[0] leading-6 ${card.statusType === "live" ? "text-red" : "text-green"}`}
                      >
                        {card.status}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>     
    </div>
  );
};

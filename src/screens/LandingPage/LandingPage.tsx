import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  HeartIcon,
  LightbulbIcon,
  TrendingUpIcon,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
// import { useModal } from '../../contexts/ModalContext';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const acceptedTokens = [
  { src: "/token-branded-sol.svg", alt: "SOL" },
  { src: "/image-2.png", alt: "Token" },
  { src: "/cryptocurrency-color-btc.svg", alt: "BTC" },
];

const statsCards = [
  {
    icon: "/icon-outline-currency-dollar.svg",
    title: "Price",
    value: "$0.0000083262",
    change: "+2.5%",
    changeType: "positive",
  },
  {
    icon: "/mdi-chart-timeline-variant-shimmer.svg",
    title: "Market Cap",
    value: "$793K",
    status: "Live",
    statusType: "live",
  },
  {
    icon: "/icon-outline-heart.svg",
    title: "Donated",
    value: "$158.2K",
    status: "Active",
    statusType: "active",
  },
];

const careLevelScoreCards = [
  {
    value: "$2,483",
    label: "Donated",
    gradient:
      "bg-[linear-gradient(169deg,rgba(41,161,64,1)_0%,rgba(245,245,101,1)_100%)]",
  },
  {
    value: "$256,239",
    label: "Purchased",
    gradient:
      "bg-[linear-gradient(163deg,rgba(75,93,217,1)_0%,rgba(75,162,255,1)_100%)]",
  },
  {
    value: "5,329",
    label: "People Who Support their Brands",
    gradient:
      "bg-[linear-gradient(169deg,rgba(41,161,64,1)_0%,rgba(245,245,101,1)_100%)]",
  },
];

const leaderboardData = [
  {
    rank: 1,
    user: "mahalinity",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-yellow",
  },
  {
    rank: 2,
    user: "irvanwibowo",
    transaction: "$42,398",
    score: "98,111",
    rankColor: "text-blue",
  },
  {
    rank: 3,
    user: "human23",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-orange",
  },
  {
    rank: 4,
    user: "kaicenat",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 5,
    user: "chiragsingla17",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 6,
    user: "sachin235",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 7,
    user: "Hasanrumahiandytruwi251",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 8,
    user: "chiragsingla17",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 9,
    user: "sachin235",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 10,
    user: "chiragsingla17",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 11,
    user: "sagahumnant",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 12,
    user: "442ushsn",
    transaction: "$42,398",
    score: "98,111",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 13,
    user: "guiantyut2",
    transaction: "$45,398",
    score: "73,328",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 14,
    user: "makanyasd4",
    transaction: "$45,398",
    score: "73,328",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 15,
    user: "urshrsa238",
    transaction: "$45,398",
    score: "73,328",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 16,
    user: "sachin235",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 17,
    user: "husadis",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 18,
    user: "chiragsingla17",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 19,
    user: "sachin235",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
  {
    rank: 20,
    user: "chiragsingla17",
    transaction: "$45,398",
    score: "102,372",
    rankColor: "text-light-modegrey",
  },
];

const userSpotlightData = [
  { rank: 1, user: "sachin235", score: "88,326", rankColor: "text-yellow" },
  { rank: 2, user: "human23", score: "98,327", rankColor: "text-blue" },
  { rank: 3, user: "irvanwibowo", score: "91,487", rankColor: "text-orange" },
  {
    rank: 4,
    user: "mahalinity",
    score: "88,326",
    rankColor: "text-light-modewhite dark:text-[#F4FAFF]",
  },
  {
    rank: 5,
    user: "husadis",
    score: "75,329",
    rankColor: "text-light-modewhite dark:text-[#F4FAFF]",
  },
  {
    rank: 6,
    user: "karapdudh",
    score: "73,328",
    rankColor: "text-light-modewhite dark:text-[#F4FAFF]",
  },
  {
    rank: 7,
    user: "237knight",
    score: "64,293",
    rankColor: "text-light-modewhite dark:text-[#F4FAFF]",
  },
  {
    rank: 8,
    user: "fatalhuman22",
    score: "55,328",
    rankColor: "text-light-modewhite dark:text-[#F4FAFF]",
  },
];

const businessSpotlightData = [
  {
    name: "Ruby on Rails",
    author: "RubyRails",
    verified: true,
    description:
      "A full-stack web framework for building dynamic websites that deliver a rich user experience.",
    image: "/frame.png",
  },
  {
    name: "Preact on Crypto",
    author: "fatherstack",
    verified: true,
    description: "A fast 3kB alternative to React with the same modern API.",
    image: "/frame-1.png",
  },
  {
    name: "React",
    author: "Ratcheck",
    verified: true,
    description:
      "JupyterLab is the latest web-based interactive development environment for notebooks, code, and data.",
    image: "/frame-2.png",
  },
];

export const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  // const { openModal } = useModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [businessCarouselIndex, setBusinessCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1
  );

  // Update cards per view on window resize
  useEffect(() => {
    const handleResize = () => {
      const newCardsPerView = window.innerWidth >= 768 ? 3 : 1;
      setCardsPerView(newCardsPerView);
      // Reset index if it exceeds the new max
      const maxIndex = businessSpotlightData.length - newCardsPerView;
      if (businessCarouselIndex > maxIndex) {
        setBusinessCarouselIndex(Math.max(0, maxIndex));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [businessCarouselIndex]);

  // Carousel handlers for Business of the week
  const handleBusinessPrev = () => {
    setBusinessCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleBusinessNext = () => {
    const maxIndex = businessSpotlightData.length - cardsPerView;
    setBusinessCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="bg-light-modeblack dark:bg-light-modeblack w-full min-h-screen  transition-colors duration-300 relative">
      {/* Global pattern background */}
      
      
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
          <nav className="hidden min-[1120px]:flex inline-flex items-center mx-12 gap-4">
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
            onClick={() => user ? navigate('/dashboard') : navigate('/login')}
            className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-xs hover:bg-light-modedark-grey/90 transition-all duration-200">
            {user ? 'Dashboard' : 'Login/Sign up'}
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
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-light-modewhite dark:text-[#F4FAFF] hover:bg-light-modedark-grey rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 w-full bg-light-modedark-grey border-l border-light-modeborder dark:border-white/20-2 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
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
                user ? navigate('/dashboard') : navigate('/login');
              }}
              className="w-full h-auto bg-light-modeblack rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-light-modedark-grey/90 transition-all duration-200">
              {user ? 'Dashboard' : 'Login/Sign up'}
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
                CareLevel
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

      <section className="flex flex-col items-center gap-12 md:gap-[100px] pt-32 pt-20px md:pt-[90px] pb-12 md:pb-[100px] px-4 md:px-8 lg:px-[170px]">
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

        <div id="about" className="flex flex-col md:flex-row items-start gap-6 w-full md:py-0 py-4 ">
          <h2 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] tracking-[0] leading-10 flex-shrink-0 sm:text-[32px] text-[20px] w-full md:w-auto">
            About CareLevel
          </h2>

          <div className="w-full md:flex-1 [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl tracking-[0] leading-[30px]">
            We invite you to be apart of a community that focuses on the care
            and development of projects created from the ground up. By
            purchasing or donating the cryptocurrency $CARELEVEL, you're not
            only supporting the growth of new brands, but also investing in a
            larger vision: creating a positive impact for people to believe in
            their passions and the ongoing mission to turn small ideas into big
            realities.
            <br />
            <br />
            Every contribution, big or small, makes a difference. Let's come
            together to create a community that is more caring and more
            connected. Support $CARELEVEL today!
          </div>
        </div>
      </section>

      <section
        id="leaderboards"
        className="flex flex-col items-center gap-12 md:gap-[100px] px-4 md:px-8 lg:px-[170px] py-12 md:py-[100px]"
      >
        <div className="flex flex-col items-center gap-[50px] w-full">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <h2 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-[44px] md:text-[56px] text-center tracking-[-2.00px] leading-[64px]">
              CareLevel Score
            </h2>

            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl text-center tracking-[0] leading-[30px]">
              What is the CareLevel Score? The CareLevel Score is a calculated
              event of $CARELEVEL purchases, donations, and project motivation.
              The score was developed to visually track the mission of CareLevel
              to keep creators, businesses, and new innovators inspired to push
              their brands further.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6 w-full ">
            {careLevelScoreCards.map((card, index) => (
              <Card
                key={index}
                className="w-full md:flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] dark:border-white/20 shadow-button h-[144px] min-[1294px]:h-[120px] max-[768px]:h-[120px]"
              >
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex flex-col justify-center gap-2 w-full">
                    <div
                      className={`${card.gradient} [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Noto_Sans',Helvetica] font-medium text-[32px] text-center leading-10 tracking-[0]`}
                    >
                      {card.value}
                    </div>
                    <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-base text-center tracking-[0] leading-6">
                      {card.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <Tabs defaultValue="carelevel">
              <TabsList className="flex md:inline-flex items-center bg-transparent p-0 h-auto w-full md:w-auto">
                <TabsTrigger
                  value="carelevelscore"
                  className="flex-1 md:flex-none px-4 py-2 bg-light-modedark-grey rounded-[6px_0px_0px_6px] border border-solid border-[#28a13f] data-[state=active]:bg-light-modedark-grey [font-family:'Noto_Sans',Helvetica] font-normal text-[#28a13f] text-[13px] text-center tracking-[0] leading-5"
                >
                  Top $CARELEVEL
                </TabsTrigger>
                <TabsTrigger
                  value="engagements"
                  className="flex-1 md:flex-none px-4 py-2 rounded-[0px_6px_6px_0px] border border-solid border-[#d7dce5] dark:border-white/20 data-[state=active]:bg-light-modedark-grey [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[13px] text-center tracking-[0] leading-5"
                >
                  Top X Engagements
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col items-center gap-4 w-full">
              <Card className="w-full bg-white dark:bg-light-modeblack rounded-md border border-solid border-[#d7dce5] dark:border-white/20">
                <CardContent className="p-0">
                  <div className="relative">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-light-modeborder-2 dark:bg-light-modedark-grey rounded-[6px_6px_0px_0px] border border-solid border-[#d7dce5] dark:border-white/20 hover:bg-light-modeborder-2 dark:hover:bg-light-modedark-grey">
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey dark:text-light-modegrey text-sm tracking-[0] leading-5 text-center w-[100px]">
                            Rank
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey dark:text-light-modegrey text-sm tracking-[0] leading-5 max-w-[120px] md:max-w-none">
                            <div className="flex items-center gap-1">
                              User
                              <img
                                className="w-4 h-4"
                                alt="Icon outline"
                                src="/icon-outline-selector.svg"
                              />
                            </div>
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey dark:text-light-modegrey text-sm tracking-[0] leading-5 text-center">
                            Total Transaction
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey dark:text-light-modegrey text-sm tracking-[0] leading-5 text-right">
                            Total Score
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboardData.map((row) => (
                          <TableRow
                            key={row.rank}
                            className="border-0 hover:bg-light-modeborder-2/50 dark:hover:bg-light-modedark-grey/50"
                          >
                            <TableCell className="text-center">
                              <div
                                className={`[font-family:'Menlo-${row.rank <= 3 ? "Regular" : "Bold"}',Helvetica] font-${row.rank <= 3 ? "normal" : "bold"} ${row.rankColor} text-[15px] tracking-[0] leading-6`}
                              >
                                {row.rank}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[120px] md:max-w-none">
                              <div className="[font-family:'Menlo-Regular',Helvetica] font-normal text-black dark:text-light-modewhite dark:text-[#F4FAFF] text-[15px] tracking-[0] leading-6 truncate">
                                {row.user}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="[font-family:'Menlo-Regular',Helvetica] font-normal text-light-modegrey dark:text-light-modegrey text-[15px] tracking-[0] leading-6">
                                {row.transaction}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <img
                                  className="w-4 h-4"
                                  alt="Ph coin vertical"
                                  src="/ph-coin-vertical-fill.svg"
                                  style={{ 
                                    filter: theme === 'light'
                                      ? row.rank === 1 
                                        ? 'brightness(0) saturate(100%) invert(86%) sepia(60%) saturate(600%) hue-rotate(0deg) brightness(100%) contrast(104%)' 
                                        : row.rank === 2 
                                        ? 'brightness(0) saturate(100%) invert(50%) sepia(98%) saturate(1200%) hue-rotate(180deg) brightness(95%) contrast(101%)'
                                        : row.rank === 3
                                        ? 'brightness(0) saturate(100%) invert(58%) sepia(90%) saturate(600%) hue-rotate(0deg) brightness(100%) contrast(102%)'
                                        : 'grayscale(100%) brightness(0.5)' // Grey in light mode
                                      : row.rank === 1 
                                        ? 'brightness(0) saturate(100%) invert(86%) sepia(60%) saturate(600%) hue-rotate(0deg) brightness(100%) contrast(104%)' 
                                        : row.rank === 2 
                                        ? 'brightness(0) saturate(100%) invert(50%) sepia(98%) saturate(1200%) hue-rotate(180deg) brightness(95%) contrast(101%)'
                                        : row.rank === 3
                                        ? 'brightness(0) saturate(100%) invert(58%) sepia(90%) saturate(600%) hue-rotate(0deg) brightness(100%) contrast(102%)'
                                        : 'grayscale(100%) brightness(1.2)' // Original dark mode
                                  }}
                                />
                                <div
                                  className={`[font-family:'Menlo-Regular',Helvetica] font-normal ${row.rank <= 3 ? row.rankColor : "text-black dark:text-light-modewhite dark:text-[#F4FAFF]"} text-[15px] tracking-[0] leading-6`}
                                >
                                  {row.score}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="absolute left-0 bottom-0 w-full h-[223px] rounded-md bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-0.5 w-full">
                <LightbulbIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
                <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-[21px]">
                  Info:
                </span>
                <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[13px] tracking-[0] leading-[21px]">
                  Leaderboard shows CareLevel Score based on donations,
                  purchases, and CL engagements
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-8 w-full">
            <h3 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-[32px] text-center tracking-[0] leading-10">
              Ready to Improve your CareLevel Score?
            </h3>

            <div className="inline-flex flex-wrap items-center justify-center gap-2">
              <Button
                onClick={() => user ? navigate('/donate') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-light-modedark-grey/90 transition-all duration-200 w-[160px]">
                <HeartIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
                  Donate
                </span>
              </Button>

              <Button
                onClick={() => navigate('/buy')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-green/90 transition-all duration-200 w-[160px]">
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
                  Buy $CARELEVEL
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="spotlight"
        className="flex flex-col items-center gap-12 md:gap-[100px] pt-12 md:pt-[100px] pb-16 md:pb-[150px] px-4 md:px-8 lg:px-[170px]"
      >
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <h2 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-[32px] md:text-[56px] text-center tracking-[-2.00px] leading-[64px]">
            CareLevel Spotlight
          </h2>

          <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl text-center tracking-[0] leading-[30px]">
            Promotion corner to Highlight your Favorite User or Brand.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          <h3 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-[24px] md:text-[32px] tracking-[0] leading-10">
            User Spotlight
          </h3>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-col md:flex-row items-start gap-4 w-full">
              {userSpotlightData.slice(0, 4).map((user) => (
                <Card
                  key={user.rank}
                  className="w-full md:flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] dark:border-white/20 shadow-[0px_22px_17px_#00000005,0px_13px_10px_#00000005,0px_7px_5px_#00000005,0px_3px_2px_#0000000a,0px_0px_0px_1px_#35485b24]"
                >
                  <CardContent className="flex items-center md:justify-self-center md:justify-start md:gap-2 lg:gap-3 gap-4 px-6 md:px-1 py-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-solid border-[#d7dce5] dark:border-white/20">
                      <div
                        className={`[font-family:'Noto_Sans',Helvetica] font-semibold ${user.rankColor} text-[15px] text-center tracking-[0] leading-6`}
                      >
                        {user.rank}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-lg tracking-[0] leading-[26px]">
                        {user.user}
                      </div>

                      <div className="flex items-center gap-[4.44px]">
                        <img
                          className="w-4 h-4"
                          alt="Ph coin vertical"
                          src="/ph-coin-vertical-fill.svg"
                          style={{ filter: 'grayscale(100%) brightness(0.8)' }}
                        />
                        <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-base tracking-[0] leading-6">
                          {user.score}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-start gap-4 w-full">
              {userSpotlightData.slice(4, 8).map((user) => (
                <Card
                  key={user.rank}
                  className="w-full md:flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] dark:border-white/20 shadow-[0px_22px_17px_#00000005,0px_13px_10px_#00000005,0px_7px_5px_#00000005,0px_3px_2px_#0000000a,0px_0px_0px_1px_#35485b24]"
                >
                  <CardContent className="flex items-center md:justify-self-center md:justify-start md:gap-2 lg:gap-3 gap-4 px-6 md:px-1 py-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-solid border-[#d7dce5] dark:border-white/20">
                      <div
                        className={`[font-family:'Noto_Sans',Helvetica] font-semibold ${user.rankColor} text-[15px] text-center tracking-[0] leading-6`}
                      >
                        {user.rank}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-lg tracking-[0] leading-[26px]">
                        {user.user}
                      </div>

                      <div className="flex items-center gap-[4.44px]">
                        <img
                          className="w-4 h-4"
                          alt="Ph coin vertical"
                          src="/ph-coin-vertical-fill.svg"
                          style={{ filter: 'grayscale(100%) brightness(0.8)' }}
                        />
                        <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-base tracking-[0] leading-6">
                          {user.score}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 w-full overflow-hidden">
          <div className="flex justify-between items-center w-full">
            <h3 className="flex-1 [font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-[32px] tracking-[0] leading-10">
              Business of the week
            </h3>

            <div className="inline-flex items-center gap-2">
              <Button 
                onClick={handleBusinessPrev}
                disabled={businessCarouselIndex === 0}
                className="h-auto p-2.5 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] hover:bg-light-modedark-grey/90 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
              </Button>

              <Button 
                onClick={handleBusinessNext}
                disabled={businessCarouselIndex >= businessSpotlightData.length - cardsPerView}
                className="h-auto p-2.5 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] hover:bg-light-modedark-grey/90 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRightIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6 w-full overflow-hidden">
            {businessSpotlightData.slice(businessCarouselIndex, businessCarouselIndex + cardsPerView).map((business, index) => (
              <Card
                key={index}
                className="w-full h-[240px] md:flex-1 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20"
              >
                <CardContent className="flex flex-col items-start h-full p-4">
                  <div className="flex justify-between items-center w-full mb-4">
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-lg tracking-[0] leading-[26px]">
                        {business.name}
                      </div>

                      <div className="flex items-center gap-[7.66px]">
                        <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[11px] tracking-[0] leading-[18px]">
                          By {business.author}
                        </div>
                        {business.verified && (
                          <img
                            className="w-3.5 h-3.5"
                            alt="Icon outline badge"
                            src="/icon-outline-badge-check.svg"
                          />
                        )}
                      </div>
                    </div>

                    <div
                      className="w-12 h-12 rounded-md"
                      style={{
                        background: `url(${business.image}) 50% 50% / cover`,
                      }}
                    />
                  </div>

                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5 mb-4 flex-1">
                    {business.description}
                  </p>

                  <Button className="h-auto inline-flex gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 hover:bg-light-modedark-grey/90 mt-auto">
                    <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
                      Open
                    </span>
                    <ExternalLinkIcon className="w-4 h-4 text-black dark:text-light-modewhite dark:text-[#F4FAFF]" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-0.5 w-full">
            <LightbulbIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
            <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-[21px]">
              Info:
            </div>
            <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-sm text-center tracking-[0] leading-[21px]">
              <span className="text-[#6b7885]">
                want to get your Business featured here?{" "}
              </span>
              <span className="text-[#28a13f]">Contact Us</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex items-center gap-8 px-4 md:px-8 lg:px-[170px] py-8 md:py-[50px]">
        <Card className="flex-1 bg-light-modedark-grey rounded-lg overflow-hidden border border-solid border-[#d7dce5] dark:border-white/20 shadow-button relative">
          <CardContent className="flex flex-col md:flex-row items-center md:justify-between gap-4 px-12 py-[50px] relative">
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${theme === 'light' ? '/Group-light.svg' : '/Group-dark.svg'})`,
                backgroundRepeat: 'repeat-x, repeat-x, repeat-x',
                backgroundPosition: '0% 20%, 33% 50%, 66% 80%',
                backgroundSize: 'auto 250%, auto 250%, auto 250%',
                opacity: 0.3
              }}
            />
         
            <h3 className="relative z-10 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-[24px] md:text-[32px] tracking-[0] leading-10">
              Improve your CareLevel Score
            </h3>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button
                onClick={() => user ? navigate('/donate') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#6b7885] shadow-button hover:bg-light-modedark-grey/90 transition-all duration-200 w-full md:w-[140px]">
                <HeartIcon className="w-4 h-4 text-light-modewhite dark:text-[#F4FAFF]" />
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
                  Donate
                </span>
              </Button>

              <Button
                onClick={() => navigate('/buy')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-green/90 transition-all duration-200 w-full md:w-[140px]">
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
                  Buy $CARELEVEL
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

       <footer className={`relative flex w-full h-[720px] ${theme === 'light' ? 'bg-white' : 'bg-transparent'} items-center justify-center overflow-hidden`}>
         {theme === 'dark' && (
        <img
             className="absolute inset-0 w-full h-full object-cover"
          alt="Bg"
          src="/bg.png"
        />
         )}

            {/* Centered Text Block */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w w-[90%] sm:w-[600px] md:w-[720px] lg:w-[821px] top-[300px]">
              <div className="flex-col items-start">
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-white dark:text-[#F4FAFF] bg-black' : 'text-black bg-white'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[68px] tracking-[-4px] leading-tight whitespace-nowrap rounded-lg inline-block rotate-[-7deg] px-2 py-0`}>
                Bridge
          </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-black' : 'text-white dark:text-[#F4FAFF]'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[72px] tracking-[-4px] leading-tight whitespace-nowrap inline-block px-2`}>
                The Gap,
          </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-white dark:text-[#F4FAFF] bg-black' : 'text-black bg-white'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[68px] tracking-[-4px] leading-tight whitespace-nowrap rounded-lg inline-block rotate-[-7deg] px-2 py-0`}>
                Improve
              </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-black' : 'text-white dark:text-[#F4FAFF]'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[72px] tracking-[-4px] leading-tight whitespace-nowrap inline-block px-2`}>
                The
              </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-black' : 'text-white dark:text-[#F4FAFF]'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[72px] tracking-[-4px] leading-tight whitespace-nowrap inline-block px-2`}>
                Brands.
              </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-white dark:text-[#F4FAFF] bg-black' : 'text-black bg-white'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[68px] tracking-[-4px] leading-tight whitespace-nowrap rounded-lg inline-block rotate-[-7deg] px-2 py-0` }>
                Embrace
              </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-black' : 'text-white dark:text-[#F4FAFF]'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[72px] tracking-[-4px] leading-tight whitespace-nowrap inline-block px-2`}>
                Sustainable
              </div>
              <div className={`[font-family:'Noto_Sans',Helvetica] font-medium ${theme === 'light' ? 'text-black' : 'text-white dark:text-[#F4FAFF]'} text-[45px] sm:text-[56px] md:text-[64px] lg:text-[72px] tracking-[-4px] leading-tight whitespace-nowrap inline-block px-2`}>
                Connections
              </div>
          </div>
        </div>

            {/* Footer Bottom Section */}
            <div className="mother absolute bottom-10 w-full flex flex-col md:flex-row items-center justify-between px-8 text-center md:text-left">
              <div className="first order-3 md:order-1 [font-family:'Inter',Helvetica] font-medium text-light-modegrey text-[10px] tracking-[0.40px] leading-[14px]">
                © 2025 — COPYRIGHT
              </div>

              <div className="second order-1 md:order-2 inline-flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                <a href="#" className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-xs leading-4 underline hover:opacity-80">Twitter</a>
                <a href="#" className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-xs leading-4 underline hover:opacity-80">Telegram</a>
                <a href="#" className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-xs leading-4 underline hover:opacity-80">Pump.fun</a>
              </div>

              <div className="third order-2 md:order-3 flex items-center justify-center md:justify-end gap-4 flex-wrap py-4">
                <a href="#" className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-xs leading-4 underline hover:opacity-80">Privacy Policy</a>
                <a href="#" className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-xs leading-4 underline hover:opacity-80">Terms & Conditions</a>
          </div>
            </div>
             <div className="absolute bottom-2 h-[24px] w-full  mb-4 mx-8">
              <div className="h-full bg-dark-modeborder-2 rounded-md mx-auto w-[95%] my-2"></div>              
        </div>
      </footer>
    </div>
  );
};

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  HeartIcon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
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
    rankColor: "text-light-modewhite",
  },
  {
    rank: 5,
    user: "husadis",
    score: "75,329",
    rankColor: "text-light-modewhite",
  },
  {
    rank: 6,
    user: "karapdudh",
    score: "73,328",
    rankColor: "text-light-modewhite",
  },
  {
    rank: 7,
    user: "237knight",
    score: "64,293",
    rankColor: "text-light-modewhite",
  },
  {
    rank: 8,
    user: "fatalhuman22",
    score: "55,328",
    rankColor: "text-light-modewhite",
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

const floatingBadges = [
  { top: "top-[50%]", left: "left-[50%]", label: "Purchase:", value: "$8,324" },
  { top: "top-[50%]", left: "left-[50%]", label: "Donated:", value: "$9,303" },
  { top: "top-[50%]", left: "left-[50%]", label: "Donated:", value: "$438" },
];

export const LandingPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="bg-light-modeblack dark:bg-light-modeblack w-full min-h-screen flex flex-col transition-colors duration-300">
      <header className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-[170px] py-6 lg:py-8 relative z-10 gap-4">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-[50px] w-full lg:w-auto">
          <div className="inline-flex items-center gap-2">
            <div className="relative w-8 h-8">
              <img
                className="absolute -top-4 -left-4 w-8 h-8"
                alt="Subtract"
                src="/subtract.svg"
              />
            </div>
            <div className="[font-family:'Helvetica-BoldOblique',Helvetica] font-bold text-light-modewhite text-lg tracking-[0] leading-[26px]">
              CARELEVEL
            </div>
          </div>

          <nav className="inline-flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            <a
              href="#about"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite transition-colors"
            >
              About
            </a>
            <a
              href="#leaderboards"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite transition-colors"
            >
              Leaderboards
            </a>
            <a
              href="#spotlight"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-sm tracking-[0] leading-5 hover:text-light-modewhite transition-colors"
            >
              Spotlight
            </a>
          </nav>
        </div>

        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <Button
            onClick={() => user ? navigate('/buy') : navigate('/login')}
            className="h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-xs hover:bg-green/90 transition-all duration-200">
            Buy $CARELEVEL
          </Button>

          <Button
            onClick={() => user ? navigate('/dashboard') : navigate('/login')}
            className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs hover:bg-light-modedark-grey/90 transition-all duration-200">
            {user ? 'Dashboard' : 'Login/Sign up'}
          </Button>

          <div className="inline-flex gap-0.5 p-[3px] bg-light-modeblack rounded-[32px] border border-solid border-[#d7dce5]">
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-300 ${theme === 'light' ? 'bg-light-modeborder-2' : ''}`}
            >
              <img
                className="w-3.5 h-3.5"
                alt="Icon solid sun"
                src="/icon-solid-sun.svg"
              />
            </button>
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-2.5 p-1.5 rounded-3xl transition-all duration-300 ${theme === 'dark' ? 'bg-light-modeborder-2' : ''}`}
            >
              <img
                className="w-3.5 h-3.5"
                alt="Icon outline moon"
                src="/icon-outline-moon.svg"
              />
            </button>
          </div>
        </div>
      </header>

      <section className="relative flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] px-4 md:px-8 lg:px-[170px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[734px] h-[909px] top-[-454px] left-1/2 -translate-x-1/2">
            <img
              className="absolute w-[589px] h-[437px] top-0 left-[79px]"
              alt="Group"
              src="/group.png"
            />
            <img
              className="absolute w-[17px] h-[17px] top-[157px] left-[236px]"
              alt="Group"
              src="/group-1.png"
            />
            <img
              className="absolute w-[734px] h-[621px] top-0 left-0"
              alt="Group"
              src="/group-2.png"
            />
            {[...Array(50)].map((_, i) => (
              <img
                key={i}
                className={`absolute w-[17px] h-[17px] ${i < 10 ? "top-[157px]" : i < 20 ? "top-[367px]" : i < 30 ? "top-[472px]" : i < 40 ? "top-[525px]" : "top-[603px]"} ${i % 5 === 0 ? "left-[664px]" : i % 5 === 1 ? "left-[585px]" : i % 5 === 2 ? "left-[559px]" : i % 5 === 3 ? "left-[402px]" : "left-[480px]"}`}
                alt="Vector"
                src={i === 41 ? "/vector-4.svg" : "/vector.svg"}
              />
            ))}
            <img
              className="absolute w-[542px] h-[804px] top-[105px] left-2"
              alt="Group"
              src="/group-4.png"
            />
          </div>

          {floatingBadges.map((badge, index) => (
            <div
              key={index}
              className={`inline-flex items-center gap-1 px-3 py-1.5 absolute ${badge.top} ${badge.left} bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e]`}
            >
              <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[10px] tracking-[0] leading-[14px]">
                {badge.label}
              </div>
              <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-[10px] tracking-[0] leading-4">
                {badge.value}
              </div>
            </div>
          ))}

          <img
            className="absolute top-[51px] left-[66px] w-[62px] h-[82px]"
            alt="Vector"
            src="/vector-2-1.svg"
          />
          <img
            className="absolute top-[-253px] left-[-105px] w-[62px] h-[46px]"
            alt="Vector"
            src="/vector-2-1.svg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(244,244,244,1)_0%,rgba(244,244,244,0)_100%)]" />
        </div>

        <img
          className="absolute top-[-57px] left-1/2 -translate-x-1/2 w-[27px] h-[61px]"
          alt="Vector"
          src="/vector-1.svg"
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
          <h1 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-7xl tracking-[-2.00px] leading-[84px] text-center">
            Improve Your Carelevel
          </h1>

          <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl tracking-[0] leading-[30px] text-center">
            The cryptocurrency that levels up your passion.
          </p>

          <div className="inline-flex items-center gap-6">
            <Button
              onClick={() => user ? navigate('/donate') : navigate('/login')}
              className="h-auto flex items-center gap-2 px-4 py-2 rounded-md border border-solid border-[#cccccc2e] shadow-button bg-[linear-gradient(163deg,rgba(75,93,217,1)_0%,rgba(75,162,255,1)_100%)] hover:opacity-90 transition-all duration-200">
              <HeartIcon className="w-4 h-4" />
              <span className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modeblack text-base tracking-[0] leading-6">
                Donate
              </span>
            </Button>

            <div className="inline-flex gap-4 items-center rounded-md">
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
      </section>

      <section className="flex flex-col items-center gap-12 md:gap-[100px] pt-8 md:pt-[50px] pb-12 md:pb-[100px] px-4 md:px-8 lg:px-[170px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {statsCards.map((card, index) => (
            <Card
              key={index}
              className="flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] shadow-button"
            >
              <CardContent className="flex flex-col items-start gap-4 px-8 py-6">
                <div className="flex items-center justify-center gap-2 w-full">
                  <img className="w-5 h-5" alt={card.title} src={card.icon} />
                  <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-base text-center tracking-[0] leading-6">
                    {card.title}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <div className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-[32px] tracking-[0] leading-10">
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

        <div id="about" className="flex items-start gap-6 w-full">
          <h2 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-[32px] tracking-[0] leading-10 flex-shrink-0">
            About CareLevel
          </h2>

          <div className="flex-1 [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl tracking-[0] leading-[30px]">
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
            <h2 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-[56px] text-center tracking-[-2.00px] leading-[64px]">
              Carelevel Score
            </h2>

            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl text-center tracking-[0] leading-[30px]">
              What is the CareLevel Score? The CareLevel score is a calculated
              event of $CARELEVEL purchases, donations, and project motivation.
              The score was developed to visually track the mission of CareLevel
              to keep creators, businesses, and new innovators inspired to push
              their brands further.
            </p>
          </div>

          <div className="flex items-start gap-6 w-full">
            {careLevelScoreCards.map((card, index) => (
              <Card
                key={index}
                className="flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] shadow-button"
              >
                <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex flex-col justify-center gap-2 w-full">
                    <div
                      className={`${card.gradient} [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Noto_Sans',Helvetica] font-medium text-[32px] text-center leading-10 tracking-[0]`}
                    >
                      {card.value}
                    </div>
                    <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-base text-center tracking-[0] leading-6">
                      {card.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 w-full">
            <Tabs defaultValue="carelevel" className="w-full">
              <TabsList className="inline-flex items-center bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="carelevel"
                  className="px-4 py-2 bg-light-modedark-grey rounded-[6px_0px_0px_6px] border border-solid border-[#28a13f] data-[state=active]:bg-light-modedark-grey [font-family:'Noto_Sans',Helvetica] font-normal text-green text-[13px] text-center tracking-[0] leading-5"
                >
                  Top $CARELEVEL
                </TabsTrigger>
                <TabsTrigger
                  value="engagements"
                  className="px-4 py-2 rounded-[0px_6px_6px_0px] border border-solid border-[#d7dce5] data-[state=active]:bg-light-modedark-grey [font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[13px] text-center tracking-[0] leading-5"
                >
                  Top X Engagements
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col items-center gap-4 w-full">
              <Card className="w-full bg-light-modeblack rounded-md border border-solid border-[#d7dce5]">
                <CardContent className="p-0">
                  <div className="relative">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-light-modedark-grey rounded-[6px_6px_0px_0px] border border-solid border-[#d7dce5] hover:bg-light-modedark-grey">
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5 text-center w-[100px]">
                            Rank
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5">
                            <div className="flex items-center gap-1">
                              User
                              <img
                                className="w-4 h-4"
                                alt="Icon outline"
                                src="/icon-outline-selector.svg"
                              />
                            </div>
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5 text-center">
                            Total Transaction
                          </TableHead>
                          <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5 text-right">
                            Total Score
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboardData.map((row) => (
                          <TableRow
                            key={row.rank}
                            className="border-0 hover:bg-light-modedark-grey/50"
                          >
                            <TableCell className="text-center">
                              <div
                                className={`[font-family:'Menlo-${row.rank <= 3 ? "Regular" : "Bold"}',Helvetica] font-${row.rank <= 3 ? "normal" : "bold"} ${row.rankColor} text-[15px] tracking-[0] leading-6`}
                              >
                                {row.rank}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="[font-family:'Menlo-Regular',Helvetica] font-normal text-light-modewhite text-[15px] tracking-[0] leading-6">
                                {row.user}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="[font-family:'Menlo-Regular',Helvetica] font-normal text-light-modegrey text-[15px] tracking-[0] leading-6">
                                {row.transaction}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <img
                                  className="w-4 h-4"
                                  alt="Ph coin vertical"
                                  src="/ph-coin-vertical-fill.svg"
                                />
                                <div
                                  className={`[font-family:'Menlo-Regular',Helvetica] font-normal ${row.rank <= 3 ? row.rankColor : "text-light-modewhite"} text-[15px] tracking-[0] leading-6`}
                                >
                                  {row.score}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="absolute left-0 bottom-0 w-full h-[223px] rounded-md bg-[linear-gradient(180deg,rgba(244,244,244,0)_0%,rgba(244,244,244,1)_100%)] pointer-events-none" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-0.5 w-full">
                <LightbulbIcon className="w-4 h-4 text-light-modewhite" />
                <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-sm tracking-[0] leading-[21px]">
                  Info:
                </div>
                <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm text-center tracking-[0] leading-[21px]">
                  Leaderboard shows CareLevel Score based on donations,
                  purchases, and CL engagements
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-
center gap-8 w-full"
          >
            <h3 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-[32px] text-center tracking-[0] leading-10">
              Ready to Improve your CareLevel Score?
            </h3>

            <div className="inline-flex flex-wrap items-center justify-center gap-2">
              <Button
                onClick={() => user ? navigate('/donate') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-light-modedark-grey/90 transition-all duration-200">
                <HeartIcon className="w-4 h-4" />
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm tracking-[0] leading-5">
                  Donate
                </span>
              </Button>

              <Button
                onClick={() => user ? navigate('/buy') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-green/90 transition-all duration-200">
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-sm tracking-[0] leading-5">
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
          <h2 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-[56px] text-center tracking-[-2.00px] leading-[64px]">
            Carelevel Spotlight
          </h2>

          <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xl text-center tracking-[0] leading-[30px]">
            Promotion corner to Highlight your Favorite User or Brand.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          <h3 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-[32px] tracking-[0] leading-10">
            User Spotlight
          </h3>

          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-start gap-4 w-full">
              {userSpotlightData.slice(0, 4).map((user) => (
                <Card
                  key={user.rank}
                  className="flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] shadow-[0px_22px_17px_#00000005,0px_13px_10px_#00000005,0px_7px_5px_#00000005,0px_3px_2px_#0000000a,0px_0px_0px_1px_#35485b24]"
                >
                  <CardContent className="flex items-center gap-4 px-6 py-4">
                    <div className="inline-flex items-center justify-center gap-2 p-1 rounded-3xl border border-solid border-[#d7dce5]">
                      <div
                        className={`[font-family:'Noto_Sans',Helvetica] font-semibold ${user.rankColor} text-[15px] text-center tracking-[0] leading-6`}
                      >
                        {user.rank}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-lg tracking-[0] leading-[26px]">
                        {user.user}
                      </div>

                      <div className="flex items-center gap-[4.44px]">
                        <img
                          className="w-4 h-4"
                          alt="Ph coin vertical"
                          src="/ph-coin-vertical-fill.svg"
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

            <div className="flex items-start gap-4 w-full">
              {userSpotlightData.slice(4, 8).map((user) => (
                <Card
                  key={user.rank}
                  className="flex-1 bg-light-modedark-grey rounded-md overflow-hidden border border-solid border-[#d7dce5] shadow-[0px_22px_17px_#00000005,0px_13px_10px_#00000005,0px_7px_5px_#00000005,0px_3px_2px_#0000000a,0px_0px_0px_1px_#35485b24]"
                >
                  <CardContent className="flex items-center gap-4 px-6 py-4">
                    <div className="inline-flex items-center justify-center gap-2 p-1 rounded-3xl border border-solid border-[#d7dce5]">
                      <div
                        className={`[font-family:'Noto_Sans',Helvetica] font-semibold ${user.rankColor} text-[15px] text-center tracking-[0] leading-6`}
                      >
                        {user.rank}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-0.5 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-lg tracking-[0] leading-[26px]">
                        {user.user}
                      </div>

                      <div className="flex items-center gap-[4.44px]">
                        <img
                          className="w-4 h-4"
                          alt="Ph coin vertical"
                          src="/ph-coin-vertical-fill.svg"
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

        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex justify-between items-center w-full">
            <h3 className="flex-1 [font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-[32px] tracking-[0] leading-10">
              Business of the week
            </h3>

            <div className="inline-flex items-center gap-2">
              <Button className="h-auto p-2.5 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] hover:bg-light-modedark-grey/90">
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>

              <Button className="h-auto p-2.5 bg-light-modedark-grey rounded-md border border-solid border-[#cccccc2e] hover:bg-light-modedark-grey/90">
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-6 w-full">
            {businessSpotlightData.map((business, index) => (
              <Card
                key={index}
                className="flex-1 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5]"
              >
                <CardContent className="flex flex-col items-start gap-4 p-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-lg tracking-[0] leading-[26px]">
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

                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5">
                    {business.description}
                  </p>

                  <Button className="h-auto inline-flex gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] hover:bg-light-modedark-grey/90">
                    <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm tracking-[0] leading-5">
                      Open
                    </span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-0.5 w-full">
            <LightbulbIcon className="w-4 h-4 text-light-modewhite" />
            <div className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-sm tracking-[0] leading-[21px]">
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
        <Card className="flex-1 bg-light-modedark-grey rounded-lg overflow-hidden border border-solid border-[#d7dce5] shadow-button relative">
          <CardContent className="flex items-center gap-8 px-12 py-[50px]">
            <img
              className="absolute top-1/2 left-0 -translate-y-1/2 w-[430px] h-[140px]"
              alt="Group"
              src="/group-5.png"
            />

            <div className="absolute top-0 left-0 w-full h-full rounded-md bg-[linear-gradient(270deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

            <img
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[542px] h-[140px]"
              alt="Group"
              src="/group-6.png"
            />

            <h3 className="relative z-10 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-[32px] tracking-[0] leading-10 flex-1">
              Improve your CareLevel Score
            </h3>

            <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2">
              <Button
                onClick={() => user ? navigate('/donate') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-light-modedark-grey rounded-md border border-solid border-[#6b7885] shadow-button hover:bg-light-modedark-grey/90 transition-all duration-200">
                <HeartIcon className="w-4 h-4" />
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm tracking-[0] leading-5">
                  Donate
                </span>
              </Button>

              <Button
                onClick={() => user ? navigate('/buy') : navigate('/login')}
                className="h-auto flex justify-center gap-2 px-4 py-2 bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button hover:bg-green/90 transition-all duration-200">
                <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-sm tracking-[0] leading-5">
                  Buy $CARELEVEL
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="relative w-full h-[720px] bg-transparent">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Bg"
          src="/bg.png"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-light-modeborder-2 rounded-md" />

        <div className="absolute top-0 left-0 w-full flex items-start justify-between px-[170px] py-8">
          <div className="[font-family:'Inter',Helvetica] font-medium text-light-modegrey text-[10px] tracking-[0.40px] leading-[14px]">
            © 2025 — COPYRIGHT
          </div>

          <div className="inline-flex items-center gap-6">
            <a
              href="#"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs tracking-[0] leading-4 underline hover:opacity-80"
            >
              Twitter
            </a>

            <a
              href="#"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs tracking-[0] leading-4 underline hover:opacity-80"
            >
              Telegram
            </a>

            <a
              href="#"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs tracking-[0] leading-4 underline hover:opacity-80"
            >
              Pump.fun
            </a>
          </div>

          <div className="flex items-center justify-end gap-4">
            <a
              href="#"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-xs tracking-[0] leading-4 underline hover:opacity-80"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modegrey text-xs tracking-[0] leading-4 underline hover:opacity-80"
            >
              Term &amp; Conditions
            </a>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
          <div className="relative">
            <h2 className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-7xl tracking-[-2.00px] leading-[82px] text-center">
              {" "}
              .&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The
              Gap, <br />
              the Brands. <br />
              sustainable Connections
            </h2>

            <img
              className="absolute top-[-43px] left-1/2 -translate-x-1/2 w-[291px] h-[90px]"
              alt="Subtract"
              src="/subtract-1.svg"
            />

            <img
              className="absolute top-[-127px] left-0 w-[230px] h-[86px]"
              alt="Subtract"
              src="/subtract-3.svg"
            />

            <img
              className="absolute top-[-134px] right-0 w-[295px] h-[90px]"
              alt="Subtract"
              src="/subtract-2.svg"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
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
  UserIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react';

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center transition-colors duration-300">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Loading...
        </p>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const userRank = leaderboard.findIndex((p) => p.id === profile.id) + 1;

  return (
    <div className="bg-light-modeblack dark:bg-light-modeblack w-full min-h-screen flex flex-col transition-colors duration-300">
      <header className="flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-[170px] py-6 lg:py-8 relative z-10 gap-4">
        <div className="flex items-center gap-[50px]">
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
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => navigate('/buy')}
            className="h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-xs hover:bg-green/90 transition-all duration-200"
          >
            Buy $CARELEVEL
          </Button>

          <Button
            onClick={() => navigate('/donate')}
            className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs hover:bg-light-modedark-grey/90 transition-all duration-200"
          >
            <HeartIcon className="w-3 h-3 mr-1" />
            Donate
          </Button>

          <Button
            onClick={() => navigate('/profile')}
            className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs hover:bg-light-modedark-grey/90 transition-all duration-200"
          >
            <UserIcon className="w-3 h-3 mr-1" />
            Profile
          </Button>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 p-2 bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] hover:bg-light-modedark-grey/90 transition-all duration-300"
          >
            {theme === 'light' ? (
              <MoonIcon className="w-4 h-4 text-light-modewhite" />
            ) : (
              <SunIcon className="w-4 h-4 text-light-modewhite" />
            )}
          </button>

          <Button
            onClick={handleSignOut}
            className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-xs hover:bg-light-modedark-grey/90 transition-all duration-200"
          >
            <LogOutIcon className="w-3 h-3 mr-1" />
            Sign Out
          </Button>
        </div>
      </header>

      <section className="px-4 md:px-8 lg:px-[170px] py-8 md:py-12">
        <div className="mb-8">
          <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl md:text-4xl tracking-[-1px] leading-10 mb-2">
            Welcome back, {profile.full_name}!
          </h1>
          <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base md:text-lg">
            Track your CareLevel journey and impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col gap-3">
                <img
                  src="/ph-coin-vertical-fill.svg"
                  alt="Score"
                  className="w-6 h-6"
                />
                <div>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                    Your CareLevel Score
                  </p>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-2xl">
                    {parseFloat(profile.carelevel_score.toString()).toLocaleString()}
                  </p>
                  {userRank > 0 && (
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-green text-sm mt-1">
                      Rank #{userRank}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {statsCards.map((card, index) => (
            <Card
              key={index}
              className="bg-light-modedark-grey border-[#d7dce5] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-3">
                  <img className="w-6 h-6" alt={card.title} src={card.icon} />
                  <div>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                      {card.title}
                    </p>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-2xl">
                      {card.value}
                    </p>
                    {card.change && (
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUpIcon className="w-3 h-3 text-green" />
                        <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-green text-sm">
                          {card.change}
                        </span>
                      </div>
                    )}
                    {card.status && (
                      <p
                        className={`[font-family:'Noto_Sans',Helvetica] font-medium text-sm mt-1 ${
                          card.statusType === 'live' ? 'text-red' : 'text-green'
                        }`}
                      >
                        {card.status}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-light-modedark-grey border-[#d7dce5] transition-all duration-300 mb-8">
          <CardContent className="p-6">
            <h2 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl mb-4">
              Your Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green/20 rounded-md">
                  <HeartIcon className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                    Total Donated
                  </p>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl">
                    ${parseFloat(profile.total_donated.toString()).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green/20 rounded-md">
                  <TrendingUpIcon className="w-6 h-6 text-green" />
                </div>
                <div>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                    Total Purchased
                  </p>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl">
                    ${parseFloat(profile.total_purchased.toString()).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
          <CardContent className="p-6">
            <h2 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl mb-4">
              Top CareLevel Scores
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-light-modeblack border-[#d7dce5] hover:bg-light-modeblack">
                    <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm text-center w-16">
                      Rank
                    </TableHead>
                    <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                      User
                    </TableHead>
                    <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm text-right">
                      Score
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={`border-0 hover:bg-light-modeblack/50 ${
                        user.id === profile.id ? 'bg-green/10' : ''
                      }`}
                    >
                      <TableCell className="text-center">
                        <span
                          className={`[font-family:'Noto_Sans',Helvetica] font-${index < 3 ? 'bold' : 'normal'} ${
                            index === 0
                              ? 'text-yellow'
                              : index === 1
                              ? 'text-blue'
                              : index === 2
                              ? 'text-orange'
                              : 'text-light-modegrey'
                          } text-sm`}
                        >
                          {index + 1}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green/20 flex items-center justify-center border border-green">
                            <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-green text-xs">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-sm">
                            {user.username}
                            {user.id === profile.id && (
                              <span className="ml-2 text-green text-xs">(You)</span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <img
                            className="w-4 h-4"
                            alt="Score"
                            src="/ph-coin-vertical-fill.svg"
                          />
                          <span
                            className={`[font-family:'Noto_Sans',Helvetica] font-medium ${
                              index < 3 ? 'text-green' : 'text-light-modewhite'
                            } text-sm`}
                          >
                            {parseFloat(user.carelevel_score.toString()).toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

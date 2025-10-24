import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Transaction } from '../../lib/supabase';
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
import { ArrowLeftIcon, EditIcon, HeartIcon, ShoppingBagIcon } from 'lucide-react';

export const Profile = (): JSX.Element => {
  const { user, profile, loading: authLoading } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
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
    return null;
  }

  return (
    <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack px-4 py-8 md:px-8 lg:px-[170px] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => navigate('/dashboard')}
          className="mb-6 h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm hover:bg-light-modedark-grey/90"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="flex flex-col gap-6">
          <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-green/20 flex items-center justify-center border-2 border-green">
                  <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-green text-3xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-2xl md:text-3xl">
                      {profile.full_name}
                    </h1>
                    <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base">
                      @{profile.username}
                    </span>
                  </div>
                  {profile.bio && (
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base mb-4">
                      {profile.bio}
                    </p>
                  )}
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                    Member since {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  onClick={() => navigate('/edit-profile')}
                  className="h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm hover:bg-light-modedark-grey/90"
                >
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src="/ph-coin-vertical-fill.svg"
                    alt="Score"
                    className="w-8 h-8"
                  />
                  <div className="text-center">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                      CareLevel Score
                    </p>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl">
                      {parseFloat(profile.carelevel_score.toString()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-3">
                  <HeartIcon className="w-8 h-8 text-green" />
                  <div className="text-center">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                      Total Donated
                    </p>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl">
                      ${parseFloat(profile.total_donated.toString()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-3">
                  <ShoppingBagIcon className="w-8 h-8 text-green" />
                  <div className="text-center">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                      Total Purchased
                    </p>
                    <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl">
                      ${parseFloat(profile.total_purchased.toString()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
            <CardContent className="p-6">
              <h2 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl mb-4">
                Recent Transactions
              </h2>

              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base">
                    No transactions yet
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-light-modeblack border-[#d7dce5] hover:bg-light-modeblack">
                        <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                          Type
                        </TableHead>
                        <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                          Amount
                        </TableHead>
                        <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                          Token
                        </TableHead>
                        <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                          Status
                        </TableHead>
                        <TableHead className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id} className="border-0 hover:bg-light-modeblack/50">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {transaction.type === 'donation' ? (
                                <HeartIcon className="w-4 h-4 text-green" />
                              ) : (
                                <ShoppingBagIcon className="w-4 h-4 text-green" />
                              )}
                              <span className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite text-sm capitalize">
                                {transaction.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm">
                            ${transaction.amount}
                          </TableCell>
                          <TableCell className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                            {transaction.token_type}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                transaction.status === 'completed'
                                  ? 'bg-green/20 text-green'
                                  : transaction.status === 'pending'
                                  ? 'bg-yellow/20 text-yellow'
                                  : 'bg-red/20 text-red'
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </TableCell>
                          <TableCell className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                            {new Date(transaction.created_at).toLocaleDateString()}
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
  );
};

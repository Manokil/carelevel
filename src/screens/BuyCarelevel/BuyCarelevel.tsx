import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeftIcon } from 'lucide-react';

const tokens = [
  { id: 'sol', name: 'Solana', symbol: 'SOL', image: '/token-branded-sol.svg' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', image: '/cryptocurrency-color-btc.svg' },
  { id: 'other', name: 'Other Token', symbol: 'TOKEN', image: '/image-2.png' },
];

export const BuyCarelevel = (): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('sol');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !profile) {
      navigate('/login');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { data, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'purchase',
          amount: parseFloat(amount),
          token_type: tokens.find(t => t.id === selectedToken)?.symbol || 'SOL',
          status: 'completed',
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      const newPurchased = (parseFloat(profile.total_purchased.toString()) + parseFloat(amount));
      const newScore = (parseFloat(profile.carelevel_score.toString()) + parseFloat(amount) * 100);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          total_purchased: newPurchased,
          carelevel_score: newScore,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      navigate('/transaction-success', { state: { transaction: data, type: 'purchase' } });
    } catch (err: any) {
      setError(err.message || 'Failed to process purchase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack px-4 py-8 md:px-8 lg:px-[170px] transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          className="mb-6 h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm hover:bg-light-modedark-grey/90"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl tracking-[0] leading-10 mb-2">
                  Buy $CARELEVEL
                </h1>
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base tracking-[0] leading-6">
                  Purchase CareLevel tokens to support the community
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 p-6 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <div className="text-center">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                    Current Price
                  </p>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-2xl">
                    $0.0000083262
                  </p>
                </div>
                <div className="w-px h-12 bg-[#d7dce5]" />
                <div className="text-center">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                    24h Change
                  </p>
                  <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-green text-2xl">
                    +2.5%
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="token" className="text-light-modewhite">
                    Select Token
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {tokens.map((token) => (
                      <button
                        key={token.id}
                        type="button"
                        onClick={() => setSelectedToken(token.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-md border-2 transition-all duration-200 ${
                          selectedToken === token.id
                            ? 'border-green bg-green/10'
                            : 'border-[#d7dce5] bg-light-modeblack hover:border-green/50'
                        }`}
                      >
                        <img src={token.image} alt={token.symbol} className="w-8 h-8" />
                        <span className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm">
                          {token.symbol}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="amount" className="text-light-modewhite">
                    Amount (USD)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-light-modeblack border-[#d7dce5] text-light-modewhite placeholder:text-light-modegrey text-lg h-12"
                    required
                  />
                  {amount && (
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                      You'll receive approximately {(parseFloat(amount) / 0.0000083262).toLocaleString()} $CARELEVEL
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 rounded-md bg-red/10 border border-red">
                    <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-red text-sm">
                      {error}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || !amount}
                  className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-semibold text-light-modeblack text-base hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? 'Processing...' : `Buy $CARELEVEL for $${amount || '0.00'}`}
                </Button>
              </form>

              <div className="p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm text-center">
                  Purchasing $CARELEVEL increases your CareLevel Score and supports the community ecosystem
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

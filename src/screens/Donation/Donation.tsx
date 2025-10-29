import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';

const acceptedTokens = [
  { src: "/token-branded-sol.svg", alt: "SOL" },
  { src: "/image-2.png", alt: "Token" },
  { src: "/cryptocurrency-color-btc.svg", alt: "BTC" },
];

const tokens = [
  { id: 'sol', name: 'Solana', symbol: 'SOL', image: '/token-branded-sol.svg' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', image: '/cryptocurrency-color-btc.svg' },
  { id: 'other', name: 'Other Token', symbol: 'TOKEN', image: '/image-2.png' },
];

const suggestedAmounts = [10, 25, 50, 100];

export const Donation = (): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('sol');
  const [recipient, setRecipient] = useState('');
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
          type: 'donation',
          amount: parseFloat(amount),
          token_type: tokens.find(t => t.id === selectedToken)?.symbol || 'SOL',
          recipient: recipient || 'CareLevel Community',
          status: 'success',
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      const newDonated = (parseFloat(profile.total_donated.toString()) + parseFloat(amount));
      const newScore = (parseFloat(profile.carelevel_score.toString()) + parseFloat(amount) * 150);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          total_donated: newDonated,
          carelevel_score: newScore,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      navigate('/transaction-success', { state: { transaction: data, type: 'donation' } });
    } catch (err: any) {
      setError(err.message || 'Failed to process donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#171B20] transition-colors duration-100">
      <div className="mx-auto">
        <div className="pb-3">
          <h2 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-2xl tracking-[0] leading-10 mb-2">
          Direct Donation
          </h2> 
          <p className="[font-family:'Noto_Sans',Helvetica] font-thin text-light-modewhite dark:text-[#F4FAFF] text-sm text-[#6C7886] tracking-[0] leading-2 mb-2">
          Make a direct contribution to help support the CareLevel project.
          </p>                
        </div>             

       

        <div className="p-4 bg-[#0D111714] dark:bg-[#343434] rounded-md flex items-center gap-2 h-[40px] mb-4">
            <img src="/icon-outline-light-bulb.svg" alt="Light bulb" className="w-16px h-16px" />
           <h1 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] text-left w-full leading-tight">
           Direct donations are used for new CL developments
           and the CL mission
           </h1>
        </div> 

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">               

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
            className="w-full h-auto bg-[linear-gradient(163deg,rgba(75,93,217,1)_0%,rgba(75,162,255,1)_100%)] rounded-md border border-solid border-[#cccccc2e] px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-thin text-white dark:text-[#F4FAFF] text-base hover:opacity-90 hover:scale-105 disabled:cursor-not-allowed transition-all duration-200 h-[36px] mb-6"
          >            
            {loading ? 'Processing...' : `Send Donation`}
          </Button>
        </form>
        <div className="flex gap-4 items-center rounded-md justify-center">
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
  );
};

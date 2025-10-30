import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';

export const BuyCarelevel = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const { user, profile, connectWallet } = useAuth();
  const navigate = useNavigate();

  const tokenAddress = '8ZgBsi5s5xZKKKvz5BxSyzqgdh5d5oX3DtL9twAJpump';

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide success message after 2 seconds
    } catch (err) {
      console.error('Failed to copy address:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = tokenAddress;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        alert('Failed to copy address. Please copy manually: ' + tokenAddress);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !profile) {
      // Not logged in: open wallet connect so the user can proceed via wallet
      try {
        await connectWallet('solana');
      } catch (e) {
        // no-op; errors are handled inside connectWallet
      }
      return;
    }

    setError('');
    setLoading(true);

    try {
      // For demo purposes, using a fixed amount
      const amount = 100;
      const { data, error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'purchase',
          amount: amount,
          token_type: 'SOL',
          status: 'success',
        })
        .select()
        .single();

      if (transactionError) throw transactionError;

      const newPurchased = (parseFloat(profile.total_purchased.toString()) + amount);
      const newScore = (parseFloat(profile.carelevel_score.toString()) + amount * 100);

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
    <div className="bg-light-modeblack dark:bg-[#171B20] transition-colors duration-100">
      <div className="mx-auto">
              <div className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-3">                  
                  <img src="/subtract.svg" alt="Pump.fun" className="w-32px h-32px" />
                </div>
                <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-3xl tracking-[0] leading-10 mb-2">
                  Buy $CARELEVEL
                  <br />
                   Tokens
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
                  disabled={loading}
                  className="w-full h-auto bg-[#29A140] rounded-md border border-solid border-[#cccccc2e] px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-semibold text-white dark:text-[#F4FAFF] text-base hover:bg-[#1e7a2e] hover:scale-105 disabled:cursor-not-allowed transition-all duration-200 h-[36px] mb-6"
                >
                  {loading ? 'Processing...' : `Buy on Pump`}
                </Button>
              </form>

              <div className="p-4 bg-light-modeblack rounded-md border border-[#d7dce5] dark:border-white/20 flex items-center gap-2 h-[36px]">
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] text-center w-[136px] whitespace-nowrap">
                  Add $CARELEVEL coin CA:
                </p>
                <p className="truncate max-w-[200px] text-[12px] text-light-modewhite dark:text-[#F4FAFF]">
                  {tokenAddress}
                </p>
                <button 
                  onClick={handleCopyAddress}
                  className="relative p-1 hover:bg-white/10 rounded transition-colors duration-200"
                  title={copySuccess ? "Copied!" : "Copy address"}
                >
                  <img 
                    src="/duplicate.svg" 
                    alt="Copy" 
                    className={`w-[20px] h-[20px] dark:brightness-0 dark:invert transition-all duration-200 ${
                      copySuccess ? 'opacity-50' : ''
                    }`} 
                    style={{ filter: 'brightness(0)' }} 
                  />
                  {copySuccess && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                      Copied!
                    </div>
                  )}
                </button>
              </div> 
      </div>
    </div>
  );
};

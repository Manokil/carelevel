import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { CheckCircleIcon, HeartIcon, ShoppingBagIcon, HomeIcon } from 'lucide-react';

export const TransactionSuccess = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transaction, type } = location.state || {};

  if (!transaction) {
    navigate('/dashboard');
    return <></>;
  }

  const isDonation = type === 'donation';
  const scoreIncrease = isDonation ? transaction.amount * 150 : transaction.amount * 100;

  return (
    <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center px-4 py-8 transition-colors duration-300">
      <Card className="w-full max-w-2xl bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="p-6 bg-green/20 rounded-full animate-pulse">
                <CheckCircleIcon className="w-16 h-16 text-green" strokeWidth={2} />
              </div>
            </div>

            <div className="text-center">
              <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl md:text-4xl tracking-[0] leading-10 mb-3">
                {isDonation ? 'Donation Successful!' : 'Purchase Complete!'}
              </h1>
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base md:text-lg tracking-[0] leading-6">
                {isDonation
                  ? 'Thank you for supporting the CareLevel community!'
                  : 'Your purchase has been processed successfully!'}
              </p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                {isDonation ? (
                  <HeartIcon className="w-6 h-6 text-green" />
                ) : (
                  <ShoppingBagIcon className="w-6 h-6 text-green" />
                )}
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                  {isDonation ? 'Donated' : 'Purchased'}
                </p>
                <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl">
                  ${transaction.amount}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <img
                  src="/ph-coin-vertical-fill.svg"
                  alt="Score"
                  className="w-6 h-6"
                />
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                  Score Earned
                </p>
                <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-green text-xl">
                  +{scoreIncrease.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <img
                  src={
                    transaction.token_type === 'SOL'
                      ? '/token-branded-sol.svg'
                      : transaction.token_type === 'BTC'
                      ? '/cryptocurrency-color-btc.svg'
                      : '/image-2.png'
                  }
                  alt={transaction.token_type}
                  className="w-6 h-6"
                />
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                  Token Used
                </p>
                <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-xl">
                  {transaction.token_type}
                </p>
              </div>
            </div>

            {isDonation && transaction.recipient && (
              <div className="w-full p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm mb-1">
                  Recipient
                </p>
                <p className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-base">
                  {transaction.recipient}
                </p>
              </div>
            )}

            <div className="w-full p-6 bg-[linear-gradient(169deg,rgba(41,161,64,0.1)_0%,rgba(245,245,101,0.1)_100%)] rounded-md border border-green/30">
              <p className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-center text-base mb-2">
                {isDonation
                  ? 'Your donation makes a real difference!'
                  : 'Thanks for believing in the mission!'}
              </p>
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-center text-sm">
                {isDonation
                  ? 'Donations earn 1.5x CareLevel Score and directly support creators and innovators building their dreams.'
                  : 'Your purchase helps fund the CareLevel ecosystem and supports new brands and projects.'}
              </p>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/dashboard')}
                className="flex-1 h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-sm hover:bg-green/90 transition-all duration-200"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>

              <Button
                onClick={() => navigate('/profile')}
                className="flex-1 h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm hover:bg-light-modedark-grey/90 transition-all duration-200"
              >
                View Profile
              </Button>
            </div>

            <div className="text-center">
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                Transaction ID: {transaction.id.substring(0, 8)}...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

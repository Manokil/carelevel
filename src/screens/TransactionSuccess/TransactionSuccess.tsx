//
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircleIcon, HomeIcon } from 'lucide-react';

export const TransactionSuccess = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transaction } = location.state || {};

  if (!transaction) {
    // Show fallback content styled like Login.tsx
    return (
      <div className="bg-white dark:bg-[#171B20] transition-colors duration-100">
        <div className="mx-auto">
          <div className="flex flex-col gap-6 p-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <img src='./Check Golf Hole.svg' alt='Check Golf Hole' className='w-16 h-16' />
              <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-2xl mb-2">
                Transaction Success
              </h1>
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] tracking-[0] leading-5 text-center">
              You have successfully donated ~$150 from your SOL wallet.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] tracking-[0] leading-5 text-center">Share your donation to:</p>
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full h-auto bg-white/10 rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-1 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-green/90 transition-all duration-200"
                >
                  <img src='/world.svg' alt='Twitter' className='w-4 h-4 mr-2 brightness-0 dark:brightness-0 dark:invert' />
                  Twitter
                </Button>
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="w-full h-auto bg-white/10 rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-1 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-green/90 transition-all duration-200"
                >
                  <img src='/share.svg' alt='Share' className='w-4 h-4 mr-2' />
                  Share
                </Button>
              </div>
            </div>           

            <Button
              onClick={() => navigate('/profile')}
              className="w-full h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-1 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-light-modedark-grey/90 transition-all duration-200"
            >              
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // const isDonation = type === 'donation';
  // const scoreIncrease = isDonation ? transaction.amount * 150 : transaction.amount * 100;

  return (
    <div className="bg-white dark:bg-[#171B20] transition-colors duration-100">
      <div className="mx-auto">
        <div className="flex flex-col gap-6 p-6">
          <div className="">
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-2xl tracking-[0] leading-8 mb-2">
              Transaction Successful
            </h1>
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] tracking-[0] leading-5">
              You have successfully purchased {transaction.amount} CareLevel tokens.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F9F9F9] dark:bg-[#505050] rounded-md p-4">
            <CheckCircleIcon className="w-6 h-6 text-green" />
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
              Success
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
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
              className="flex-1 h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] dark:border-white/20 shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite dark:text-[#F4FAFF] text-sm hover:bg-light-modedark-grey/90 transition-all duration-200"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

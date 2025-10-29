import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { X } from 'lucide-react';

interface WalletPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<boolean>;
  walletType: 'solana' | 'ethereum' | 'bitcoin';
  loading?: boolean;
}

export const WalletPasswordDialog: React.FC<WalletPasswordDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  walletType,
  loading = false
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // Simple password validation (you can customize this)
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const isValid = await onConfirm(password);
      if (!isValid) {
        setError('Invalid password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  const getWalletInfo = () => {
    switch (walletType) {
      case 'solana':
        return {
          name: 'Solana Wallet',
          icon: '/token-branded-sol.svg',
          description: 'Enter your password to connect to Solana wallet'
        };
      case 'ethereum':
        return {
          name: 'Ethereum Wallet',
          icon: '/image-2.png',
          description: 'Enter your password to connect to Ethereum wallet'
        };
      case 'bitcoin':
        return {
          name: 'Bitcoin Wallet',
          icon: '/cryptocurrency-color-btc.svg',
          description: 'Enter your password to connect to Bitcoin wallet'
        };
      default:
        return {
          name: 'Wallet',
          icon: '/token-branded-sol.svg',
          description: 'Enter your password to connect to wallet'
        };
    }
  };

  const walletInfo = getWalletInfo();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />
      
      {/* Dialog content */}
      <div className="relative bg-white dark:bg-[#171B20] rounded-lg shadow-lg w-[335px] h-[300px] min-[450px]:w-[400px] min-[450px]:h-[300px] mx-4">
        {/* Header */}
        <div className="flex items-center justify-end px-4 py-2 border-b border-light-modeborder dark:border-white/20">
          <h2 className="text-[16px] text-light-modegrey dark:text-light-modegrey flex-1">
            Connect {walletInfo.name}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-light-modeborder dark:hover:bg-light-modedark-grey rounded-md transition-colors border border-light-modeborder dark:border-white/20 bg-[#F9F9F9] dark:bg-[#0D1117]"
          >
            <X className="w-5 h-5 text-light-modegrey dark:text-light-modegrey" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <img 
              src={walletInfo.icon} 
              alt={walletInfo.name}
              className="w-12 h-12 mb-3 brightness-0 dark:brightness-0 dark:invert"
            />
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm text-center">
              {walletInfo.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-light-modegrey">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your wallet password"
                className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red/10 border border-red">
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-red text-sm">
                  {error}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 h-auto bg-gray-500 rounded-md border border-solid border-gray-400 shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white text-sm hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

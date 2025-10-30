import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Email/Username validation function
  const isValidEmailOrUsername = (input: string) => {
    // Check if it's a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(input);
    
    // Check if it's a valid username (at least 3 characters, alphanumeric and underscore)
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const isUsername = usernameRegex.test(input);
    
    return isEmail || isUsername;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#171B20] transition-colors duration-100">
      <div className="mx-auto">
        <div className="flex flex-col gap-6">          

          <div className="">
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite dark:text-[#F4FAFF] text-2xl tracking-[0] leading-8 mb-2">
              Welcome back 👋 
            </h1>
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] tracking-[0] leading-5">
            login to your account and track you score
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F9F9F9] dark:bg-[#505050] rounded-md p-2 mb-[-12px]">
            <img src="/google.svg" alt="Google" className="w-16px h-16px" />
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
            Login with Google
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F9F9F9] dark:bg-[#505050] rounded-md p-2">
            <img src="/token-branded-sol.svg" alt="Wallet" className="w-16px h-16px" />
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
            Login with Wallet
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
            <span className="px-3 text-light-modegrey text-sm">or</span>
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-light-modegrey">
                Email/Username
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`bg-light-modeblack text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modewhite dark:text-[#F4FAFF] pr-10 ${isValidEmailOrUsername(email) ? 'border-green' : 'border-[#d7dce5] dark:border-white/20'}`}
                  required
                />
                {isValidEmailOrUsername(email) && (
                  <img src="/tick.svg" alt="Email" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" />
                )}
              </div>
            </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-light-modegrey">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modegrey pr-10"
                    required
                  />
                  <img 
                    src="/eye.svg" 
                    alt="Eye" 
                    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

            <Link
                to="/signup"
                className="text-green hover:underline transition-all duration-200 text-center underline"
              >
                Forgot password
              </Link>

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
              className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="text-center">
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
              Don't have an account yet?{' '}
              <Link
                to="/signup"
                className="text-green hover:underline transition-all duration-200 underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

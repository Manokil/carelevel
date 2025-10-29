import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export const Signup = (): JSX.Element => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signUp(username, password, fullName, fullName); // email=username field, password, username=fullName field, fullName=fullName field
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create account';
      
      // Check if this is an email confirmation message
      if (errorMessage.includes('Please check your email and click the confirmation link')) {
        setSuccess(errorMessage);
        setError('');
      } else {
        setError(errorMessage);
        setSuccess('');
      }
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
              Create Account
            </h1>
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-[12px] tracking-[0] leading-5">
              Get all the benefit by sign up to CareLevel
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-[#F9F9F9] dark:bg-[#505050] rounded-md p-2">
            <img src="/google.svg" alt="Google" className="w-16px h-16px" />
            <h1 className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modewhite dark:text-[#F4FAFF] text-sm tracking-[0] leading-5">
             Continue with Google
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
            <span className="px-3 text-light-modegrey text-sm">or</span>
            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-light-modegrey">
                UserName
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter username"
                className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modewhite dark:text-[#F4FAFF]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-light-modegrey">
                Email
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email"
                className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modewhite dark:text-[#F4FAFF]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-light-modegrey">
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

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-light-modegrey">
                Confirm Password
              </Label>
              <div className="relative">
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
                className="bg-light-modeblack border-[#d7dce5] dark:border-white/20 text-light-modewhite dark:text-[#F4FAFF] placeholder:text-light-modewhite dark:text-[#F4FAFF]"
                required
                minLength={6}
              />
              <img 
                    src="/eye.svg" 
                    alt="Eye" 
                    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)}
                  />
            </div>        
            </div>

              {error && (
                <div className="p-3 rounded-md bg-red/10 border border-red">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-red text-sm">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-md bg-green/10 border border-green">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-green text-sm">
                    {success}
                  </p>
                </div>
              )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-white dark:text-[#F4FAFF] text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-[-5px]"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green hover:underline transition-all duration-200 underline"
              >
                Login
              </Link>
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

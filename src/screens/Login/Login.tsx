import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center px-4 py-8 transition-colors duration-300">
      <Card className="w-full max-w-md bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <img
                  className="absolute -top-4 -left-4 w-8 h-8"
                  alt="Subtract"
                  src="/subtract.svg"
                />
              </div>
              <div className="[font-family:'Helvetica-BoldOblique',Helvetica] font-bold text-light-modewhite text-xl tracking-[0] leading-[26px]">
                CARELEVEL
              </div>
            </div>

            <div className="text-center">
              <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-2xl tracking-[0] leading-8 mb-2">
                Welcome Back
              </h1>
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm tracking-[0] leading-5">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-light-modewhite">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-light-modeblack border-[#d7dce5] text-light-modewhite placeholder:text-light-modegrey"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-light-modewhite">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-light-modeblack border-[#d7dce5] text-light-modewhite placeholder:text-light-modegrey"
                  required
                />
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
                disabled={loading}
                className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center">
              <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-green hover:underline transition-all duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/"
                className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-sm hover:text-light-modewhite transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

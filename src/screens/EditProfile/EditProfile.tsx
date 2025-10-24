import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';

export const EditProfile = (): JSX.Element => {
  const { user, profile, updateProfile, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    if (profile) {
      setFullName(profile.full_name);
      setBio(profile.bio || '');
    }
  }, [user, profile, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await updateProfile({
        full_name: fullName,
        bio: bio || null,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !profile) {
    return (
      <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack flex items-center justify-center">
        <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-lg">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-modeblack dark:bg-light-modeblack px-4 py-8 md:px-8 lg:px-[170px] transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => navigate('/profile')}
          className="mb-6 h-auto bg-light-modedark-grey rounded-md border border-solid border-[#d7dce5] px-4 py-2 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm hover:bg-light-modedark-grey/90"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>

        <Card className="bg-light-modedark-grey dark:bg-light-modedark-grey border-[#d7dce5] transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-3xl tracking-[0] leading-10 mb-2">
                  Edit Profile
                </h1>
                <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-base tracking-[0] leading-6">
                  Update your profile information
                </p>
              </div>

              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green/20 flex items-center justify-center border-2 border-green">
                  <span className="[font-family:'Noto_Sans',Helvetica] font-bold text-green text-3xl">
                    {profile.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username" className="text-light-modewhite">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={profile.username}
                    disabled
                    className="bg-light-modeblack/50 border-[#d7dce5] text-light-modegrey cursor-not-allowed"
                  />
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                    Username cannot be changed
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="fullName" className="text-light-modewhite">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-light-modeblack border-[#d7dce5] text-light-modewhite placeholder:text-light-modegrey"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="bio" className="text-light-modewhite">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                    className="bg-light-modeblack border-[#d7dce5] text-light-modewhite placeholder:text-light-modegrey min-h-[120px]"
                    maxLength={200}
                  />
                  <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs text-right">
                    {bio.length}/200 characters
                  </p>
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
                      Profile updated successfully! Redirecting...
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-auto bg-green rounded-md border border-solid border-[#cccccc2e] shadow-button px-4 py-3 [font-family:'Noto_Sans',Helvetica] font-medium text-light-modeblack text-sm hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>

              <div className="p-4 bg-light-modeblack rounded-md border border-[#d7dce5]">
                <div className="flex flex-col gap-2">
                  <p className="[font-family:'Noto_Sans',Helvetica] font-medium text-light-modewhite text-sm">
                    Account Statistics
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="text-center">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-lg">
                        {parseFloat(profile.carelevel_score.toString()).toLocaleString()}
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                        Score
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-lg">
                        ${parseFloat(profile.total_donated.toString()).toLocaleString()}
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                        Donated
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="[font-family:'Noto_Sans',Helvetica] font-semibold text-light-modewhite text-lg">
                        ${parseFloat(profile.total_purchased.toString()).toLocaleString()}
                      </p>
                      <p className="[font-family:'Noto_Sans',Helvetica] font-normal text-light-modegrey text-xs">
                        Purchased
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

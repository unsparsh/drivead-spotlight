
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import ProfileForm from '@/components/profile/ProfileForm';
import { useProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { user } = useAuth();
  const { 
    profileData, 
    loading, 
    updating, 
    handleInputChange, 
    handleCheckboxChange, 
    updateProfile, 
    getInitials 
  } = useProfile();
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-driveAd-purple" />
          <span className="ml-2">Loading profile...</span>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <ProfileAvatar 
                    avatarUrl={profileData.avatar_url} 
                    initials={getInitials()} 
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <CardTitle className="text-2xl font-bold">
                      {profileData.full_name || 'Your Profile'}
                    </CardTitle>
                    <CardDescription>
                      {user?.email}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ProfileForm 
                  profileData={profileData}
                  updating={updating}
                  onInputChange={handleInputChange}
                  onCheckboxChange={handleCheckboxChange}
                  onSubmit={updateProfile}
                />
              </CardContent>
              
              <CardFooter>
                {/* Footer is now empty as we moved the button to the form */}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;

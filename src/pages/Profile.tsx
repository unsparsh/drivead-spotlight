
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from 'lucide-react';

interface ProfileData {
  username: string | null;
  full_name: string | null;
  phone: string | null;
  is_advertiser: boolean;
  is_vehicle_owner: boolean;
  avatar_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    full_name: '',
    phone: '',
    is_advertiser: false,
    is_vehicle_owner: false,
    avatar_url: null
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        
        if (!user) return;
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProfileData({
            username: data.username,
            full_name: data.full_name,
            phone: data.phone,
            is_advertiser: data.is_advertiser || false,
            is_vehicle_owner: data.is_vehicle_owner || false,
            avatar_url: data.avatar_url
          });
        }
      } catch (error: any) {
        console.error('Error loading profile data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    
    getProfile();
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (field: 'is_advertiser' | 'is_vehicle_owner', checked: boolean) => {
    setProfileData((prev) => ({ ...prev, [field]: checked }));
  };
  
  const updateProfile = async () => {
    try {
      setUpdating(true);
      
      if (!user) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: profileData.username,
          full_name: profileData.full_name,
          phone: profileData.phone,
          is_advertiser: profileData.is_advertiser,
          is_vehicle_owner: profileData.is_vehicle_owner,
          updated_at: new Date()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
      console.error('Error updating profile:', error);
    } finally {
      setUpdating(false);
    }
  };
  
  const getInitials = () => {
    if (profileData.full_name) {
      return profileData.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || '?';
  };
  
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
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar_url || undefined} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={profileData.full_name || ''}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={profileData.username || ''}
                      onChange={handleInputChange}
                      placeholder="Your username"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileData.phone || ''}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                  />
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">Account Type</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="is_advertiser"
                        checked={profileData.is_advertiser}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('is_advertiser', checked as boolean)
                        }
                      />
                      <Label htmlFor="is_advertiser">I am an Advertiser</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="is_vehicle_owner"
                        checked={profileData.is_vehicle_owner}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('is_vehicle_owner', checked as boolean)
                        }
                      />
                      <Label htmlFor="is_vehicle_owner">I am a Vehicle Owner</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="bg-driveAd-purple hover:bg-driveAd-purple-dark"
                  onClick={updateProfile}
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
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

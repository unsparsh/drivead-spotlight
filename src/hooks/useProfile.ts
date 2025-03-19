
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import type { User } from '@supabase/supabase-js';

export interface ProfileData {
  username: string | null;
  full_name: string | null;
  phone: string | null;
  is_advertiser: boolean;
  is_vehicle_owner: boolean;
  avatar_url: string | null;
}

export const useProfile = () => {
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

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      if (!user) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
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
          updated_at: new Date().toISOString()
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
  
  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profileData,
    loading,
    updating,
    handleInputChange,
    handleCheckboxChange,
    updateProfile,
    getInitials
  };
};

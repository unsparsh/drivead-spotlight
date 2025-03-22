
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginAsAdmin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // First attempt to sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check if user has admin privileges
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.user?.id)
        .single();

      if (profileError) throw profileError;

      if (profileData.is_admin) {
        toast({
          title: "Admin Login Successful",
          description: "You've been redirected to the admin dashboard.",
        });
        
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        // Not an admin - sign out and show error
        await supabase.auth.signOut();
        throw new Error("This account doesn't have admin privileges.");
      }
    } catch (error: any) {
      setError(error.message || "Failed to login as admin");
      toast({
        title: "Admin Login Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginAsAdmin,
    isLoading,
    error,
  };
};

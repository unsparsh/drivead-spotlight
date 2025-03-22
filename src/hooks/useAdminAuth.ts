
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminStatus = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if user has admin privileges
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      if (!profileData.is_admin) {
        throw new Error("This account doesn't have admin privileges.");
      }

      return true;
    } catch (error: any) {
      setError(error.message || "Failed to verify admin status");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAdminStatus,
    isLoading,
    error,
  };
};

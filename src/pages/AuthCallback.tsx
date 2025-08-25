import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Always exchange any code in the URL for a new session to avoid keeping a previous user's session
        await supabase.auth.exchangeCodeForSession(window.location.href);
      } catch {
        // No code present or already exchanged
      }

      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          toast({
            title: "Login successful!",
            description: "Welcome back!",
          });
          // Force full reload to guarantee a clean auth state
          window.location.replace('/');
        } else {
          window.location.replace('/auth');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication error",
          description: error.message || "Something went wrong during authentication",
          variant: "destructive",
        });
        window.location.replace('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
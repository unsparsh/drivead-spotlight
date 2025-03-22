
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LoginForm } from '@/components/auth/login-form';
import { SignUpForm } from '@/components/auth/signup-form';
import { AdminLoginForm } from '@/components/auth/admin-login-form';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          // Don't redirect here - admin login will handle its own redirect
          if (location.pathname !== '/auth') {
            navigate('/');
          }
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);
  
  // Handle auth callback and errors
  useEffect(() => {
    // Process error messages from redirect parameters
    const processErrorParams = () => {
      // Check URL search parameters first (hash or query)
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      
      // Check both searchParams and hashParams for errors
      const errorFromSearch = searchParams.get("error");
      const errorDescFromSearch = searchParams.get("error_description");
      const errorFromHash = hashParams.get("error");
      const errorDescFromHash = hashParams.get("error_description");
      
      const errorMessage = errorDescFromSearch || errorDescFromHash || errorFromSearch || errorFromHash;
      
      if (errorMessage) {
        setError(`Authentication error: ${errorMessage}`);
        console.error("Auth error:", errorMessage);
        
        // Show a toast for better visibility
        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    };
    
    // Also capture success messages for email confirmations
    const processSuccessParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      
      // Check for email confirmation success
      if (searchParams.has("access_token") || searchParams.has("refresh_token")) {
        console.log("Email confirmation successful");
        
        toast({
          title: "Success!",
          description: "Your email has been confirmed. You're now signed in.",
        });
      }
    };
    
    // Process callback parameters
    processErrorParams();
    processSuccessParams();
  }, [location, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container px-4 max-w-md">
          <Card className="w-full border-driveAd-purple/20 dark:border-driveAd-purple/30 dark:bg-gray-800/90">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome to DriveAd
              </CardTitle>
              <CardDescription className="text-center">
                Sign in or create an account to continue
              </CardDescription>
            </CardHeader>
            
            {/* Show error at the top level if it's from a redirect */}
            {error && location.search.includes('error') && (
              <Alert variant="destructive" className="mx-6 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <CardContent className="pt-4">
                  <LoginForm />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="signup">
                <CardContent className="pt-4">
                  <SignUpForm />
                </CardContent>
              </TabsContent>
              
              <TabsContent value="admin">
                <CardContent className="pt-4">
                  <AdminLoginForm />
                </CardContent>
              </TabsContent>
            </Tabs>
            
            <CardFooter className="flex flex-col text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              <p>
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-driveAd-purple hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-driveAd-purple hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;

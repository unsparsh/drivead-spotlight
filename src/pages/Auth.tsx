
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
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot-password' | 'reset-password'>('signin');
  const [newPassword, setNewPassword] = useState("");
  
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
          navigate('/');
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

  // Check for reset password flow
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");
    
    console.log("Auth page - URL type parameter:", type);
    
    if (type === "recovery") {
      console.log("Setting mode to reset-password due to recovery parameter");
      setMode('reset-password');
      // Show toast with instructions
      toast({
        title: "Reset Password",
        description: "Enter your new password to complete the reset process.",
      });
    }
  }, [location.search, toast]);

  // Handle password reset submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    try {
      console.log("Attempting to update password");
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        console.error("Password update error:", error);
        throw error;
      }
      
      console.log("Password updated successfully");
      toast({
        title: "Success!",
        description: "Your password has been updated. Please sign in with your new password.",
      });
      
      setMode('signin');
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="container px-4 max-w-md">
          <Card className="w-full border-driveAd-purple/20 dark:border-driveAd-purple/30 dark:bg-gray-800/90">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {mode === 'signin' && 'Welcome Back'}
                {mode === 'signup' && 'Create an Account'}
                {mode === 'forgot-password' && 'Reset Your Password'}
                {mode === 'reset-password' && 'Set New Password'}
              </CardTitle>
              <CardDescription className="text-center">
                {mode === 'signin' && 'Sign in to your account to continue'}
                {mode === 'signup' && 'Enter your details to create an account'}
                {mode === 'forgot-password' && 'Enter your email to receive a reset link'}
                {mode === 'reset-password' && 'Enter your new password to complete the reset process'}
              </CardDescription>
            </CardHeader>
            
            {/* Show error at the top level if it's from a redirect */}
            {error && location.search.includes('error') && (
              <Alert variant="destructive" className="mx-6 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {mode === 'reset-password' ? (
              <CardContent className="pt-4">
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="new-password" className="text-sm font-medium">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-driveAd-purple hover:bg-driveAd-purple-dark text-white"
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            ) : mode === 'forgot-password' ? (
              <CardContent className="pt-4">
                <div className="mb-4">
                  <button 
                    onClick={() => setMode('signin')}
                    className="text-sm font-medium text-driveAd-purple hover:underline flex items-center"
                  >
                    ← Back to Sign In
                  </button>
                </div>
                <ForgotPasswordForm />
              </CardContent>
            ) : (
              <Tabs defaultValue={mode} value={mode} onValueChange={(value) => setMode(value as 'signin' | 'signup')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <CardContent className="pt-4">
                    <LoginForm 
                      onForgotPasswordClick={() => setMode('forgot-password')} 
                    />
                  </CardContent>
                </TabsContent>
                
                <TabsContent value="signup">
                  <CardContent className="pt-4">
                    <SignUpForm />
                  </CardContent>
                </TabsContent>
              </Tabs>
            )}
            
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

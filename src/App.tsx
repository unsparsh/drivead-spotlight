
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LenisProvider } from "@/components/LenisProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect } from "react";
import Index from "./pages/Index";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import Advertisers from "./pages/Advertisers";
import VehicleOwners from "./pages/VehicleOwners";
import AdvertiserRegistration from "./pages/AdvertiserRegistration";
import VehicleOwnerRegistration from "./pages/VehicleOwnerRegistration";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// This component handles initializing the theme
const ThemeInitializer = () => {
  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme');
    
    // Check if user has a system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set the theme based on preference or system
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply the theme to the document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LenisProvider>
        <ThemeInitializer />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/advertisers" element={<Advertisers />} />
              <Route path="/vehicle-owners" element={<VehicleOwners />} />
              <Route path="/advertiser-registration" element={
                <ProtectedRoute>
                  <AdvertiserRegistration />
                </ProtectedRoute>
              } />
              <Route path="/vehicle-owner-registration" element={
                <ProtectedRoute>
                  <VehicleOwnerRegistration />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LenisProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

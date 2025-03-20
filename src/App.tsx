
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advertisers from "./pages/Advertisers";
import VehicleOwners from "./pages/VehicleOwners";
import AdvertiserRegistration from "./pages/AdvertiserRegistration";
import VehicleOwnerRegistration from "./pages/VehicleOwnerRegistration";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<Auth />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

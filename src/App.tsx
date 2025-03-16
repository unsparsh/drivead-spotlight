
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advertisers from "./pages/Advertisers";
import VehicleOwners from "./pages/VehicleOwners";
import AdvertiserRegistration from "./pages/AdvertiserRegistration";
import VehicleOwnerRegistration from "./pages/VehicleOwnerRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advertisers" element={<Advertisers />} />
          <Route path="/vehicle-owners" element={<VehicleOwners />} />
          <Route path="/advertiser-registration" element={<AdvertiserRegistration />} />
          <Route path="/vehicle-owner-registration" element={<VehicleOwnerRegistration />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

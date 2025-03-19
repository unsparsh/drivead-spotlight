
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Import refactored components
import HeroSection from '@/components/vehicle-owners/HeroSection';
import RegistrationForm from '@/components/vehicle-owners/RegistrationForm';
import CampaignList from '@/components/vehicle-owners/CampaignList';
import HowItWorks from '@/components/vehicle-owners/HowItWorks';
import PhotoVerificationSection from '@/components/vehicle-owners/PhotoVerificationSection';
import BenefitsSection from '@/components/vehicle-owners/BenefitsSection';

interface Campaign {
  id: string;
  name: string;
  company: string;
  count: number;
  daily_rate: number;
}

const VehicleOwners = () => {
  const { toast } = useToast();
  const [vehicleType, setVehicleType] = useState('auto');
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [availableBanners, setAvailableBanners] = useState<Campaign[]>([]);
  const [showCaptureSection, setShowCaptureSection] = useState(false);
  
  // Fetch campaigns from Supabase
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Campaign[];
    }
  });
  
  // Filter campaigns based on vehicle type
  useEffect(() => {
    if (campaigns) {
      const filteredBanners = campaigns.filter(campaign => 
        (vehicleType === 'auto' && campaign.daily_rate === 70) || 
        (vehicleType === 'car' && campaign.daily_rate === 100)
      );
      setAvailableBanners(filteredBanners);
    }
  }, [campaigns, vehicleType]);
  
  const handleVehicleTypeChange = (value: string) => {
    setVehicleType(value);
    setSelectedBanner(null);
    
    if (campaigns) {
      const filteredBanners = campaigns.filter(campaign => 
        (value === 'auto' && campaign.daily_rate === 70) || 
        (value === 'car' && campaign.daily_rate === 100)
      );
      setAvailableBanners(filteredBanners);
    }
  };
  
  const handleBannerSelect = (bannerId: string) => {
    if (selectedBanner === bannerId) {
      setSelectedBanner(null);
    } else {
      setSelectedBanner(bannerId);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBanner) {
      toast({
        title: "Please select a banner",
        description: "You need to select an available banner to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Update campaign count locally (in a real app, this should update the database)
    setAvailableBanners(prev => 
      prev.map(banner => 
        banner.id === selectedBanner 
          ? { ...banner, count: banner.count - 1 } 
          : banner
      ).filter(banner => banner.count > 0)
    );
    
    toast({
      title: "Banner Selected Successfully!",
      description: "You can now upload verification photos to earn daily payments.",
    });
    
    setShowCaptureSection(true);
  };
  
  // Error handling for campaigns loading
  if (error) {
    toast({
      title: "Error loading campaigns",
      description: "There was an error loading available campaigns. Please try again later.",
      variant: "destructive",
    });
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {!showCaptureSection ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold">Select Available Banner</h2>
                    <p className="text-xl text-gray-600">
                      Choose an advertisement banner based on your vehicle type. Limited banners available on first-come basis.
                    </p>
                    
                    <RegistrationForm 
                      vehicleType={vehicleType}
                      onVehicleTypeChange={handleVehicleTypeChange}
                      onSubmit={handleSubmit}
                    />
                  </div>
                  
                  <div className="space-y-8">
                    <div className="sticky top-8">
                      <h3 className="text-xl font-semibold mb-6">Available Banners</h3>
                      
                      <CampaignList 
                        isLoading={isLoading}
                        availableBanners={availableBanners}
                        selectedBanner={selectedBanner}
                        onBannerSelect={handleBannerSelect}
                      />
                      
                      <HowItWorks />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <PhotoVerificationSection 
                    onReturnToSelection={() => setShowCaptureSection(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        
        <BenefitsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleOwners;

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Truck, IndianRupee, CalendarDays, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Advertisers = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [vehicleType, setVehicleType] = useState('car');
  const [days, setDays] = useState(7);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    requesterRole: '',
    bannerDetails: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const vehiclePrices = {
    auto: 70,
    car: 100
  };
  
  const dailyRate = vehicleType === 'auto' ? vehiclePrices.auto : vehiclePrices.car;
  const totalCost = dailyRate * days;
  const gstAmount = Math.round(totalCost * 0.18);
  const finalAmount = totalCost + gstAmount;

  // Role options for the dropdown
  const roleOptions = [
    { value: 'marketing_manager', label: 'Marketing Manager' },
    { value: 'ceo', label: 'CEO/Founder' },
    { value: 'marketing_director', label: 'Marketing Director' },
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'advertising_manager', label: 'Advertising Manager' },
    { value: 'brand_manager', label: 'Brand Manager' },
    { value: 'other', label: 'Other' }
  ];

  // Auto-detect location on component mount
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      // First try browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Use reverse geocoding to get city name
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
              );
              const data = await response.json();
              const location = `${data.city}, ${data.principalSubdivision}`;
              
              setFormData(prev => ({ ...prev, location }));
              toast({
                title: "Location Detected",
                description: `Auto-detected your location: ${location}`,
              });
            } catch (error) {
              console.error('Reverse geocoding failed:', error);
              fallbackLocationDetection();
            }
            setIsDetectingLocation(false);
          },
          (error) => {
            console.error('Geolocation failed:', error);
            fallbackLocationDetection();
          },
          { timeout: 10000 }
        );
      } else {
        fallbackLocationDetection();
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      setIsDetectingLocation(false);
    }
  };

  const fallbackLocationDetection = async () => {
    try {
      // Fallback to IP-based location
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const location = `${data.city}, ${data.region}`;
      
      setFormData(prev => ({ ...prev, location }));
      toast({
        title: "Location Detected",
        description: `Detected your location: ${location}`,
      });
    } catch (error) {
      console.error('IP location detection failed:', error);
      toast({
        title: "Location Detection Failed",
        description: "Please enter your location manually",
        variant: "destructive",
      });
    }
    setIsDetectingLocation(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, requesterRole: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!isAuthenticated) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a campaign request.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!formData.requesterRole) {
        toast({
          title: "Role Required",
          description: "Please select your role in the company.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Save campaign request to database
      const { error } = await supabase
        .from('campaign_requests')
        .insert({
          advertiser_id: user?.id,
          company_name: formData.companyName,
          company_location: formData.location,
          email: formData.email,
          phone: formData.phone,
          requester_role: formData.requesterRole,
          vehicle_type: vehicleType,
          duration: days,
          banner_details: formData.bannerDetails,
          total_amount: finalAmount
        });
      
      if (error) throw error;
      
      toast({
        title: "Campaign Request Submitted!",
        description: "Your request has been sent for review. We'll contact you once it's approved.",
      });
      
      // Reset form
      setFormData({
        companyName: '',
        email: '',
        phone: '',
        requesterRole: '',
        bannerDetails: '',
        location: ''
      });
      setDays(7);
      setVehicleType('car');
      
      // Re-detect location for next use
      detectLocation();
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message || "There was a problem submitting your request.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 gradient-bg text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Advertise Your Brand on Wheels</h1>
              <p className="text-xl text-white/90">
                Create impactful mobile advertising campaigns that drive results for your business.
              </p>
            </div>
          </div>
        </section>
        
        {/* Pricing Calculator */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold dark:text-white">Create Your Campaign</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Customize your mobile advertising campaign by selecting your preferred vehicle type and campaign duration.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        name="companyName" 
                        placeholder="Your company name" 
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="location">Company Location</Label>
                      <div className="relative">
                        <Input 
                          id="location" 
                          name="location" 
                          placeholder={isDetectingLocation ? "Detecting location..." : "City, State/Province"}
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={isDetectingLocation}
                          required
                        />
                        {isDetectingLocation && (
                          <MapPin className="absolute right-3 top-3 h-4 w-4 animate-pulse text-driveAd-purple" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We've auto-detected your location. You can edit it if needed.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="Your phone number" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="requesterRole">Your Role in the Company</Label>
                      <Select value={formData.requesterRole} onValueChange={handleRoleChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Select Vehicle Type</Label>
                      <RadioGroup 
                        value={vehicleType} 
                        onValueChange={setVehicleType}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auto" id="auto" />
                          <Label htmlFor="auto" className="flex items-center cursor-pointer">
                            <Truck className="w-5 h-5 mr-2" />
                            Auto Rickshaw (₹70/day)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="car" id="car" />
                          <Label htmlFor="car" className="flex items-center cursor-pointer">
                            <Car className="w-5 h-5 mr-2" />
                            Car/Cab (₹100/day)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Campaign Duration: {days} days</Label>
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {days} days
                        </span>
                      </div>
                      <Slider
                        value={[days]}
                        min={1}
                        max={30}
                        step={1}
                        onValueChange={(value) => setDays(value[0])}
                        className="py-4"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="bannerDetails">Banner Details</Label>
                      <Input 
                        id="bannerDetails" 
                        name="bannerDetails" 
                        placeholder="Describe your banner content or requirements" 
                        value={formData.bannerDetails}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-driveAd-purple hover:bg-driveAd-purple-dark text-white"
                      disabled={isSubmitting || isDetectingLocation}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Campaign Request'}
                    </Button>
                    
                    {!isAuthenticated && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                        You'll need to sign in to submit a campaign request.
                      </p>
                    )}
                  </form>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="campaign-summary-card dark:bg-gray-800 dark:border-gray-700"
                >
                  <h3 className="text-2xl font-bold mb-6 dark:text-white">Campaign Summary</h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        {vehicleType === 'auto' ? (
                          <Truck className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light mr-3" />
                        ) : (
                          <Car className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light mr-3" />
                        )}
                        <div>
                          <p className="font-medium text-lg dark:text-white">
                            {vehicleType === 'auto' ? 'Auto Rickshaw' : 'Car/Cab'} Advertising
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {vehicleType === 'auto' ? 'Urban local reach' : 'City-wide premium coverage'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg dark:text-white">₹{dailyRate}</p>
                        <p className="text-gray-500 dark:text-gray-400">per day</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center">
                        <CalendarDays className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light mr-3" />
                        <div>
                          <p className="font-medium text-lg dark:text-white">Campaign Duration</p>
                          <p className="text-gray-500 dark:text-gray-400">{days} days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg dark:text-white">×{days}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                        <p className="font-medium dark:text-white">₹{totalCost}</p>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 dark:text-gray-400">GST (18%)</p>
                        <p className="font-medium dark:text-white">₹{gstAmount}</p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                        <p className="text-xl font-bold dark:text-white">Total</p>
                        <p className="text-2xl font-bold text-driveAd-purple dark:text-driveAd-purple-light flex items-center">
                          <IndianRupee className="w-5 h-5 mr-1" />
                          {finalAmount}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        * Your request will be reviewed by our team. Approved campaigns will be added to our active banners list.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="faq-section">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Find answers to common questions about advertising with DriveAd.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="faq-card dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">How do you ensure my ads are being displayed?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use a photo verification system that requires drivers to take daily pictures of vehicles with your ad displayed. These photos are timestamped and geotagged for authenticity.
                  </p>
                </div>
                
                <div className="faq-card dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">How many vehicles will display my advertisement?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The number of vehicles depends on your budget and campaign requirements. We can scale from as few as 5 vehicles to hundreds across multiple cities.
                  </p>
                </div>
                
                <div className="faq-card dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">Can I choose specific areas for my ads to be displayed?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, we offer geo-targeting options that allow you to focus your campaign on specific neighborhoods, business districts, or routes based on your target audience.
                  </p>
                </div>
                
                <div className="faq-card dark:bg-gray-800 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">What's the process for creating and installing the banners?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We handle the entire process from design to installation. You provide the design assets and requirements, and our team takes care of producing weather-resistant, high-quality banners and installing them on the selected vehicles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Advertisers;

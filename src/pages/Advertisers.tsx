
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Car, Truck, IndianRupee, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

const Advertisers = () => {
  const { toast } = useToast();
  const [vehicleType, setVehicleType] = useState('car');
  const [days, setDays] = useState(7);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    bannerDetails: ''
  });
  
  const vehiclePrices = {
    auto: 70,
    car: 100
  };
  
  const totalCost = vehicleType === 'auto' ? 
    vehiclePrices.auto * days : 
    vehiclePrices.car * days;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Campaign Request Submitted!",
      description: "We'll contact you shortly to finalize your advertising campaign.",
    });
    
    // Reset form
    setFormData({
      companyName: '',
      email: '',
      phone: '',
      bannerDetails: ''
    });
    setDays(7);
    setVehicleType('car');
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
                        <span className="text-gray-500 flex items-center">
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
                    
                    <Button type="submit" size="lg" className="w-full bg-driveAd-purple hover:bg-driveAd-purple-dark text-white">
                      Submit Campaign Request
                    </Button>
                  </form>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="campaign-summary-card"
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
                        <p className="font-medium text-lg dark:text-white">₹{vehicleType === 'auto' ? vehiclePrices.auto : vehiclePrices.car}</p>
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
                        <p className="font-medium dark:text-white">₹{Math.round(totalCost * 0.18)}</p>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                        <p className="text-xl font-bold dark:text-white">Total</p>
                        <p className="text-2xl font-bold text-driveAd-purple dark:text-driveAd-purple-light flex items-center">
                          <IndianRupee className="w-5 h-5 mr-1" />
                          {totalCost + Math.round(totalCost * 0.18)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        * Final pricing may vary based on specific banner requirements and campaign details. Our team will contact you with a personalized quote.
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
                <div className="faq-card">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">How do you ensure my ads are being displayed?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We use a photo verification system that requires drivers to take daily pictures of vehicles with your ad displayed. These photos are timestamped and geotagged for authenticity.
                  </p>
                </div>
                
                <div className="faq-card">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">How many vehicles will display my advertisement?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    The number of vehicles depends on your budget and campaign requirements. We can scale from as few as 5 vehicles to hundreds across multiple cities.
                  </p>
                </div>
                
                <div className="faq-card">
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">Can I choose specific areas for my ads to be displayed?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes, we offer geo-targeting options that allow you to focus your campaign on specific neighborhoods, business districts, or routes based on your target audience.
                  </p>
                </div>
                
                <div className="faq-card">
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

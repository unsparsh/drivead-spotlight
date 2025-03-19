import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, Truck, Camera, CheckCircle, AlertCircle, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface Banner {
  id: string;
  name: string;
  company: string;
  count: number;
  dailyRate: number;
}

const banners: Banner[] = [
  { id: '1', name: 'TechStore Launch', company: 'TechStore India', count: 5, dailyRate: 70 },
  { id: '2', name: 'Summer Fashion Sale', company: 'StyleNow', count: 3, dailyRate: 100 },
  { id: '3', name: 'Food Delivery App', company: 'FreshEats', count: 8, dailyRate: 70 },
  { id: '4', name: 'New Smartphone', company: 'MobiTech', count: 2, dailyRate: 100 },
  { id: '5', name: 'Banking App', company: 'SecureBank', count: 4, dailyRate: 70 },
  { id: '6', name: 'Streaming Service', company: 'StreamX', count: 6, dailyRate: 100 },
];

const VehicleOwners = () => {
  const { toast } = useToast();
  const [vehicleType, setVehicleType] = useState('auto');
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [availableBanners, setAvailableBanners] = useState<Banner[]>(banners);
  const [showCaptureSection, setShowCaptureSection] = useState(false);
  const [photoStatus, setPhotoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [photoMessage, setPhotoMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleVehicleTypeChange = (value: string) => {
    setVehicleType(value);
    setSelectedBanner(null);
    const filteredBanners = banners.filter(banner => 
      (value === 'auto' && banner.dailyRate === 70) || 
      (value === 'car' && banner.dailyRate === 100)
    );
    setAvailableBanners(filteredBanners);
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
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    
    const now = new Date();
    const fileDate = new Date(file.lastModified);
    
    if (fileDate.getDate() === now.getDate() && 
        fileDate.getMonth() === now.getMonth() && 
        fileDate.getFullYear() === now.getFullYear()) {
      setPhotoStatus('success');
      setPhotoMessage('Photo verification successful! Your daily payment will be processed.');
      
      toast({
        title: "Photo Verification Successful!",
        description: "Your daily payment will be processed shortly.",
      });
    } else {
      setPhotoStatus('error');
      setPhotoMessage('Photo verification failed. Please take a new photo of your vehicle with the banner.');
      
      toast({
        title: "Photo Verification Failed",
        description: "Please take a new photo of your vehicle with the banner.",
        variant: "destructive",
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 gradient-bg text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Earn Money With Your Vehicle</h1>
              <p className="text-xl text-white/90">
                Join our network of vehicle owners and earn daily income by displaying advertisements.
              </p>
            </div>
          </div>
        </section>
        
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
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label>Select Your Vehicle Type</Label>
                        <RadioGroup 
                          value={vehicleType} 
                          onValueChange={handleVehicleTypeChange}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="auto" id="auto-owner" />
                            <Label htmlFor="auto-owner" className="flex items-center cursor-pointer">
                              <Truck className="w-5 h-5 mr-2" />
                              Auto Rickshaw (₹70/day)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="car" id="car-owner" />
                            <Label htmlFor="car-owner" className="flex items-center cursor-pointer">
                              <Car className="w-5 h-5 mr-2" />
                              Car/Cab (₹100/day)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="vehicleNumber">Vehicle Registration Number</Label>
                        <Input 
                          id="vehicleNumber" 
                          placeholder="Enter your vehicle number" 
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label htmlFor="driverName">Full Name</Label>
                          <Input 
                            id="driverName" 
                            placeholder="Your full name" 
                            required
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="driverPhone">Phone Number</Label>
                          <Input 
                            id="driverPhone" 
                            placeholder="Your phone number" 
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="vehicleDetails">Vehicle Details</Label>
                        <Textarea 
                          id="vehicleDetails" 
                          placeholder="Make, model, year, color, etc." 
                          required
                        />
                      </div>
                      
                      <Button type="submit" size="lg" className="w-full bg-driveAd-orange hover:bg-orange-600 text-white">
                        Select Banner & Continue
                      </Button>
                    </form>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="sticky top-8">
                      <h3 className="text-xl font-semibold mb-6">Available Banners</h3>
                      
                      {availableBanners.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {availableBanners.map(banner => (
                            <Card 
                              key={banner.id} 
                              className={`cursor-pointer transition-colors ${
                                selectedBanner === banner.id ? 'border-driveAd-purple bg-driveAd-purple/5' : ''
                              }`}
                              onClick={() => handleBannerSelect(banner.id)}
                            >
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold text-lg">{banner.name}</h4>
                                    <p className="text-gray-500 mb-3">{banner.company}</p>
                                    <div className="flex items-center text-sm text-driveAd-purple">
                                      <IndianRupee className="w-4 h-4 mr-1" />
                                      <span>{banner.dailyRate} per day</span>
                                    </div>
                                  </div>
                                  <div className="bg-amber-100 text-amber-800 text-xs py-1 px-2 rounded-full">
                                    {banner.count} remaining
                                  </div>
                                </div>
                                {selectedBanner === banner.id && (
                                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-driveAd-purple">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    <span>Selected</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Banners Available</h3>
                          <p className="text-gray-500">
                            There are currently no banners available for your vehicle type. Please check back later.
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                        <h4 className="font-semibold mb-2">How it works:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                            <span>Select an available banner for your vehicle type</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                            <span>We'll contact you to arrange banner installation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                            <span>Upload daily photo verification to earn your payment</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">Banner Selected Successfully!</h2>
                      <p className="text-gray-600">
                        You've selected a banner to display on your vehicle. Our team will contact you soon for installation.
                      </p>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="border-t border-b border-gray-200 py-6">
                        <h3 className="text-lg font-semibold mb-4">Daily Photo Verification</h3>
                        <p className="text-gray-600 mb-6">
                          To receive your daily payment, please take a photo of your vehicle with the banner installed. The photo must be taken today.
                        </p>
                        
                        <div className="flex justify-center">
                          <div 
                            onClick={triggerFileInput}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors w-full max-w-md"
                          >
                            <Camera className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-500 text-center">Take a photo of your vehicle with banner</p>
                            <input 
                              type="file" 
                              accept="image/*" 
                              capture="environment"
                              ref={fileInputRef}
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </div>
                        </div>
                        
                        {photoStatus !== 'idle' && (
                          <div className={`mt-6 p-4 rounded-lg ${
                            photoStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                          }`}>
                            <div className="flex items-start">
                              {photoStatus === 'success' ? (
                                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                              )}
                              <p>{photoMessage}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <Button 
                          className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white"
                          onClick={() => setShowCaptureSection(false)}
                        >
                          Return to Banner Selection
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Benefits for Vehicle Owners</h2>
              <p className="text-xl text-gray-600">Join our network and enjoy these advantages.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
                <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-8 h-8 text-driveAd-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Daily Payments</h3>
                <p className="text-gray-600">Earn ₹70-₹100 daily just by displaying advertisements on your vehicle during your regular routes.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
                <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-driveAd-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Simple Verification</h3>
                <p className="text-gray-600">Just take a daily photo of your vehicle with the advertisement to verify and receive payment.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
                <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-driveAd-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">No Extra Work</h3>
                <p className="text-gray-600">Continue your normal driving routine. No special routes or additional mileage required.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleOwners;

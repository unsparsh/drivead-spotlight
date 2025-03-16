
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Phone, Car, MapPin, Calendar, FileText, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VehicleOwnerRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    vehicleType: '',
    vehicleModel: '',
    vehiclePlate: '',
    drivingRegion: '',
    drivingHours: '',
    idProof: '',
    acceptTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Please accept terms",
        description: "You must accept the terms and conditions to register.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful!",
        description: "Your vehicle owner account has been created. You can now log in.",
      });
      
      // Redirect to vehicle owners page
      navigate('/vehicle-owners');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Vehicle Owner Registration</h1>
              <p className="text-lg text-gray-600">
                Register your vehicle and start earning with DriveAd today.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Driver & Vehicle Information</CardTitle>
                <CardDescription>
                  Please provide your details to join our network of vehicle owners.
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="fullName"
                            name="fullName"
                            placeholder="Your full name"
                            className="pl-10"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="phone"
                          name="phone"
                          placeholder="Your phone number"
                          className="pl-10"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type *</Label>
                        <div className="relative">
                          <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="vehicleType"
                            name="vehicleType"
                            placeholder="Auto/Car/Cab"
                            className="pl-10"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                        <Input 
                          id="vehicleModel"
                          name="vehicleModel"
                          placeholder="e.g. Honda City, Bajaj RE"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePlate">Vehicle Registration Number *</Label>
                      <Input 
                        id="vehiclePlate"
                        name="vehiclePlate"
                        placeholder="Vehicle plate number"
                        value={formData.vehiclePlate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="drivingRegion">Primary Driving Area *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="drivingRegion"
                            name="drivingRegion"
                            placeholder="City/Locality"
                            className="pl-10"
                            value={formData.drivingRegion}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="drivingHours">Average Daily Driving Hours</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="drivingHours"
                            name="drivingHours"
                            placeholder="e.g. 8-10 hours"
                            className="pl-10"
                            value={formData.drivingHours}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idProof">ID Proof Reference Number *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="idProof"
                          name="idProof"
                          placeholder="Driving License/Aadhaar Number"
                          className="pl-10"
                          value={formData.idProof}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <Alert className="bg-yellow-50 border-yellow-200">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700">
                        After registration, you will need to download our mobile app to take and upload daily verification photos of advertisements on your vehicle.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex items-start space-x-2 mt-6">
                      <Checkbox 
                        id="acceptTerms" 
                        checked={formData.acceptTerms}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label 
                        htmlFor="acceptTerms" 
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I accept the <a href="#" className="text-driveAd-orange underline">terms and conditions</a> and understand that I will be required to take daily verification photos.
                      </Label>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="bg-driveAd-orange hover:bg-orange-600 w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => navigate('/vehicle-owners')}
                  >
                    Return to Vehicle Owners
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleOwnerRegistration;

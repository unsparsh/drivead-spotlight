
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
import { Building2, Mail, Phone, User, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AdvertiserRegistration = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    industryType: '',
    marketingGoals: '',
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
        description: "Your advertiser account has been created. You can now log in.",
      });
      
      // Redirect to advertiser page
      navigate('/advertisers');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Advertiser Registration</h1>
              <p className="text-lg text-gray-600">
                Create your advertiser account and start reaching customers on the move.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Please provide your business details to create your advertiser account.
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="companyName"
                            name="companyName"
                            placeholder="Your company name"
                            className="pl-10"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="contactName"
                            name="contactName"
                            placeholder="Full name"
                            className="pl-10"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@company.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
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
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Input 
                        id="address"
                        name="address"
                        placeholder="Complete address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input 
                          id="website"
                          name="website"
                          placeholder="https://yourwebsite.com"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industryType">Industry Type</Label>
                        <Input 
                          id="industryType"
                          name="industryType"
                          placeholder="e.g. Retail, Technology, Food"
                          value={formData.industryType}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="marketingGoals">Marketing Goals</Label>
                      <Textarea 
                        id="marketingGoals"
                        name="marketingGoals"
                        placeholder="Tell us about your marketing objectives and target audience"
                        rows={4}
                        value={formData.marketingGoals}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700">
                        After registration, our team will contact you to discuss your advertising needs and customize a campaign.
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
                        I accept the <a href="#" className="text-driveAd-purple underline">terms and conditions</a> and understand DriveAd's privacy policy.
                      </Label>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    className="bg-driveAd-purple hover:bg-driveAd-purple-dark w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => navigate('/advertisers')}
                  >
                    Return to Advertisers
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

export default AdvertiserRegistration;

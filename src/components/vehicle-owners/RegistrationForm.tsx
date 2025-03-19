
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import VehicleTypeSelector from "./VehicleTypeSelector";

interface RegistrationFormProps {
  vehicleType: string;
  onVehicleTypeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm = ({ 
  vehicleType, 
  onVehicleTypeChange, 
  onSubmit 
}: RegistrationFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <VehicleTypeSelector 
        vehicleType={vehicleType} 
        onVehicleTypeChange={onVehicleTypeChange} 
      />
      
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
  );
};

export default RegistrationForm;

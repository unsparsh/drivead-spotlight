
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Car, Truck } from 'lucide-react';

interface VehicleTypeSelectorProps {
  vehicleType: string;
  onVehicleTypeChange: (value: string) => void;
}

const VehicleTypeSelector = ({ vehicleType, onVehicleTypeChange }: VehicleTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label>Select Your Vehicle Type</Label>
      <RadioGroup 
        value={vehicleType} 
        onValueChange={onVehicleTypeChange}
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
  );
};

export default VehicleTypeSelector;

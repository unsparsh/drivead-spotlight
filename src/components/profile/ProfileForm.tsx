
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from 'lucide-react';
import { ProfileData } from '@/hooks/useProfile';

interface ProfileFormProps {
  profileData: ProfileData;
  updating: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (field: 'is_advertiser' | 'is_vehicle_owner', checked: boolean) => void;
  onSubmit: () => Promise<void>;
}

const ProfileForm = ({ 
  profileData, 
  updating, 
  onInputChange, 
  onCheckboxChange, 
  onSubmit 
}: ProfileFormProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={profileData.full_name || ''}
            onChange={onInputChange}
            placeholder="Your full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={profileData.username || ''}
            onChange={onInputChange}
            placeholder="Your username"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={profileData.phone || ''}
          onChange={onInputChange}
          placeholder="Your phone number"
        />
      </div>
      
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium">Account Type</h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="is_advertiser"
              checked={profileData.is_advertiser}
              onCheckedChange={(checked) => 
                onCheckboxChange('is_advertiser', checked as boolean)
              }
            />
            <Label htmlFor="is_advertiser">I am an Advertiser</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="is_vehicle_owner"
              checked={profileData.is_vehicle_owner}
              onCheckedChange={(checked) => 
                onCheckboxChange('is_vehicle_owner', checked as boolean)
              }
            />
            <Label htmlFor="is_vehicle_owner">I am a Vehicle Owner</Label>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button 
          className="bg-driveAd-purple hover:bg-driveAd-purple-dark"
          onClick={onSubmit}
          disabled={updating}
        >
          {updating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </>
  );
};

export default ProfileForm;

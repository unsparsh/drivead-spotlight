
import { useState } from 'react';
import { CampaignRequest } from '@/types/Campaign';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReviewCampaignDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRequest: CampaignRequest | null;
  onSubmit: (formData: { name: string; count: number; adminNotes: string }) => Promise<void>;
}

export const ReviewCampaignDialog = ({ 
  open, 
  setOpen, 
  selectedRequest,
  onSubmit 
}: ReviewCampaignDialogProps) => {
  const [formData, setFormData] = useState({
    name: selectedRequest ? `${selectedRequest.company_name} Campaign` : '',
    count: 5,
    adminNotes: selectedRequest?.admin_notes || '',
  });

  // Update form data when selected request changes
  useState(() => {
    if (selectedRequest) {
      setFormData({
        name: `${selectedRequest.company_name} Campaign`,
        count: 5,
        adminNotes: selectedRequest.admin_notes || '',
      });
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFormData(prev => ({ ...prev, count: value }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Approve Campaign Request</DialogTitle>
          <DialogDescription>
            Review and approve this campaign to make it available for vehicle owners.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="count">Available Slots</Label>
            <Input
              id="count"
              name="count"
              type="number"
              min="1"
              value={formData.count}
              onChange={handleCountChange}
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Number of vehicle banners available for this campaign
            </p>
          </div>
          
          <div>
            <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
            <Textarea
              id="adminNotes"
              name="adminNotes"
              value={formData.adminNotes}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Add any notes about this campaign approval"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white">
            Approve Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

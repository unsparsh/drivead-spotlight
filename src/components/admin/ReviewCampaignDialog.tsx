
import { useState, useEffect } from 'react';
import { CampaignRequest } from '@/types/Campaign';
import { CampaignRequestDetails } from './CampaignRequestDetails';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReviewCampaignDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedRequest: CampaignRequest | null;
  onSubmit: (formData: { name: string; count: number; adminNotes: string }) => Promise<void>;
  isPending: boolean;
}

export const ReviewCampaignDialog = ({ 
  open, 
  setOpen, 
  selectedRequest,
  onSubmit,
  isPending 
}: ReviewCampaignDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    count: 5,
    adminNotes: '',
  });

  // Update form data when selected request changes
  useEffect(() => {
    if (selectedRequest) {
      setFormData({
        name: `${selectedRequest.company_name} Campaign`,
        count: 5,
        adminNotes: selectedRequest.admin_notes || '',
      });
    }
  }, [selectedRequest]);
  
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

  if (!selectedRequest) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Review Campaign Request</DialogTitle>
          <DialogDescription>
            Review the complete campaign details and configure approval settings.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Campaign Details</TabsTrigger>
            <TabsTrigger value="approval">Approval Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <CampaignRequestDetails request={selectedRequest} />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="approval" className="mt-4">
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white"
            disabled={isPending}
          >
            {isPending ? 'Approving...' : 'Approve Campaign'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

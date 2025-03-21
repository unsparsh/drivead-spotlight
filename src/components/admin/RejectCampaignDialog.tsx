
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RejectCampaignDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (formData: { adminNotes: string }) => Promise<void>;
}

export const RejectCampaignDialog = ({ 
  open, 
  setOpen, 
  onSubmit 
}: RejectCampaignDialogProps) => {
  const [formData, setFormData] = useState({
    adminNotes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Campaign Request</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject this campaign request? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <Label htmlFor="rejectNotes">Rejection Reason (Optional)</Label>
          <Textarea
            id="rejectNotes"
            name="adminNotes"
            value={formData.adminNotes}
            onChange={handleInputChange}
            className="mt-1"
            placeholder="Explain why this campaign is being rejected"
          />
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} className="bg-red-600 hover:bg-red-700 text-white">
            Reject Campaign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


import { useState } from 'react';
import { CampaignRequest } from '@/types/Campaign';
import { formatDate, getStatusBadge } from '@/utils/adminHelpers';
import { ReviewCampaignDialog } from './ReviewCampaignDialog';
import { RejectCampaignDialog } from './RejectCampaignDialog';
import { useApproveCampaign, useRejectCampaign } from '@/hooks/useAdminCampaigns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle, AlertTriangle, IndianRupee, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CampaignRequestsTableProps {
  campaignRequests: CampaignRequest[];
  loading: boolean;
  refreshData: () => void;
}

export const CampaignRequestsTable = ({
  campaignRequests,
  loading,
  refreshData
}: CampaignRequestsTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState<CampaignRequest | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const { toast } = useToast();

  // Use React Query mutations
  const approveMutation = useApproveCampaign();
  const rejectMutation = useRejectCampaign();

  const handleReviewClick = (request: CampaignRequest) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
  };
  
  const handleRejectClick = (request: CampaignRequest) => {
    setSelectedRequest(request);
    setRejectDialogOpen(true);
  };

  const handleApprove = async (formData: { name: string; count: number; adminNotes: string }) => {
    if (!selectedRequest) return;
    
    await approveMutation.mutateAsync({ 
      formData, 
      selectedRequest 
    });
    
    setReviewDialogOpen(false);
    refreshData();
  };
  
  const handleReject = async (formData: { adminNotes: string }) => {
    if (!selectedRequest) return;
    
    await rejectMutation.mutateAsync({ 
      formData, 
      selectedRequest 
    });
    
    setRejectDialogOpen(false);
    refreshData();
  };

  // Quick approve function
  const handleQuickApprove = async (request: CampaignRequest) => {
    const defaultFormData = {
      name: `${request.company_name} Campaign`,
      count: 5,
      adminNotes: 'Quick approved by admin'
    };
    
    try {
      await approveMutation.mutateAsync({
        formData: defaultFormData,
        selectedRequest: request
      });
      
      toast({
        title: "Campaign Quick-Approved",
        description: "The campaign has been approved with default settings.",
      });
      
      refreshData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not approve campaign",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Clock className="w-10 h-10 animate-pulse text-driveAd-purple mx-auto mb-4" />
        <p>Loading requests...</p>
      </div>
    );
  }

  if (campaignRequests.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
        <h3 className="text-lg font-medium mb-1 dark:text-white">No Campaign Requests</h3>
        <p className="text-gray-600 dark:text-gray-400">There are no pending campaign requests at this time.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table>
          <TableCaption>List of all campaign requests from advertisers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaignRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.company_name}</TableCell>
                <TableCell>{request.vehicle_type === 'auto' ? 'Auto Rickshaw' : 'Car/Cab'}</TableCell>
                <TableCell>{request.duration} days</TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="flex items-center">
                    <IndianRupee className="w-3 h-3 mr-1" />
                    {request.total_amount}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(request.created_at)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' ? (
                    <div className="flex justify-end gap-2">
                      <Button 
                        onClick={() => handleQuickApprove(request)}
                        variant="outline" 
                        size="sm"
                        className="text-amber-500 border-amber-200 hover:bg-amber-50 dark:border-amber-900 dark:hover:bg-amber-950/20"
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Quick Approve
                      </Button>
                      <Button 
                        onClick={() => handleReviewClick(request)}
                        variant="outline" 
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                      <Button 
                        onClick={() => handleRejectClick(request)}
                        variant="outline" 
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {request.status === 'approved' ? 'Approved' : 'Rejected'}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReviewCampaignDialog 
        open={reviewDialogOpen} 
        setOpen={setReviewDialogOpen}
        selectedRequest={selectedRequest}
        onSubmit={handleApprove}
        isPending={approveMutation.isPending}
      />

      <RejectCampaignDialog
        open={rejectDialogOpen}
        setOpen={setRejectDialogOpen}
        onSubmit={handleReject}
        isPending={rejectMutation.isPending}
      />
    </>
  );
};

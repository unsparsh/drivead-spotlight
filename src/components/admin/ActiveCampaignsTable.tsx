
import { Campaign } from '@/types/Campaign';
import { useUpdateCampaignVerification } from '@/hooks/useAdminCampaigns';
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
import { CheckCircle, XCircle, AlertTriangle, Clock, IndianRupee, Edit } from 'lucide-react';

interface ActiveCampaignsTableProps {
  campaigns: Campaign[];
  loading: boolean;
}

export const ActiveCampaignsTable = ({
  campaigns,
  loading
}: ActiveCampaignsTableProps) => {
  // Use React Query mutation
  const updateVerificationMutation = useUpdateCampaignVerification();

  const handleVerifyChange = async (campaign: Campaign, newStatus: boolean) => {
    await updateVerificationMutation.mutateAsync({
      campaignId: campaign.id,
      isVerified: newStatus
    });
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Clock className="w-10 h-10 animate-pulse text-driveAd-purple mx-auto mb-4" />
        <p>Loading campaigns...</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
        <h3 className="text-lg font-medium mb-1 dark:text-white">No Active Campaigns</h3>
        <p className="text-gray-600 dark:text-gray-400">There are no active campaigns at this time.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <Table>
        <TableCaption>List of all campaigns in the system</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Available</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{campaign.company}</TableCell>
              <TableCell>
                <span className="flex items-center">
                  <IndianRupee className="w-3 h-3 mr-1" />
                  {campaign.daily_rate}/day
                </span>
              </TableCell>
              <TableCell>{campaign.count}</TableCell>
              <TableCell>
                {campaign.is_verified ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="w-3 h-3 mr-1" />Visible
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                    <XCircle className="w-3 h-3 mr-1" />Hidden
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {campaign.is_verified ? (
                    <Button 
                      onClick={() => handleVerifyChange(campaign, false)}
                      variant="outline" 
                      size="sm"
                      className="text-gray-500 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                      disabled={updateVerificationMutation.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Hide
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleVerifyChange(campaign, true)}
                      variant="outline" 
                      size="sm"
                      className="text-green-500 border-green-200 hover:bg-green-50 dark:border-green-900 dark:hover:bg-green-950/20"
                      disabled={updateVerificationMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Show
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

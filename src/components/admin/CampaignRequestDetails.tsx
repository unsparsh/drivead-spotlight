
import { CampaignRequest } from '@/types/Campaign';
import { formatDate } from '@/utils/adminHelpers';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, User, Mail, Phone, MapPin, Calendar, DollarSign, Car, Clock } from 'lucide-react';

interface CampaignRequestDetailsProps {
  request: CampaignRequest;
}

export const CampaignRequestDetails = ({ request }: CampaignRequestDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5 text-driveAd-purple" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</p>
              <p className="font-semibold">{request.company_name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Location
              </p>
              <p>{request.company_location || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requester Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-driveAd-purple" />
            Contact Person
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-semibold">{request.requester_name || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
              <p>{request.requester_role || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Email
              </p>
              <p className="text-blue-600 hover:underline">{request.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Phone
              </p>
              <p>{request.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="w-5 h-5 text-driveAd-purple" />
            Campaign Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vehicle Type</p>
              <Badge variant="outline" className="capitalize">
                {request.vehicle_type === 'auto' ? 'Auto Rickshaw' : 'Car/Cab'}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Duration
              </p>
              <p>{request.duration} days</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Total Amount
              </p>
              <p className="font-semibold text-green-600">₹{request.total_amount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Submitted
              </p>
              <p>{formatDate(request.created_at)}</p>
            </div>
          </div>
          
          {request.banner_details && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Banner Details</p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm whitespace-pre-wrap">{request.banner_details}</p>
                </div>
              </div>
            </>
          )}

          {request.admin_notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Admin Notes</p>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm whitespace-pre-wrap">{request.admin_notes}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

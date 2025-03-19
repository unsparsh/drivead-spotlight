
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, IndianRupee, Loader2 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  company: string;
  count: number;
  daily_rate: number;
}

interface CampaignListProps {
  isLoading: boolean;
  availableBanners: Campaign[];
  selectedBanner: string | null;
  onBannerSelect: (bannerId: string) => void;
}

const CampaignList = ({
  isLoading,
  availableBanners,
  selectedBanner,
  onBannerSelect
}: CampaignListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-driveAd-purple" />
        <span className="ml-3 text-driveAd-purple">Loading campaigns...</span>
      </div>
    );
  }

  if (availableBanners.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No Banners Available</h3>
        <p className="text-gray-500">
          There are currently no banners available for your vehicle type. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {availableBanners.map(banner => (
        <Card 
          key={banner.id} 
          className={`cursor-pointer transition-colors ${
            selectedBanner === banner.id ? 'border-driveAd-purple bg-driveAd-purple/5' : ''
          }`}
          onClick={() => onBannerSelect(banner.id)}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg">{banner.name}</h4>
                <p className="text-gray-500 mb-3">{banner.company}</p>
                <div className="flex items-center text-sm text-driveAd-purple">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span>{banner.daily_rate} per day</span>
                </div>
              </div>
              <div className="bg-amber-100 text-amber-800 text-xs py-1 px-2 rounded-full">
                {banner.count} remaining
              </div>
            </div>
            {selectedBanner === banner.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-driveAd-purple">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Selected</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignList;

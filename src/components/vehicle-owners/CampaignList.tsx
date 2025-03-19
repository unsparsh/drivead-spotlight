
import { AlertCircle, Loader2 } from 'lucide-react';
import BannerCard from './BannerCard';

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
        <BannerCard
          key={banner.id}
          id={banner.id}
          name={banner.name}
          company={banner.company}
          count={banner.count}
          dailyRate={banner.daily_rate}
          isSelected={selectedBanner === banner.id}
          onSelect={onBannerSelect}
        />
      ))}
    </div>
  );
};

export default CampaignList;

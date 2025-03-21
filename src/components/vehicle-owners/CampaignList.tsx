
import { AlertCircle, Loader2, Clock } from 'lucide-react';
import BannerCard from './BannerCard';

interface Campaign {
  id: string;
  name: string;
  company: string;
  count: number;
  daily_rate: number;
  is_verified?: boolean;
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
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <Clock className="w-16 h-16 text-driveAd-purple dark:text-driveAd-purple-light mx-auto mb-4" />
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 mb-6 max-w-xs mx-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=500&q=80" 
            alt="Person holding lightbulb" 
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
        
        <h3 className="text-lg font-medium mb-2 dark:text-white">No Available Banners now, wait for a while...</h3>
        <p className="text-gray-500 dark:text-gray-400">
          We're currently updating our banner inventory. Please check back soon for new advertising opportunities.
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


import { CheckCircle, IndianRupee } from 'lucide-react';

interface BannerCardProps {
  id: string;
  name: string;
  company: string;
  count: number;
  dailyRate: number;
  isSelected: boolean;
  onSelect: (bannerId: string) => void;
}

const BannerCard = ({
  id,
  name,
  company,
  count,
  dailyRate,
  isSelected,
  onSelect
}: BannerCardProps) => {
  return (
    <div 
      className={`cursor-pointer rounded-lg shadow-md p-6 transition-all ${
        isSelected 
          ? 'border-driveAd-purple bg-driveAd-purple/5 dark:bg-driveAd-purple/20' 
          : 'banner-card'
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg dark:text-white">{name}</h4>
          <p className="text-gray-500 dark:text-gray-400 mb-3">{company}</p>
          <div className="flex items-center text-sm text-driveAd-purple">
            <IndianRupee className="w-4 h-4 mr-1" />
            <span>{dailyRate} per day</span>
          </div>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs py-1 px-2 rounded-full">
          {count} remaining
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center text-driveAd-purple">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span>Selected</span>
        </div>
      )}
    </div>
  );
};

export default BannerCard;

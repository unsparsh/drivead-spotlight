
import { IndianRupee, Camera, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Benefits for Vehicle Owners</h2>
          <p className="text-xl text-gray-600">Join our network and enjoy these advantages.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
            <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
              <IndianRupee className="w-8 h-8 text-driveAd-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Daily Payments</h3>
            <p className="text-gray-600">Earn ₹70-₹100 daily just by displaying advertisements on your vehicle during your regular routes.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
            <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-driveAd-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Simple Verification</h3>
            <p className="text-gray-600">Just take a daily photo of your vehicle with the advertisement to verify and receive payment.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm card-hover">
            <div className="mb-6 bg-driveAd-orange/10 w-16 h-16 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-driveAd-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No Extra Work</h3>
            <p className="text-gray-600">Continue your normal driving routine. No special routes or additional mileage required.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

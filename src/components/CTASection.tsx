
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-driveAd-purple dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl relative">
          <div className="absolute inset-0 bg-gradient-to-r from-driveAd-purple to-driveAd-purple-dark opacity-95 dark:from-driveAd-purple-dark dark:to-driveAd-purple dark:opacity-50"></div>
          
          <div className="relative z-10 p-12 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Drive Your Brand Forward?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join hundreds of businesses using DriveAd to create mobile advertising campaigns that get noticed.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/advertiser-registration">
                  <Button size="lg" className="bg-white text-driveAd-purple hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-white">
                    Register as Advertiser
                  </Button>
                </Link>
                <Link to="/vehicle-owner-registration">
                  <Button size="lg" className="bg-driveAd-orange text-white hover:bg-orange-600">
                    Register Your Vehicle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-driveAd-orange/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

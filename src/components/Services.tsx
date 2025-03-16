
import { Car, Truck, IndianRupee } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Advertising Options</h2>
          <p className="text-xl text-gray-600">Choose the perfect vehicle type for your advertisement campaign.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm card-hover">
            <div className="p-8">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-driveAd-yellow rounded-full flex items-center justify-center">
                  <Truck className="w-12 h-12 text-driveAd-purple-dark" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">Auto Rickshaw Ads</h3>
              <p className="text-gray-600 text-center mb-6">Perfect for local visibility in high-traffic urban areas.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Rear panel advertisements</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Navigate narrow streets & alleys</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Ideal for local businesses</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Starting at</p>
                <div className="flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-driveAd-purple" />
                  <span className="text-4xl font-bold text-gray-900">70</span>
                </div>
                <p className="text-gray-500">per day</p>
              </div>
              
              <Link to="/advertisers">
                <Button className="w-full bg-driveAd-purple hover:bg-driveAd-purple-dark text-white">Select Auto</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm card-hover">
            <div className="p-8">
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-driveAd-green rounded-full flex items-center justify-center">
                  <Car className="w-12 h-12 text-driveAd-purple-dark" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">Car/Cab Advertisements</h3>
              <p className="text-gray-600 text-center mb-6">Excellent for broader city coverage and premium audience.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Side & rear panel advertisements</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Wider area coverage</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700">Premium audience targeting</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm uppercase tracking-wide mb-1">Starting at</p>
                <div className="flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-driveAd-purple" />
                  <span className="text-4xl font-bold text-gray-900">100</span>
                </div>
                <p className="text-gray-500">per day</p>
              </div>
              
              <Link to="/advertisers">
                <Button className="w-full bg-driveAd-orange hover:bg-orange-600 text-white">Select Car</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

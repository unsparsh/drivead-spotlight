
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import { Car, Truck, CheckCircle, Image, IndianRupee, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Benefits Section */}
        <section className="py-20 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Why Choose DriveAd?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Our platform provides unique advertising solutions with real advantages.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 card-hover dark:text-white">
                <div className="mb-6 bg-driveAd-purple/10 dark:bg-driveAd-purple/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">High Visibility</h3>
                <p className="text-gray-600 dark:text-gray-300">Reach thousands of potential customers daily as your ads travel throughout the city.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 card-hover dark:text-white">
                <div className="mb-6 bg-driveAd-purple/10 dark:bg-driveAd-purple/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <IndianRupee className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Cost Effective</h3>
                <p className="text-gray-600 dark:text-gray-300">Get more impressions at a fraction of the cost of traditional billboards or digital ads.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 card-hover dark:text-white">
                <div className="mb-6 bg-driveAd-purple/10 dark:bg-driveAd-purple/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-driveAd-purple dark:text-driveAd-purple-light" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">Photo Verification</h3>
                <p className="text-gray-600 dark:text-gray-300">Real-time photo verification ensures your ads are displayed properly every day.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Services />
        <HowItWorks />
        <Testimonials />
        
        {/* Vehicle Owner Promotion */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Own a Vehicle? Earn Extra Income</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Turn your daily commute into a revenue stream. Join our network of vehicle owners displaying advertisements and earn money with minimal effort.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-driveAd-purple dark:text-driveAd-purple-light mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">Easy photo verification process with our simple app</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-driveAd-purple dark:text-driveAd-purple-light mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">Choose from available advertisement banners</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-driveAd-purple dark:text-driveAd-purple-light mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">Secure and timely payments directly to your account</p>
                  </div>
                </div>
                
                <Link to="/vehicle-owners">
                  <Button size="lg" className="bg-driveAd-orange text-white hover:bg-orange-600">
                    Register Your Vehicle
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="aspect-square md:aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <Car size={100} className="text-driveAd-purple dark:text-driveAd-purple-light mb-8" />
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-bold dark:text-white">Vehicle Owner</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Earnings Report</p>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm py-1 px-3 rounded-full">
                            Active
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Current Banner:</span>
                            <span className="font-medium dark:text-white">TechStore</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Days Active:</span>
                            <span className="font-medium dark:text-white">7</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">Earnings:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">₹700</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-driveAd-yellow dark:bg-driveAd-purple/30 rounded-lg -rotate-12 -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-driveAd-green dark:bg-driveAd-orange/30 rounded-lg rotate-12 -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

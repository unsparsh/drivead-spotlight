
import { ArrowRight, Car, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Purple gradient shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-driveAd-purple-light opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-driveAd-purple-light opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 space-y-8 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Turn Vehicles Into 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-driveAd-purple-light to-driveAd-purple-dark"> Mobile Billboards</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Connect your brand with thousands of vehicles across the city. Our platform makes outdoor advertising accessible, affordable, and measurable.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link to="/advertisers">
              <Button size="lg" className="bg-driveAd-purple text-white hover:bg-driveAd-purple-dark">
                For Advertisers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/vehicle-owners">
              <Button size="lg" variant="outline" className="border-driveAd-purple text-driveAd-purple hover:bg-driveAd-purple-light/10">
                For Vehicle Owners
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            <div className="aspect-video bg-driveAd-purple/10 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-float">
                  <Car size={80} className="text-driveAd-purple mx-auto" />
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                    <p className="text-center font-medium">Your Ad Here</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-driveAd-yellow rounded-lg -rotate-12 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-driveAd-green rounded-lg rotate-12 -z-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

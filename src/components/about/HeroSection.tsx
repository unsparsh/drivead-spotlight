
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-driveAd-purple to-driveAd-purple-light opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
      
      <div className="container relative z-10 px-4 py-20 md:py-32 mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          About DriveAd
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8"
        >
          Transforming everyday vehicles into powerful advertising platforms,
          creating value for drivers and impactful visibility for brands.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-driveAd-purple hover:bg-gray-100"
          >
            Join Our Mission
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;

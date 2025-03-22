
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin } from 'lucide-react';

const ContactCTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-driveAd-purple to-driveAd-purple-light">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Want to Learn More?</h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          We'd love to hear from you! Reach out to our team with any questions about DriveAd.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg" className="bg-white text-driveAd-purple hover:bg-gray-100">
            <MessageSquare className="mr-2 h-5 w-5" /> Contact Us
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <MapPin className="mr-2 h-5 w-5" /> Find Our Offices
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;

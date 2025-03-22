
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import MissionValuesSection from '@/components/about/MissionValuesSection';
import TeamSection from '@/components/about/TeamSection';
import FAQSection from '@/components/about/FAQSection';
import ContactCTASection from '@/components/about/CTASection';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <AboutHeroSection />
        <StorySection />
        <MissionValuesSection />
        <TeamSection />
        <FAQSection />
        <ContactCTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

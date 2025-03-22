
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Users, Target, Car, Award, Zap, 
  CheckCircle, Clock, Shield, Heart, MapPin
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

// Our team members data
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Alex founded DriveAd with a vision to revolutionize outdoor advertising by combining technology with mobility.",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    fallback: "AJ",
  },
  {
    name: "Sophia Chen",
    role: "Chief Marketing Officer",
    bio: "Sophia brings 15 years of experience in digital marketing and advertising strategy to our team.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    fallback: "SC",
  },
  {
    name: "Marcus Williams",
    role: "Head of Technology",
    bio: "Marcus oversees all technical aspects of our platform, ensuring smooth operations and innovative features.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    fallback: "MW",
  },
  {
    name: "Priya Sharma",
    role: "Driver Relations Manager",
    bio: "Priya works directly with our network of drivers, ensuring they get the most out of their partnership with DriveAd.",
    avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    fallback: "PS",
  },
];

// Frequently asked questions
const faqs = [
  {
    question: "How does DriveAd work?",
    answer: "DriveAd connects vehicle owners with advertisers looking for mobile advertising space. Vehicle owners register their vehicles, choose ad campaigns, and earn money while driving their normal routes. Advertisers create campaigns and get real-time analytics on ad performance."
  },
  {
    question: "How much can I earn as a vehicle owner?",
    answer: "Earnings vary based on several factors including your vehicle type, size, driving area, and campaign duration. On average, drivers can earn between $100-$500 per month depending on these factors."
  },
  {
    question: "Do I need to change my driving habits?",
    answer: "Not at all! We understand the value of your time. You earn by simply going about your daily routine – commuting, running errands, or any regular travel. DriveAd's model works with your existing driving patterns."
  },
  {
    question: "What kind of advertisements will appear on my vehicle?",
    answer: "You'll have the ability to review and select from available campaigns that align with your preferences. We maintain strict standards to ensure all ads are appropriate and non-controversial."
  },
  {
    question: "How are advertisements applied to vehicles?",
    answer: "We use high-quality, removable vinyl wraps that don't damage your vehicle's paint. Installation is done by professional installers at one of our partner locations."
  },
];

// Our values
const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We're constantly exploring new ways to make advertising more effective and rewarding for all parties."
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest standards of honesty and transparency in all our business relationships."
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in creating opportunities that benefit local communities and small businesses."
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "We're committed to reducing environmental impact by optimizing existing travel patterns for advertising."
  },
];

// Milestones
const milestones = [
  { year: 2018, event: "DriveAd founded by Alex Johnson" },
  { year: 2019, event: "First 100 vehicles onboarded" },
  { year: 2020, event: "Launched analytics platform for advertisers" },
  { year: 2021, event: "Expanded to 10 major cities" },
  { year: 2022, event: "Reached 1,000 active drivers" },
  { year: 2023, event: "Introduced AI-powered route optimization" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
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
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    DriveAd was founded in 2018 with a simple yet powerful idea: what if everyday 
                    vehicles could become mobile billboards, creating a new income stream for drivers 
                    while offering advertisers a dynamic way to reach audiences?
                  </p>
                  <p>
                    What began as a startup with just a handful of vehicles in one city has grown into 
                    a nationwide network of thousands of drivers and hundreds of advertisers. We've built 
                    a platform that seamlessly connects vehicle owners looking to monetize their daily 
                    commutes with businesses seeking innovative, high-visibility advertising solutions.
                  </p>
                  <p>
                    Today, we're proud to be at the forefront of the mobile advertising revolution, 
                    continuously evolving our technology and expanding our reach to create more 
                    opportunities for drivers and more effective campaigns for advertisers.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1529310399831-ed472b81d589?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80" 
                    alt="DriveAd history" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-driveAd-purple-light rounded-lg p-6 shadow-lg">
                  <div className="text-white text-center">
                    <div className="text-4xl font-bold">5+</div>
                    <div className="text-sm">Years of Innovation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission & Values */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Values</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're driven by the goal of creating mutually beneficial opportunities 
                for drivers and advertisers, while revolutionizing the outdoor advertising industry.
              </p>
            </div>
            
            <Tabs defaultValue="mission" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-10">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="values">Our Values</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mission" className="px-4">
                <Card className="border-none shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <CardContent className="p-6 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 text-driveAd-purple dark:text-driveAd-purple-light">Connecting Mobility & Advertising</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Our mission is to transform the way outdoor advertising works by leveraging 
                          the power of everyday vehicle movements. We aim to create supplemental income 
                          for vehicle owners while providing advertisers with dynamic, targetable, and 
                          measurable outdoor campaigns.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-driveAd-purple-light mt-1 mr-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">Empowering vehicle owners to monetize their existing driving habits</p>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-driveAd-purple-light mt-1 mr-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">Revolutionizing outdoor advertising with real-time data and analytics</p>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-driveAd-purple-light mt-1 mr-3 flex-shrink-0" />
                            <p className="text-gray-700 dark:text-gray-300">Creating a sustainable advertising model that maximizes existing resources</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative aspect-square">
                        <div className="absolute inset-0 bg-driveAd-purple/10 rounded-full animate-pulse"></div>
                        <div className="absolute inset-4 bg-driveAd-purple/20 rounded-full animate-pulse [animation-delay:300ms]"></div>
                        <div className="absolute inset-8 bg-driveAd-purple/30 rounded-full animate-pulse [animation-delay:600ms]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Target className="h-20 w-20 text-driveAd-purple dark:text-driveAd-purple-light" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="values">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <Card key={index} className="card-hover dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-driveAd-purple-light/20 flex items-center justify-center mb-4">
                          <value.icon className="h-8 w-8 text-driveAd-purple dark:text-driveAd-purple-light" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 dark:text-white">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="milestones">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className="absolute left-9 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
                      <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 relative z-10">
                              <div className="w-10 h-10 rounded-full bg-driveAd-purple flex items-center justify-center text-white text-sm font-bold">
                                {milestone.year.toString().substring(2)}
                              </div>
                            </div>
                            <div className="ml-6">
                              <div className="font-bold text-gray-900 dark:text-white">{milestone.year}</div>
                              <div className="text-gray-600 dark:text-gray-300 mt-1">{milestone.event}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet the passionate individuals behind DriveAd who are driving innovation in the advertising industry.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md transition-all hover:shadow-lg cursor-pointer">
                      <div className="pt-6 px-6 pb-4 text-center">
                        <Avatar className="h-24 w-24 mx-auto mb-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.fallback}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                        <p className="text-sm text-driveAd-purple dark:text-driveAd-purple-light">{member.role}</p>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.fallback}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-base font-semibold dark:text-white">{member.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to know about DriveAd and how our platform works.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="dark:border-gray-700">
                    <AccordionTrigger className="text-left dark:text-white">{faq.question}</AccordionTrigger>
                    <AccordionContent className="dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Contact Us CTA */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

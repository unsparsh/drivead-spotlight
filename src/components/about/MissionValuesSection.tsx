
import React from 'react';
import { 
  Target, Shield, Users, Heart, CheckCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const MissionValuesSection = () => {
  return (
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
  );
};

export default MissionValuesSection;

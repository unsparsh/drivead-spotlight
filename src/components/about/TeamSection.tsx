
import React from 'react';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const TeamSection = () => {
  return (
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
  );
};

export default TeamSection;

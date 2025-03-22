
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQSection = () => {
  return (
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
  );
};

export default FAQSection;

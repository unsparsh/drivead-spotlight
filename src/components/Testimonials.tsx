
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Marketing Director, TechStart India',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    quote: 'DriveAd helped us reach thousands of customers in Bangalore at half the cost of traditional billboards. The results were incredible!'
  },
  {
    name: 'Raj Mehta',
    role: 'Founder, FreshEats',
    image: 'https://randomuser.me/api/portraits/men/68.jpg',
    quote: 'As a food delivery startup, we needed affordable advertising that reached our target audience. DriveAd delivered beyond our expectations.'
  },
  {
    name: 'Ananya Patel',
    role: 'Brand Manager, StyleNow',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'The ability to track our campaign performance with real photo verification gave us confidence that our investment was working.'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
          <p className="text-xl text-white/80">Hear from the businesses who've transformed their advertising strategy with DriveAd.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div className="w-16 h-16 overflow-hidden rounded-full mr-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl dark:text-white">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <blockquote className="text-xl italic text-gray-700 dark:text-gray-200 mb-8">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-driveAd-purple hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-driveAd-purple hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

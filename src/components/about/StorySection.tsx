
import React from 'react';

const StorySection = () => {
  return (
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
            <div className="absolute -bottom-6 -right-6 bg-driveAd-purple-light rounded-lg p-6 shadow-lg dark:bg-driveAd-purple">
              <div className="text-white text-center">
                <div className="text-4xl font-bold">5+</div>
                <div className="text-sm">Years of Innovation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

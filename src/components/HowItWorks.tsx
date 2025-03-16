
import { Car, Flag, Clock, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <Flag className="w-10 h-10 text-driveAd-purple" />,
    title: 'Choose Your Campaign',
    description: 'Select between autos or cars and choose your campaign duration based on your advertising needs.'
  },
  {
    icon: <Car className="w-10 h-10 text-driveAd-purple" />,
    title: 'We Place Your Ads',
    description: 'We take care of printing and installing your advertisements on selected vehicles.'
  },
  {
    icon: <Clock className="w-10 h-10 text-driveAd-purple" />,
    title: 'Track Performance',
    description: 'Monitor your campaign with real-time photo verifications and performance metrics.'
  },
  {
    icon: <CreditCard className="w-10 h-10 text-driveAd-purple" />,
    title: 'Pay Only For Results',
    description: 'Our transparent pricing ensures you only pay for actual advertisement displays.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How DriveAd Works</h2>
          <p className="text-xl text-gray-600">Our simple process makes vehicle advertising easy for everyone.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm card-hover">
              <div className="bg-driveAd-purple/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

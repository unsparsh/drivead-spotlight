
const HowItWorks = () => {
  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
      <h4 className="font-semibold mb-2">How it works:</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li className="flex items-start">
          <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
          <span>Select an available banner for your vehicle type</span>
        </li>
        <li className="flex items-start">
          <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
          <span>We'll contact you to arrange banner installation</span>
        </li>
        <li className="flex items-start">
          <span className="bg-driveAd-purple/10 text-driveAd-purple font-bold rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
          <span>Upload daily photo verification to earn your payment</span>
        </li>
      </ul>
    </div>
  );
};

export default HowItWorks;

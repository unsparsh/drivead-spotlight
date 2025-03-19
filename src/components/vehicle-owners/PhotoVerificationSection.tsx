
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoVerificationSectionProps {
  onReturnToSelection: () => void;
}

const PhotoVerificationSection = ({ onReturnToSelection }: PhotoVerificationSectionProps) => {
  const [photoStatus, setPhotoStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [photoMessage, setPhotoMessage] = useState('');

  const handlePhotoCapture = () => {
    if ('mediaDevices' in navigator) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Handle the camera stream here
          const tracks = stream.getTracks();
          // Close the stream after usage - this is just a placeholder
          tracks.forEach(track => track.stop());
          
          // For demo purposes, we'll simulate a successful photo
          setPhotoStatus('success');
          setPhotoMessage('Photo verification successful! Your daily payment will be processed.');
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
          setPhotoStatus('error');
          setPhotoMessage('Error accessing camera. Please ensure camera permissions are granted.');
        });
    } else {
      setPhotoStatus('error');
      setPhotoMessage('Camera not available on this device or browser.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Banner Selected Successfully!</h2>
        <p className="text-gray-600">
          You've selected a banner to display on your vehicle. Our team will contact you soon for installation.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="border-t border-b border-gray-200 py-6">
          <h3 className="text-lg font-semibold mb-4">Daily Photo Verification</h3>
          <p className="text-gray-600 mb-6">
            To receive your daily payment, please take a photo of your vehicle with the banner installed. The photo must be taken today.
          </p>
          
          <div className="flex justify-center">
            <div 
              onClick={handlePhotoCapture}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors w-full max-w-md"
            >
              <Camera className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-center">Take a photo of your vehicle with banner</p>
            </div>
          </div>
          
          {photoStatus !== 'idle' && (
            <div className={`mt-6 p-4 rounded-lg ${
              photoStatus === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              <div className="flex items-start">
                {photoStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                )}
                <p>{photoMessage}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-driveAd-purple hover:bg-driveAd-purple-dark text-white"
            onClick={onReturnToSelection}
          >
            Return to Banner Selection
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoVerificationSection;


import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-driveAd-purple-light to-driveAd-purple-dark">DriveAd</span>
            </Link>
            <p className="text-gray-600">
              Connecting brands with vehicles for impactful mobile advertising solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-driveAd-purple">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-driveAd-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-driveAd-purple">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-driveAd-purple">Home</Link></li>
              <li><Link to="/advertisers" className="text-gray-600 hover:text-driveAd-purple">For Advertisers</Link></li>
              <li><Link to="/vehicle-owners" className="text-gray-600 hover:text-driveAd-purple">For Vehicle Owners</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-driveAd-purple">About Us</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-driveAd-purple">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-driveAd-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-driveAd-purple">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-driveAd-purple" />
                <span className="text-gray-600">123 Ad Street, Bangalore, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-driveAd-purple" />
                <span className="text-gray-600">+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-driveAd-purple" />
                <span className="text-gray-600">info@drivead.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} DriveAd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

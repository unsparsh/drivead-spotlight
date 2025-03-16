
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 bg-white shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-driveAd-purple-light to-driveAd-purple-dark">DriveAd</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-driveAd-purple font-medium">Home</Link>
          <Link to="/advertisers" className="text-gray-700 hover:text-driveAd-purple font-medium">For Advertisers</Link>
          <Link to="/vehicle-owners" className="text-gray-700 hover:text-driveAd-purple font-medium">For Vehicle Owners</Link>
          <Link to="/about" className="text-gray-700 hover:text-driveAd-purple font-medium">About Us</Link>
          <Button className="bg-driveAd-orange hover:bg-orange-600 text-white">Get Started</Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 bg-white shadow-inner">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-driveAd-purple font-medium py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/advertisers" className="text-gray-700 hover:text-driveAd-purple font-medium py-2" onClick={toggleMenu}>For Advertisers</Link>
            <Link to="/vehicle-owners" className="text-gray-700 hover:text-driveAd-purple font-medium py-2" onClick={toggleMenu}>For Vehicle Owners</Link>
            <Link to="/about" className="text-gray-700 hover:text-driveAd-purple font-medium py-2" onClick={toggleMenu}>About Us</Link>
            <Button className="bg-driveAd-orange hover:bg-orange-600 text-white w-full" onClick={toggleMenu}>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

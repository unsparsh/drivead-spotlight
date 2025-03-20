
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Sun, Moon } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Check if user has a system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set the theme based on preference or system
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme as 'light' | 'dark');
    
    // Apply the theme to the document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = () => {
    if (!user?.email) return '?';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="w-full py-4 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-driveAd-purple-light to-driveAd-purple-dark">DriveAd</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium">Home</Link>
          <Link to="/advertisers" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium">For Advertisers</Link>
          <Link to="/vehicle-owners" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium">For Vehicle Owners</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium">About Us</Link>
          
          <Toggle
            aria-label="Toggle dark mode"
            className="border-0"
            pressed={theme === 'dark'}
            onPressedChange={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </Toggle>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center focus:ring-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-driveAd-orange hover:bg-orange-600 text-white"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Toggle
            aria-label="Toggle dark mode"
            className="border-0"
            pressed={theme === 'dark'}
            onPressedChange={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </Toggle>
          
          <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 bg-white dark:bg-gray-900 shadow-inner">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/advertisers" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium py-2" onClick={toggleMenu}>For Advertisers</Link>
            <Link to="/vehicle-owners" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium py-2" onClick={toggleMenu}>For Vehicle Owners</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium py-2" onClick={toggleMenu}>About Us</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-driveAd-purple dark:hover:text-driveAd-purple-light font-medium py-2" onClick={toggleMenu}>
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 dark:text-white dark:border-gray-700"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <Button 
                className="bg-driveAd-orange hover:bg-orange-600 text-white w-full" 
                onClick={() => {
                  navigate('/auth');
                  toggleMenu();
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

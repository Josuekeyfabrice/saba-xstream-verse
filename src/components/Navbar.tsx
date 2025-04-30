
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Music, Film, LogIn, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-stream-darker shadow-md' : 'bg-gradient-to-b from-stream-darker to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2 transform transition-all duration-300 hover:scale-105">
            <span className="text-4xl font-bold text-[#ea384c] hover:text-stream-purple transition-colors">saba-streamX</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <NavItem to="/" icon={<Home className="h-5 w-5 mr-2" />} label="Accueil" />
            <NavItem to="/music" icon={<Music className="h-5 w-5 mr-2" />} label="Musique" />
            <NavItem to="/films" icon={<Film className="h-5 w-5 mr-2" />} label="Films" />
            <NavItem to="/series" icon={<Film className="h-5 w-5 mr-2" />} label="Séries" />
            <NavItem 
              to="/tv" 
              icon={
                <div className="h-5 w-5 mr-2 overflow-hidden rounded">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="TV" 
                    className="h-full w-full object-cover"
                  />
                </div>
              } 
              label="TV" 
            />
            <NavItem to="/celebrities" icon={<Users className="h-5 w-5 mr-2" />} label="Célébrités" />
            
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={handleLogout}
                className="flex items-center text-white hover:text-red-500 transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="lg" 
                onClick={() => navigate('/login')}
                className="flex items-center text-white hover:text-red-500 transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Connexion
              </Button>
            )}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="lg" onClick={toggleMobileMenu} className="text-white">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-stream-darker border-t border-gray-800 py-2 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <MobileNavItem to="/" icon={<Home className="h-5 w-5 mr-3" />} label="Accueil" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/music" icon={<Music className="h-5 w-5 mr-3" />} label="Musique" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/films" icon={<Film className="h-5 w-5 mr-3" />} label="Films" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/series" icon={<Film className="h-5 w-5 mr-3" />} label="Séries" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem 
              to="/tv" 
              icon={
                <div className="h-5 w-5 mr-3 overflow-hidden rounded">
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="TV" 
                    className="h-full w-full object-cover"
                  />
                </div>
              } 
              label="TV" 
              onClick={() => setIsMobileMenuOpen(false)} 
            />
            <MobileNavItem to="/celebrities" icon={<Users className="h-5 w-5 mr-3" />} label="Célébrités" onClick={() => setIsMobileMenuOpen(false)} />
            
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-start text-white hover:text-red-500 w-full transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-start text-white hover:text-red-500 w-full transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
              >
                <LogIn className="h-5 w-5 mr-3" />
                Connexion
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-all duration-300 transform hover:scale-105 active:scale-95"
  >
    {icon}
    {label}
  </Link>
);

type MobileNavItemProps = NavItemProps & {
  onClick?: () => void;
};

const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => (
  <Link
    to={to}
    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-all duration-300 transform hover:scale-105 active:scale-95"
    onClick={onClick}
  >
    {icon}
    {label}
  </Link>
);

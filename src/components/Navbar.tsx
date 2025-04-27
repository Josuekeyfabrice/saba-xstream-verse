
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, Film, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-stream-darker shadow-md' : 'bg-gradient-to-b from-stream-darker to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">saba-streamX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem to="/" icon={<Home className="h-4 w-4 mr-2" />} label="Accueil" />
            <NavItem to="/music" icon={<Music className="h-4 w-4 mr-2" />} label="Musique" />
            <NavItem to="/films" icon={<Film className="h-4 w-4 mr-2" />} label="Films" />
            <NavItem to="/series" icon={<Tv className="h-4 w-4 mr-2" />} label="Séries" />
            <NavItem to="/tv" icon={<Tv className="h-4 w-4 mr-2" />} label="TV" />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-white">
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-stream-darker border-t border-gray-800 py-2 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-1">
            <MobileNavItem to="/" icon={<Home className="h-5 w-5 mr-3" />} label="Accueil" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/music" icon={<Music className="h-5 w-5 mr-3" />} label="Musique" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/films" icon={<Film className="h-5 w-5 mr-3" />} label="Films" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/series" icon={<Tv className="h-5 w-5 mr-3" />} label="Séries" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavItem to="/tv" icon={<Tv className="h-5 w-5 mr-3" />} label="TV" onClick={() => setIsMobileMenuOpen(false)} />
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
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-colors"
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
    className="flex items-center px-3 py-3 rounded-md text-base font-medium text-white hover:bg-stream-purple/20 hover:text-stream-purple transition-colors"
    onClick={onClick}
  >
    {icon}
    {label}
  </Link>
);


import { Home, Music, Film, LogIn, LogOut, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MobileNavItem } from './MobileNavItem';
import React from 'react';

type MobileMenuProps = {
  isOpen: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export const MobileMenu = ({ isOpen, isLoggedIn, onClose, onLogout }: MobileMenuProps) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  return (
    <nav className="md:hidden bg-stream-darker border-t border-gray-800 py-4 animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col space-y-3">
        <MobileNavItem to="/" icon={<Home className="h-5 w-5 mr-3" />} label="Accueil" onClick={onClose} />
        <MobileNavItem to="/music" icon={<Music className="h-5 w-5 mr-3" />} label="Musique" onClick={onClose} />
        <MobileNavItem to="/films" icon={<Film className="h-5 w-5 mr-3" />} label="Films" onClick={onClose} />
        <MobileNavItem to="/series" icon={<Film className="h-5 w-5 mr-3" />} label="Séries" onClick={onClose} />
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
          onClick={onClose} 
        />
        <MobileNavItem to="/celebrities" icon={<Users className="h-5 w-5 mr-3" />} label="Célébrités" onClick={onClose} />
        <MobileNavItem to="/post" icon={<MessageSquare className="h-5 w-5 mr-3" />} label="Communauté" onClick={onClose} />
        <MobileNavItem to="/sport" icon={<Film className="h-5 w-5 mr-3" />} label="Sport" onClick={onClose} />
        
        {isLoggedIn ? (
          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => {
              onLogout();
              onClose();
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
              onClose();
            }}
            className="flex items-center justify-start text-white hover:text-red-500 w-full transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
          >
            <LogIn className="h-5 w-5 mr-3" />
            Connexion
          </Button>
        )}
      </div>
    </nav>
  );
};

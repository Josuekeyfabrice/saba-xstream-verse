
import { Home, Music, Film, LogIn, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';
import React from 'react';

type DesktopNavProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

export const DesktopNav = ({ isLoggedIn, onLogout }: DesktopNavProps) => {
  const navigate = useNavigate();
  
  return (
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
      <NavItem to="/post" icon={<MessageSquare className="h-5 w-5 mr-2" />} label="Communauté" />
      <NavItem to="/sport" icon={<Film className="h-5 w-5 mr-2" />} label="Sport" />
      
      {!isLoggedIn && (
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={() => navigate('/login')}
          className="flex items-center text-white hover:text-stream-purple transform transition-all duration-300 hover:scale-105 hover:bg-stream-purple/20 active:scale-95"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Connexion
        </Button>
      )}
    </nav>
  );
};

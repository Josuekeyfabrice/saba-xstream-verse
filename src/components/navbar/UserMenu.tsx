
import { useState, useEffect } from 'react';
import { UserRound, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

type UserMenuProps = {
  onLogout: () => void;
};

export const UserMenu = ({ onLogout }: UserMenuProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const [userInitial, setUserInitial] = useState<string>('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, email')
          .eq('id', user.id)
          .single();
        
        const displayName = profile?.name || user.email || '';
        setUserName(displayName);
        setUserInitial(displayName.charAt(0).toUpperCase());
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center text-white hover:text-stream-purple hover:bg-stream-purple/20 transition-all duration-300">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userInitial}`} />
            <AvatarFallback className="bg-stream-purple text-white">{userInitial}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{userName}</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-stream-darker text-white border border-gray-700">
        <DropdownMenuLabel className="text-gray-400">Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          className="flex cursor-pointer items-center hover:bg-stream-purple/20 hover:text-stream-purple"
          onClick={() => navigate('/profile')}
        >
          <UserRound className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex cursor-pointer items-center hover:bg-stream-purple/20 hover:text-stream-purple"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          className="flex cursor-pointer items-center hover:bg-red-500/20 hover:text-red-500"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

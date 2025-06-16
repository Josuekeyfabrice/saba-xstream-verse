
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  LogOut,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    toast({
      variant: "destructive",
      title: "Fonctionnalité non disponible",
      description: "La suppression de compte sera disponible prochainement",
    });
  };

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-stream-darker border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <SettingsIcon className="mr-3" />
                Paramètres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div className="flex items-center justify-between p-4 bg-stream-dark rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-stream-purple" />
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-gray-400">Recevoir des notifications push</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              {/* Mode sombre */}
              <div className="flex items-center justify-between p-4 bg-stream-dark rounded-lg">
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-stream-purple" />
                  <div>
                    <h3 className="font-medium">Mode sombre</h3>
                    <p className="text-sm text-gray-400">Interface en mode sombre</p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              {/* Confidentialité */}
              <div className="flex items-center justify-between p-4 bg-stream-dark rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-stream-purple" />
                  <div>
                    <h3 className="font-medium">Profil privé</h3>
                    <p className="text-sm text-gray-400">Masquer votre profil aux autres utilisateurs</p>
                  </div>
                </div>
                <Switch
                  checked={privacy}
                  onCheckedChange={setPrivacy}
                />
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>

                <Button 
                  onClick={handleDeleteAccount}
                  variant="destructive"
                  className="w-full justify-start"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer le compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;

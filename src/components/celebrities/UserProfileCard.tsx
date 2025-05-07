
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface UserProfileCardProps {
  userProfile: {
    name: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    followers: number;
    likes: number;
    hearts: number;
  };
  onEdit: () => void;
}

export const UserProfileCard = ({ userProfile, onEdit }: UserProfileCardProps) => {
  return (
    <Card className="bg-stream-darker text-white mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Mon Profil</CardTitle>
          <Button 
            variant="outline" 
            onClick={onEdit}
            className="bg-stream-purple/20 text-stream-purple border-stream-purple hover:bg-stream-purple hover:text-white"
          >
            Modifier mon profil
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img 
              src={userProfile.imageUrl} 
              alt="Photo de profil" 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{userProfile.name}</h3>
            <div className="flex space-x-6 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span><strong>{userProfile.followers}</strong> abonnés</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">👍</span>
                <span><strong>{userProfile.likes}</strong> likes</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1">❤️</span>
                <span><strong>{userProfile.hearts}</strong> cœurs</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

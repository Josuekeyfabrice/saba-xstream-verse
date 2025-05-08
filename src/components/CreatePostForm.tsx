
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePostForm } from "./post/usePostForm";
import { MediaPreview } from "./post/MediaPreview";
import { TaggedFriendsDisplay } from "./post/TaggedFriendsDisplay";
import { LocationDisplay } from "./post/LocationDisplay";
import { TagFriendInput } from "./post/TagFriendInput";
import { PostFormActions } from "./post/PostFormActions";
import { PostFormProps } from "./post/types";

export const CreatePostForm = ({ onAddPost, socket }: PostFormProps) => {
  const {
    content,
    setContent,
    currentUser,
    selectedImage,
    selectedVideo,
    location,
    isSubmitting,
    isAddingLocation,
    taggedFriends,
    showTagInput,
    tagInput,
    setTagInput,
    handleSubmit,
    handleImageSelect,
    handleVideoSelect,
    handleAddEmoji,
    handleTagFriend,
    removeTaggedFriend,
    handleGetLocation,
    removeLocation,
    removeImage,
    removeVideo,
    takePicture,
    setShowTagInput,
    fileInputRef,
    videoInputRef,
  } = usePostForm(onAddPost, socket);

  return (
    <Card className="bg-stream-darker border-gray-700">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar className="hidden sm:flex h-10 w-10">
            <AvatarImage src={currentUser.image} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <form className="flex-1 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Textarea 
                placeholder={`Qu'avez-vous en tête, ${currentUser.name} ?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="resize-none min-h-20"
              />
              
              {/* Display tagged friends */}
              <TaggedFriendsDisplay 
                taggedFriends={taggedFriends}
                removeTaggedFriend={removeTaggedFriend}
              />
              
              {/* Display location */}
              <LocationDisplay 
                location={location}
                removeLocation={removeLocation}
              />
            </div>
            
            {/* Tag friend input */}
            {showTagInput && (
              <TagFriendInput 
                tagInput={tagInput}
                setTagInput={setTagInput}
                handleTagFriend={handleTagFriend}
              />
            )}
            
            {/* Media Previews */}
            <MediaPreview 
              selectedImage={selectedImage}
              selectedVideo={selectedVideo}
              removeImage={removeImage}
              removeVideo={removeVideo}
            />
            
            {/* Post Actions */}
            <PostFormActions 
              fileInputRef={fileInputRef}
              videoInputRef={videoInputRef}
              handleImageSelect={handleImageSelect}
              handleVideoSelect={handleVideoSelect}
              takePicture={takePicture}
              setShowTagInput={setShowTagInput}
              showTagInput={showTagInput}
              handleGetLocation={handleGetLocation}
              isAddingLocation={isAddingLocation}
              handleAddEmoji={handleAddEmoji}
              isSubmitting={isSubmitting}
              content={content}
              selectedImage={selectedImage}
              selectedVideo={selectedVideo}
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

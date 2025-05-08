
export interface PostFormProps {
  onAddPost: (post: any) => void;
  socket?: any; // Socket instance
}

export interface MediaPreviewProps {
  selectedImage: string | null;
  selectedVideo: string | null;
  removeImage: () => void;
  removeVideo: () => void;
}

export interface TaggedFriendsDisplayProps {
  taggedFriends: string[];
  removeTaggedFriend: (friend: string) => void;
}

export interface LocationDisplayProps {
  location: string;
  removeLocation: () => void;
}

export interface TagFriendInputProps {
  tagInput: string;
  setTagInput: (value: string) => void;
  handleTagFriend: () => void;
}

export interface PostFormActionsProps {
  fileInputRef: React.RefObject<HTMLInputElement>;
  videoInputRef: React.RefObject<HTMLInputElement>;
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  takePicture: () => void;
  setShowTagInput: (value: boolean) => void;
  showTagInput: boolean;
  handleGetLocation: () => void;
  isAddingLocation: boolean;
  handleAddEmoji: (emoji: string) => void;
  isSubmitting: boolean;
  content: string;
  selectedImage: string | null;
  selectedVideo: string | null;
}

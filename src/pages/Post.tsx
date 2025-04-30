
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CreatePostForm } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Sample post data
const initialPosts = [
  {
    id: "1",
    username: "sarah_doe",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800",
    content: "Travailler sur un nouveau projet passionnant aujourd'hui !",
    likes: 24,
    comments: 5,
    isLiked: false,
    timestamp: "Il y a 2 heures",
  },
  {
    id: "2",
    username: "john_smith",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    content: "Partage de mes découvertes sur les dernières technologies de streaming !",
    likes: 15,
    comments: 3,
    isLiked: true,
    timestamp: "Il y a 5 heures",
  }
];

const Post = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.isLiked;
        return {
          ...post,
          isLiked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar left */}
            <div className="hidden md:block">
              <div className="bg-stream-darker rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Communauté</h3>
                <ul className="space-y-3">
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Pour vous
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Tendances
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start">
                      Abonnements
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <CreatePostForm onAddPost={handleAddPost} />
              
              <div className="space-y-6 mt-6">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Post;

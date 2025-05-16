
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PostProvider } from "@/features/post/PostContext";
import { CommunitySidebar } from "@/features/post/CommunitySidebar";
import { PostsFeed } from "@/features/post/PostsFeed";
import { MessagingProvider } from "@/features/messaging/MessagingContext";
import { MessagingButton } from "@/features/messaging/MessagingButton";
import { MessagingModal } from "@/features/messaging/MessagingModal";

const Post = () => {
  return (
    <div className="min-h-screen bg-stream-dark text-white">
      <MessagingProvider>
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <PostProvider>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar left */}
                <CommunitySidebar />
                
                {/* Main content */}
                <PostsFeed />
              </div>
            </PostProvider>
          </div>
        </div>
        <Footer />
        
        {/* Messagerie */}
        <MessagingButton />
        <MessagingModal />
      </MessagingProvider>
    </div>
  );
};

export default Post;

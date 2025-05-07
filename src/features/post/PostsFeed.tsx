
import React from "react";
import { CreatePostForm } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { usePostContext } from "./PostContext";

export const PostsFeed = () => {
  const { posts, handleLike, handleComment, handleAddPost, socket } = usePostContext();

  return (
    <div className="md:col-span-2">
      <CreatePostForm onAddPost={handleAddPost} socket={socket} />
      
      <div className="space-y-6 mt-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            socket={socket}
          />
        ))}
      </div>
    </div>
  );
};

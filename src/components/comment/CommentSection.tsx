
import React from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useComments } from "./hooks/useComments";

interface CommentSectionProps {
  postId: string;
  socket?: any; // Socket instance
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, socket }) => {
  const {
    comments,
    newComment,
    setNewComment,
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
    realtimeIndicator,
    typingUsers,
    commentEndRef,
    handleTyping,
    handleLikeComment,
    handleLikeReply,
    handleAddComment,
    handleAddReply,
    handleShareComment,
    handleReportComment
  } = useComments({ postId, socket });

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-400">Commentaires</h4>
        
        {realtimeIndicator && (
          <div className="text-xs text-stream-purple bg-stream-purple/10 px-2 py-1 rounded-md animate-pulse">
            {realtimeIndicator}
          </div>
        )}
      </div>
      
      {/* Formulaire d'ajout de commentaire */}
      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        handleTyping={handleTyping}
      />
      
      {typingUsers.length > 0 && (
        <div className="text-xs text-gray-400 italic mb-2 animate-pulse">
          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'est en train d\'écrire...' : 'sont en train d\'écrire...'}
        </div>
      )}
      
      {/* Liste des commentaires */}
      <CommentList
        comments={comments}
        handleLikeComment={handleLikeComment}
        handleLikeReply={handleLikeReply}
        handleShareComment={handleShareComment}
        handleReportComment={handleReportComment}
        setReplyingTo={setReplyingTo}
        replyingTo={replyingTo}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        handleAddReply={handleAddReply}
        handleTyping={handleTyping}
      />
      
      <div ref={commentEndRef} />
    </div>
  );
};

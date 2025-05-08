
import React from "react";
import { CommentListProps } from "./types";
import { Comment } from "./Comment";

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  handleLikeComment,
  handleLikeReply,
  handleShareComment,
  handleReportComment,
  setReplyingTo,
  replyingTo,
  replyContent,
  setReplyContent,
  handleAddReply,
  handleTyping
}) => {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
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
      ))}
    </div>
  );
};

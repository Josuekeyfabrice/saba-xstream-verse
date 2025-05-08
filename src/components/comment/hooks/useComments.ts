
import { useState } from "react";
import { CommentType } from "../types";
import { sampleComments } from "../data/sampleComments";
import { useCommentActions } from "./useCommentActions";
import { useCommentReplies } from "./useCommentReplies";
import { useRealTimeComments } from "./useRealTimeComments";
import { useAddComment } from "./useAddComment";

export interface UseCommentsProps {
  postId: string;
  socket?: any;
}

export const useComments = ({ postId, socket }: UseCommentsProps) => {
  const [comments, setComments] = useState<CommentType[]>(sampleComments);

  // Get real-time functionality
  const {
    realtimeIndicator,
    typingUsers,
    commentEndRef,
    handleTyping,
    scrollToBottom
  } = useRealTimeComments({ comments, setComments, postId, socket });

  // Get comment actions
  const {
    handleLikeComment,
    handleLikeReply,
    handleShareComment,
    handleReportComment
  } = useCommentActions({ comments, setComments, postId, socket });

  // Get reply functionality
  const {
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
    handleAddReply
  } = useCommentReplies({ comments, setComments, postId, socket });

  // Get new comment functionality
  const {
    newComment,
    setNewComment,
    handleAddComment
  } = useAddComment({ comments, setComments, postId, socket, scrollToBottom });

  return {
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
  };
};

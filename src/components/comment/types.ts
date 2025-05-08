
export interface ReplyType {
  id: string;
  username: string;
  userImage: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
}

export interface CommentType {
  id: string;
  username: string;
  userImage: string;
  content: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies: ReplyType[];
}

export interface CommentListProps {
  comments: CommentType[];
  handleLikeComment: (commentId: string) => void;
  handleLikeReply: (commentId: string, replyId: string) => void;
  handleShareComment: (commentId: string) => void;
  handleReportComment: (commentId: string) => void;
  setReplyingTo: (commentId: string | null) => void;
  replyingTo: string | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (commentId: string) => void;
  handleTyping: () => void;
}

export interface CommentProps {
  comment: CommentType;
  handleLikeComment: (commentId: string) => void;
  handleLikeReply: (commentId: string, replyId: string) => void;
  handleShareComment: (commentId: string) => void;
  handleReportComment: (commentId: string) => void;
  setReplyingTo: (commentId: string | null) => void;
  replyingTo: string | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: (commentId: string) => void;
  handleTyping: () => void;
}

export interface CommentReplyProps {
  reply: ReplyType;
  commentId: string;
  handleLikeReply: (commentId: string, replyId: string) => void;
}

export interface CommentFormProps {
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: (e: React.FormEvent) => void;
  handleTyping: () => void;
}

export interface ReplyFormProps {
  replyContent: string;
  setReplyContent: (content: string) => void;
  handleAddReply: () => void;
  handleTyping: () => void;
  cancelReply: () => void;
  username: string;
}

export interface UseCommentsProps {
  postId: string;
  socket?: any;
}

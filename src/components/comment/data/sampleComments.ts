
import { CommentType } from "../types";

// Sample comments data with nested replies
export const sampleComments: CommentType[] = [
  {
    id: "c1",
    username: "marie_du_web",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    content: "Super publication ! J'adore ce contenu.",
    likes: 5,
    isLiked: false,
    timestamp: "Il y a 45 min",
    replies: [
      {
        id: "r1c1",
        username: "tech_expert",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        content: "Tout à fait d'accord avec toi !",
        likes: 1,
        isLiked: false,
        timestamp: "Il y a 30 min"
      }
    ]
  },
  {
    id: "c2",
    username: "tech_expert",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    content: "Merci pour le partage !",
    likes: 2,
    isLiked: false,
    timestamp: "Il y a 1 heure",
    replies: []
  }
];

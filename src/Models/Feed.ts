
export interface LikeResponse {
  success: boolean; // Assuming the API returns { success: true }
}

// GET /api/Like/Users/:id response
export interface UsersWhoLikedResponse {
  userId: number;
  userName: string;
  profileImageUrl?: string; // optional if your API supports it
}
// interfaces.ts

// For Commenting
export interface CommentResponse {
  id: number;
  userId: number;
  giftId: number;
  dateTime: string;
  message: string;
  profilePic: string | null;
}

export interface CommentData {
  id: number;
  userId: number;
  giftId: number;
  dateTime: string;
  message: string;
  profilePic: string | null;
}

// For Comment Likes
export interface CommentLikeResponse {
  success: boolean;
}

// For Sharing
export interface ShareResponse {
  success: boolean;
}

// For Gift Likes
export interface LikeResponse {
  success: boolean;
}

export interface UsersWhoLikedResponse {
  userId: number;
  userName: string;
  profileImageUrl?: string;
}



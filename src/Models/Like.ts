// src/interfaces/LikeInterfaces.ts

export interface Post {
  id: number;
}

export interface LikeButtonProps {
  post: Post;
  userId: number;
}

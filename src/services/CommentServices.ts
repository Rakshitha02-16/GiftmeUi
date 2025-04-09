// services/commentsService.ts
import { CommentData } from "../Models/Feed";

const API_BASE_URL = "https://localhost:7241/api";

export const commentsService = {
  getCommentsByGiftId: async (giftId: number): Promise<CommentData[]> => {
    const response = await fetch(`${API_BASE_URL}/Comment/${giftId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  },

  postComment: async (giftId: number, message: string, userId: number, profilePic: string | null) => {
    const newComment: CommentData = {
      id: Date.now(),
      giftId,
      userId,
      message,
      dateTime: new Date().toISOString(),
      profilePic,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("localComments") || "[]");
    const updated = [...existing, newComment];
    localStorage.setItem("localComments", JSON.stringify(updated));
  },
};

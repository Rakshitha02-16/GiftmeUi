// services/commentsService.ts
import axios from "axios";
import { API } from "./API";
import {
  CommentResponse,
  ShareResponse,
  CommentLikeResponse,
  LikeResponse,
  UsersWhoLikedResponse,
} from "../Models/Feed";

export const feedactions = {
  commentOnGift: async (
    giftId: number,
    message: string
  ): Promise<CommentResponse | undefined> => {
    try {
      const response = await axios.post(API.Comment, { giftId, message });
      return response.data;
    } catch (error) {
      console.error("Error commenting:", error);
    }
  },

  likeComment: async (
    commentId: number
  ): Promise<CommentLikeResponse | undefined> => {
    try {
      const response = await axios.post(`${API.Comment}/Likes`, { commentId });
      return response.data;
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  },

  getCommentCount: async (giftId: number): Promise<number> => {
    try {
      const response = await axios.get(`${API.Comment}/count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comment count:", error);
      return 0;
    }
  },

  // ===== Share APIs =====

  shareGift: async (giftId: number): Promise<ShareResponse | undefined> => {
    try {
      const response = await axios.post(API.Share, { giftId });
      return response.data;
    } catch (error) {
      console.error("Error sharing gift:", error);
    }
  },

  getShareCount: async (giftId: number): Promise<number> => {
    try {
      const response = await axios.get(`${API.Share}/count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching share count:", error);
      return 0;
    }
  },

  likeGift: async (giftId: number): Promise<LikeResponse | undefined> => {
    try {
      const response = await axios.post(API.like, { giftId });
      return response.data;
    } catch (error) {
      console.error("Error liking gift:", error);
    }
  },

  getLikeCount: async (giftId: number): Promise<number> => {
    try {
      const response = await axios.get(`${API.like}/count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching like count:", error);
      return 0;
    }
  },

  getUsersWhoLiked: async (
    giftId: number
  ): Promise<UsersWhoLikedResponse[]> => {
    try {
      const response = await axios.get(`${API.like}/Users/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users who liked:", error);
      return [];
    }
  },
};

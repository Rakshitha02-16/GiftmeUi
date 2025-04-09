import axios from "axios";
import { API } from "./API";  // Import API endpoints
import { GiftPost } from "../Models/Gift";

export const postGift = async (giftData: GiftPost) => {
  try {
    const response = await axios.post(`${API.gift}/new`, giftData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error posting gift:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const fetchGifts = async (keyword: string, pageNo: number, pageSize: number) => {
  try {
    const response = await axios.get(`${API.gift}?KeyWord=${keyword}&PageNo=${pageNo}&PageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gifts:", error);
    throw error;
  }
};
export const fetchGiftsFromAPI = async () => {
  try {
    const response = await fetch("https://your-api-url.com/gifts"); // Replace with your actual API URL
    if (!response.ok) {
      throw new Error("Failed to fetch gifts from API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return [];
  }
};
export const giftService = {
  likeGift: async (giftId: number) => {
    try {
      const response = await axios.post(`${API}/Like`, { giftId });
      return response.data;
    } catch (error) {
      console.error("Error liking gift:", error);
    }
  },

  getLikeCount: async (giftId: number) => {
    try {
      const response = await axios.get(`${API}/Like/Count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching like count:", error);
      return 0;
    }
  },

  getUsersWhoLiked: async (giftId: number) => {
    try {
      const response = await axios.get(`${API}/Like/Users/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching likes:", error);
      return [];
    }
  },

  commentOnGift: async (giftId: number, message: string) => {
    try {
      const response = await axios.post(`${API}/Comment`, {
        giftId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error("Error commenting:", error);
    }
  },

  getCommentCount: async (giftId: number) => {
    try {
      const response = await axios.get(`${API}/Comment/count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comment count:", error);
      return 0;
    }
  },

  shareGift: async (giftId: number) => {
    try {
      const response = await axios.post(`${API}/Share`, { giftId });
      return response.data;
    } catch (error) {
      console.error("Error sharing gift:", error);
    }
  },

  getShareCount: async (giftId: number) => {
    try {
      const response = await axios.get(`${API}/Share/count/${giftId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching share count:", error);
      return 0;
    }
  },
};
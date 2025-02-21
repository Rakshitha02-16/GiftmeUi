import axios from "axios";
import { GiftPost } from "../Models/Gift";

const API_BASE_URL = "https://localhost:7241/api/Gift";

export const postGift = async (giftData: GiftPost) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/new`, giftData, {
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


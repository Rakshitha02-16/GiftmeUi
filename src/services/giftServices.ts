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

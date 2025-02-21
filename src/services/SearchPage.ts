import axios from "axios";
import { User } from "../Models/User";
import {Gift} from "../Models/Gift";
const API_BASE_URL = "https://localhost:7241/api/user";

export const searchProfiles = async (keyWord: string, pageNo: number = 0, pageSize: number = 10): Promise<User[]> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search`, {
      keyWord,
      pageNo,
      pageSize,
    });

    console.log("API Status:", response.status);
    console.log("API Response:", response.data);

    // Handle empty responses (204 No Content)
    if (response.status === 204 || !response.data) {
      console.warn("No profiles found, returning empty array.");
      return [];
    }

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return []; // Return empty array on error
  }
};
export const searchGifts = async (filters: {
  gender: string;
  age: number;
  relationship: string;
  occasion: string;
  budget: number;
  interests: string[];
}): Promise<{ results: Gift[] }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/giftSearch`, filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return { results: [] };
  }
};

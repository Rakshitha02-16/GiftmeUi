import axios from "axios";
import { API } from "../services/API"; // Import API URLs
import { User } from "../Models/User";
import { Gift } from "../Models/Gift";

// Search user profiles
export const searchProfiles = async (
  keyWord: string,
  pageNo: number = 0,
  pageSize: number = 10
): Promise<User[]> => {
  try {
    const response = await axios.post(`${API.user}/search`, {
      keyWord,
      pageNo,
      pageSize,
    });

    console.log("API Status:", response.status);
    console.log("API Response:", response.data);

    // Handle empty responses (204 No Content)
    return response.status === 204 || !response.data ? [] : response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
};

// Search gifts with filters
export const searchGifts = async (filters: {
  gender: string;
  age: number;
  relationship: string;
  occasion: string;
  budget: number;
  interests: string[];
}): Promise<{ results: Gift[] }> => {
  try {
    const response = await axios.post(API.gift, filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return { results: [] };
  }
};

import axios from "axios";
import { Wishlist } from "../Models/Wishlist";

const API_BASE_URL = "https://localhost:7241/api/Wishlist"; // Your backend URL

// ✅ Add Wishlist
export const addWishlist = async (wishlistName: string, userId: number): Promise<Wishlist> => {
  try {
    const payload = {
      name: wishlistName,
      source: "default",
      userId: userId,
    };
    
    console.log("🔵 Sending Payload:", payload); // ✅ Log the payload before request
    
    const response = await axios.post<Wishlist>("https://localhost:7241/api/Wishlist", payload);

    console.log("✅ Wishlist Added Successfully:", response.data); // ✅ Check API response
    return response.data;
  } catch (error: any) {
    console.error("❌ Error adding wishlist:", error.response?.data || error.message);
    throw error;
  }
};



export const getWishlistById = async (wishlistId:number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlist/${wishlistId}`);
    return response.data; // Return the wishlist data
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist");
  }
};;
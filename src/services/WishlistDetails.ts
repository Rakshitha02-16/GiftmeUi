import axios from "axios";
import { Item} from "../Models/Item";

const apiClient = axios.create({
  baseURL: "https://localhost:7241/api/Item", // Adjust to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});
export const getItemsByWishlistId = async (wishlistId: number): Promise<Item[]> => {
  if (!wishlistId || isNaN(wishlistId)) {
    throw new Error("Invalid wishlist ID.");
  }

  try {
    const response = await apiClient.get<Item[]>(`https://localhost:7241/api/Wishlist/users/1`);
    return response.data || [];
  } catch (error: any) {
    console.error("Error in getItemsByWishlistId API call:", error);
    throw new Error(error.response?.data?.message || error.message || "An unknown error occurred.");
  }
};


export const deleteWishlistItems = async (wishlistId: number): Promise<void> => {
  await apiClient.delete(`https://localhost:7241/api/Wishlist/1`);
};
// Delete a specific item from a wishlist
export const deleteWishlistItem = async (wishlistId: number, itemId: number): Promise<void> => {
  await apiClient.delete(`https://localhost:7241/api/Wishlist/Wishlist/1/items/1`);
};

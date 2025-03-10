import axios from "axios";
import { API } from "../services/API"; // Import API URLs
import { Item } from "../Models/Item";

// Get wishlist items by wishlist ID
export const getItemsByWishlistId = async (wishlistId: number): Promise<Item[]> => {
  if (!wishlistId || isNaN(wishlistId)) {
    throw new Error("Invalid wishlist ID.");
  }

  try {
    const response = await axios.get<Item[]>(`${API.wishlist}/users/${wishlistId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data || [];
  } catch (error: any) {
    console.error("Error in getItemsByWishlistId API call:", error);
    throw new Error(error.response?.data?.message || error.message || "An unknown error occurred.");
  }
};

// Delete all items in a wishlist
export const deleteWishlistItems = async (wishlistId: number): Promise<void> => {
  try {
    await axios.delete(`${API.wishlist}/${wishlistId}`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in deleteWishlistItems API call:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to delete wishlist items.");
  }
};

// Delete a specific item from a wishlist
export const deleteWishlistItem = async (wishlistId: number, itemId: number): Promise<void> => {
  try {
    await axios.delete(`${API.wishlist}/Wishlist/${wishlistId}/items/${itemId}`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in deleteWishlistItem API call:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to delete item from wishlist.");
  }
};
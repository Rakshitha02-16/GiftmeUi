import axios from "axios";
import { Wishlist } from "../Models/Wishlist";
import { API } from "../services/API"; 


export const addWishlist = async (wishlistName: string, userId: number): Promise<Wishlist> => {
  try {
    const payload = {
      name: wishlistName,
      source: "default",
      userId: userId,
    };
    
    console.log("🔵 Sending Payload:", payload); 
    
    const response = await axios.post<Wishlist>(API.wishlist, payload);

    console.log("✅ Wishlist Added Successfully:", response.data); 
    return response.data;
  } catch (error: any) {
    console.error("❌ Error adding wishlist:", error.response?.data || error.message);
    throw error;
  }
};



export const getWishlistById = async (wishlistId:number) => {
  try {
    const response = await axios.get(`${API.wishlist}/wishlist/${wishlistId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist");
  }
};;

export const deleteWishlistItem = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API.wishlist}/${id}`); // ✅ Fix: Removed incorrect quotes
    console.log(`✅ Wishlist item with ID ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    return false;
  }
};

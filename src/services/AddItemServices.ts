import axios from "axios";
import { Item } from "../interfaces/Models";

const apiClient = axios.create({
  baseURL: "https://localhost:7241/api/Item", // Adjust to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a new item
export const addItem = async (itemData: Item): Promise<string> => {
  try {
    const response = await apiClient.post("/", itemData);

    if (response.status === 204) {
      console.log("204 No Content: Item added successfully.");
      return "Item listed (no content returned).";
    }

    console.log("Item added successfully:", response.data);
    return response.data?.message || "Item listed.";
  } catch (error: any) {
    console.error("Error in addItem API call:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred.";
    throw new Error(errorMessage);
  }
};

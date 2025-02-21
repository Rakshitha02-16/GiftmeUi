import axios from "axios";
import { Item } from "../Models/Item";

const apiClient = axios.create({
  baseURL: "https://localhost:7241/api/Item", // Adjust to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a new item
export const addItem = async (item: Item): Promise<string> => {
  try {
    const response = await apiClient.post("/", item);

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

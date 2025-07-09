// src/services/giftService.ts
import axios from "axios";
import { GiftGiven, GiftTaken } from "../Models/Gift";
import { API } from "./API"; // adjust if needed

export const getGiftDetails = async (id: number): Promise<GiftGiven> => {
  const response = await axios.get<GiftGiven>(`${API.gift}/GiftGiven/${id}`);
  return response.data;
};
// src/services/giftTakenService.ts

export const getGiftTakenDetails = async (id: number): Promise<GiftTaken> => {
  const response = await axios.get<GiftTaken>(`${API.gift}/GiftTaken/${id}`);
  return response.data;
};
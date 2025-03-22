import axios, { AxiosResponse } from "axios";
import { LoginResponse, OTPVerificationResponse } from "../interfaces/Models";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7241/api/Otp",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const sendOtp = async (phoneNumber: string): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.get("/send-otp", {
    params: { phoneNumber },
  });
  return response.data;
};

export const validateOtp = async (phoneNumber: string, otp: string): Promise<OTPVerificationResponse> => {
  const response: AxiosResponse<OTPVerificationResponse> = await axiosInstance.post("/validate-otp", {
    phoneNumber,
    otp,
  });
  return response.data;
};

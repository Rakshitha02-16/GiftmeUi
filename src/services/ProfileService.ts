import axios from 'axios';
import { User } from '../Models/User';


const API_BASE_URL = 'https://localhost:7241/api'; // Update this with your actual API URL

// Fetch user profile data
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
export const fetchUserDetails = async (userId: number): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};
// Update user profile details (PUT method)
export const updateUser = async (userData: User) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
// crete user by
export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user`, userData,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
//delete profile photo
export const deleteProfilePic = async (): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user?id=1`);
    console.log('Profile picture deleted:', response.data);
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    throw error; // You can handle the error further here
  }
};



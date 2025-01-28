import axios from 'axios';
import { User } from '../interfaces/Models';


const API_URL = 'https://localhost:7241/api'; // Update this with your actual API URL

// Fetch user profile data
export const fetchUser = async () => {
  try {
    const response = await axios.get(`https://localhost:7241/api/user/1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
export const fetchUserDetails = async (userId: number): Promise<User> => {
  const response = await axios.get(`https://localhost:7241/api/user/1`);
  return response.data;
};
// Update user profile details (PUT method)
export const updateUser = async (userData: User) => {
  try {
    const response = await axios.put(`https://localhost:7241/api/user`, userData, {
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
    const response = await axios.post(`https://localhost:7241/api/user`, userData,{
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
    const response = await axios.delete(`https://localhost:7241/api/user?id=1`);
    console.log('Profile picture deleted:', response.data);
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    throw error; // You can handle the error further here
  }
};



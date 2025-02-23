import axios from 'axios';
import { API } from './API'; // Import API URLs
import { User } from '../Models/User';
import { Summary } from '../Models/User';
// Fetch user profile
export const fetchUser = async () => {
  try {
    const response = await axios.get(`${API.user}/1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Fetch user details dynamically by userId
export const fetchUserDetails = async (userId: number): Promise<User> => {
  const response = await axios.get(`${API.user}/${userId}`);
  return response.data;
};

// Update user profile (PUT request)
export const updateUser = async (userData: User) => {
  try {
    const response = await axios.put(API.user, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Create a new user (POST request)
export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(API.user, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Delete profile picture
export const deleteProfilePic = async (): Promise<void> => {
  try {
    const response = await axios.delete(`${API.user}?id=1`);
    console.log('Profile picture deleted:', response.data);
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    throw error;
  }
};
export const getUserSummary = async (userId: number): Promise<Summary> => {
  const response = await axios.get(`${API.user}/Summary/${userId}`);
  return response.data;
};

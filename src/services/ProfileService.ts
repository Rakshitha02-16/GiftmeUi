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


// Get event
export const fetchEvents = async () => {
  try {
    const response = await axios.get('https://localhost:7241/api/Event/1'); // API endpoint
    return response.data; // Return the events data from the response
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Return an empty array in case of an error
  }
};
// Add event
export const addEvent = async (eventData:Event) => {
  try {
    const response = await axios.post(`https://localhost:7241/api/Event`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

// Delete event

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`https://localhost:7241/api/Event`, {
      params: { Id: id }, // Passing the id as a query parameter
    });

    // You can log the response if needed for debugging
    console.log('Delete Response:', response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error; // Throw error to be caught in the calling function
  }
};


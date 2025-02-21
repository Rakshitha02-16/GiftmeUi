import axios from 'axios';
import { Event } from '../Models/Event'
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




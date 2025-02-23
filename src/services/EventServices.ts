import axios from 'axios';
import { Event } from '../Models/Event'
import { API } from '../services/API'; 

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API.event}/1`);; // API endpoint
    return response.data; // Return the events data from the response
  } catch (error) {
    console.error('Error fetching events:', error);
    return []; // Return an empty array in case of an error
  }
};
// Add event
export const addEvent = async (eventData:Event) => {
  try {
    const response = await axios.post(API.event, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

// Delete event

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(API.event, {
      params: { Id: id }, // Passing the id as a query parameter
    });

    // Log the response for debugging if needed
    console.log('Delete Response:', response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error; // Throw error to be caught in the calling function
  }
};



export const ProfileService = {
  // Fetch Wishlist
  fetchWishlist: async (userId: number) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Wishlist/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }
  },

  // Fetch Events
  fetchEvents: async () => {
    try {
      const response = await fetch('https://localhost:7241/api/Event/1');
      console.log('Response Status:', response.status); // Log the status code for debugging
      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
  

  // Save Event
  saveEvent: async (eventData: any) => {
    try {
      const response = await fetch('https://localhost:7241/api/Event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        throw new Error('Failed to save event');
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving event:', error);
      throw error;
    }
  },

  // Add Item to Wishlist
  addItemToWishlist: async (payload: any) => {
    try {
      const response = await fetch('https://localhost:7241/api/Wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error('Failed to add item to wishlist');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      throw error;
    }
  },

  // Delete Event
  deleteEvent: async (eventId: string) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Event?Id=${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};

import axios from 'axios';
import { API } from './API'; // Import centralized API URLs
import { Following } from '../Models/Follow';

// Get following list for a user
export const getFollowing = async (userId: number): Promise<Following[]> => {
  const response = await axios.get(`${API.follow}/Following`, {
    params: { UserId: userId },
  });
  return response.data;
};

/// Unfollow a user
export const unfollowUser = async (followerId: number, followeeId: number): Promise<string> => {
  const response = await axios.post(`${API.follow}/unfollow`, { followerId, followeeId });
  return response.data;
};

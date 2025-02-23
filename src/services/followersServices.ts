import axios from 'axios';
import { API } from './API'; // Import API from api.ts

import { Follow } from '../Models/Follow';

// Follow a user
// export const followUser = async (followerId: number, followeeId: number): Promise<Follow> => {
//   const response = await axios.post(API.follow, { followerId, followeeId });
//   return response.data;
// };

// Get following list
// export const getFollowing = async (userId: number): Promise<Follow[]> => {
//   const response = await axios.get(`${API.follow}?followeeId=${userId}`);
//   return response.data;
// };

// Get user summary


// Get followers
export const getFollowers = async (userId: number): Promise<Follow[]> => {
  try {
    const response = await axios.get(`${API.follow}/Followers`, {
      params: { UserId: userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (userId: number, followerId: number): Promise<void> => {
  try {
    await axios.delete(`${API.follow}/Unfollow`, {
      params: { UserId: userId, FollowerId: followerId },
    });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

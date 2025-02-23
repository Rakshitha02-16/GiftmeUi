import axios from 'axios';
import { API } from './API'; // Import centralized API URLs
import { Following } from '../Models/Follow';

// Get summary data
// export const getSummaryData = async () => {
//   try {
//     const response = await axios.get(API.follow);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching data');
//   }
// };

// Get following list for a user
export const getFollowing = async (userId: number): Promise<Following[]> => {
  const response = await axios.get(`${API.follow}/Following`, {
    params: { UserId: userId },
  });
  return response.data;
};

// Get all followings of the user
// export const getFollowingList = async () => {
//   try {
//     const response = await axios.get(`${API.user}/following`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching following');
//   }
// };

// Get gift history
// export const getGiftHistory = async () => {
//   try {
//     const response = await axios.get(API.gift);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching gift data');
//   }
// };

// Unfollow a user
export const unfollowUser = async (followerId: number, followeeId: number): Promise<string> => {
  const response = await axios.post(`${API.follow}/unfollow`, { followerId, followeeId });
  return response.data;
};

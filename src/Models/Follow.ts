export interface Follow {
  userId: number;
  userName: string | null;
  profilePicture: string | null;
  followeeId: number;      // Add followeeId to the interface
  followeeName: string;    // Add followeeName to the interface
  profilePhoto: string;    // Add profilePhoto to the interface
  id: number;
}
export interface Following {
  userId: number;
  userName: string | null;
  profilePicture: string | null;
  followeeId: number;
  followeeName: string;
  profilePhoto: string;
  id: number;
}
// export interface Following {
//   id: number;
//   followerId: number;
//   followeeId: number;
//   followerName: string | null;
//   followeeName: string | null;
//   profilePhoto?: string; // Optional profile photo URL
// }


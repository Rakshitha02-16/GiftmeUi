export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: number;
  type: number;
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: Address[];
  profilePicture: string;
  bio: string;
}
export interface Event{
  id: number;
  title: string;
  userId: number;
  dateTime: string; // You can use Date type if you're working with Date objects
}


export interface Wishlist {
  id: number;
  name: string;
  source: string;
  userId: number;
}


export interface Item {
  id: number;
  name: string;
  photo: string;
  description: string;
  wishListId: number;
  source: string;
  isDeleted: boolean;
  price: number;
}
export interface Follow {
  id: number;
  followerId: number;
  followeeId: number;
  followerName?: string | null;
  followeeName?: string | null;
  profilePhoto?: string | null;
}

// models/Gift.ts
export interface Gift {
  id: number;
  itemId: number;
  itemName?: string | null;
  photo: string[];
  fulFilledById: number;
  fulFilledByName?: string | null;
}

// models/Summary.ts
export interface Summary {
  followerCount: number;
  followeeCount: number;
  giftGiven: number;
  giftReceived: number;
}








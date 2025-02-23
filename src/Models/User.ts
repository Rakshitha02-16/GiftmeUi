export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: number;
  type: number;
  latitude: number;
  longitude: number;
  name: { ValueKind: any[] };
}
export interface User {
  uid: string;
  id: number;
  name: string;
  email: string;
  bio: string;
  phone: number;
  address: string[]; // or never[]
  profilePicture: string;
  role: string;
}

export interface Summary {
  followerCount: number;
  followeeCount: number;
  giftGiven: number;
  giftReceived: number;
}





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
  id: number;
  name: string;
  email: string;
  phone: number;
  address: Address[];
  profilePicture: string;
  bio: string;
  uid: string;
  role: number;
}

export interface Summary {
  followerCount: number;
  followeeCount: number;
  giftGiven: number;
  giftReceived: number;
}





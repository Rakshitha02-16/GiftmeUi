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
export interface Event {
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
  items: string[]; // Array of image URLs
}



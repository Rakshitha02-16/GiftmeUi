export interface GiftPost {
  photo: string[];
  tag: string;
  caption: string;
  location?: string; // Add this line to include location
}

export interface Gift {
  id: number;
  itemId: number;
  itemName?: string | null;
  photo: string[];
  fulFilledById: number;
  fulFilledByName?: string | null;
}
export interface Gift {
  name: string;
  price: number;
  occasion: string;
  interests: string[];
  age: number;
  relationship: string;
  sex: string;
  category?: string; 
}
export interface GiftPosts {
  id: number;
  photo: string[];
  tag: string;
  caption: string;
  user: {
    name: string;
    profilePic: string;
  }
}
// src/interfaces/GiftInterface.ts

export interface GiftGiven {
  id: number;
  itemId: number;
  itemName: string | null;
  photo: string[]; // assuming it's an array of image URLs
  fulFilledById: number;
  fulFilledByName: string | null;
  tag: string;
  caption: string;
}
// src/interfaces/GiftTakenInterface.ts

export interface GiftTaken {
  id: number;
  itemId: number;
  itemName: string | null;
  photo: string[];
  fulFilledById: number;
  fulFilledByName: string | null;
  tag: string;
  caption: string;
}

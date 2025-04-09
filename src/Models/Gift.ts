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
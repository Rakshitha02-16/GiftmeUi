export interface Wishlist {
  id: number;
  name: string;
  source: string;
  userId: number;
}
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  wishListId: number;  // Ensure correct spelling
  isDeleted: boolean;
  source: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  wishListId: number;
  isDeleted: boolean;
  source: string; // Ensure this exists
}

export interface Wishlist {
  id: number;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  wishListId?: number;
  isDeleted?: boolean;
}

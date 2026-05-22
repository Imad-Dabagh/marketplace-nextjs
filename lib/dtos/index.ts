export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
}

export interface ListingDTO {
  id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  categoryId: string;
  categoryName?: string;
  imageUrls: string[];
  sellerId: string;
  status: "active" | "sold" | "draft";
  createdAt: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
}

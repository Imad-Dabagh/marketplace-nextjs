export type Listing = {
  _id: string | number;
  title: string;
  price: number;
  description: string;
  location: string;
  categoryId: string;
  imageUrls: string[];
  createdAt: string;
};


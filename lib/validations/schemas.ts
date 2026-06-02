import { z } from "zod";

export const ListingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),
  price: z.number().positive("Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required").trim(),
  condition: z.enum(["new", "like_new", "good", "fair"], {
    message: "Please select a valid condition",
  }).default("good"),
  description: z.string().min(10, "Description must be at least 10 characters").trim(),
  imageUrls: z.array(z.string().url()).default([]),
});

export const ListingCreateSchema = ListingSchema.extend({
  images: z.any().optional(), // Handled by server actions initially as File[]
});

export type ListingInput = z.infer<typeof ListingSchema>;

export const UserRegistrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
});

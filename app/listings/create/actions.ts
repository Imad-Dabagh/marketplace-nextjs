"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Listing from "@/models/listing.model";

export async function createListing(formData: FormData) {
  const title = String(formData.get("title") || "");
  const price = Number(formData.get("price") || 0);
  const category = String(formData.get("category") || "");
  const location = String(formData.get("location") || "");
  const description = String(formData.get("description") || "");

  if (!title || !price || !category || !location || !description) {
    throw new Error("Missing required listing fields");
  }

  await connectToDatabase();

  const listing = await Listing.create({
    title,
    price,
    category,
    location,
    description,
    originalImageUrl: "",
    enhancedImageUrls: [],
    selectedImageUrl: "",
    status: "active",
  });

  revalidatePath("/listings");

  redirect(`/listings/${listing._id.toString()}`);
}
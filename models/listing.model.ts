import { Schema, models, model } from "mongoose";
import "@/models/category.model";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      enum: ["new", "like_new", "good", "fair"],
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    sellerId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "sold", "draft"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Listing = models.Listing || model("Listing", listingSchema);

export default Listing;

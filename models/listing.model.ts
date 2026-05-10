import { Schema, models, model } from "mongoose";

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
    category: {
      type: String,
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
    originalImageUrl: {
      type: String,
      default: "",
    },
    originalImageBase64: {
      type: String,
      default: "",
    },
    originalImageMediaType: {
      type: String,
      default: "",
    },
    enhancedImageUrls: {
      type: [String],
      default: [],
    },
    selectedImageUrl: {
      type: String,
      default: "",
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
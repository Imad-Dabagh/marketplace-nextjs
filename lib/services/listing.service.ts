import { ListingRepository, ListingFilter } from "../repositories/listing.repository";
import { Mapper } from "../dtos/mapper";
import { ListingDTO } from "../dtos";
import { ListingInput, ListingSchema } from "../validations/schemas";
import { CloudinaryService } from "./cloudinary.service";

export class ListingService {
  static async getListings(filter: ListingFilter): Promise<ListingDTO[]> {
    const listings = await ListingRepository.find(filter);
    return listings.map(Mapper.toListingDTO);
  }

  static async getListingById(id: string): Promise<ListingDTO | null> {
    const listing = await ListingRepository.findById(id);
    return listing ? Mapper.toListingDTO(listing) : null;
  }

  static async createListing(
    data: ListingInput,
    imageFiles: File[],
    sellerId: string
  ): Promise<ListingDTO> {
    // 1. Validate data (already validated by Zod usually in action, but good to be sure)
    const validatedData = ListingSchema.parse(data);

    // 2. Upload images if any
    let imageUrls = await CloudinaryService.uploadMultipleImages(imageFiles);

    // 3. Fallback to placeholder if no images
    if (imageUrls.length === 0) {
      imageUrls = ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop"];
    }

    // 4. Create in DB
    const listing = await ListingRepository.create({
      ...validatedData,
      imageUrls,
      sellerId,
      status: "active",
    });

    return Mapper.toListingDTO(listing);
  }
}

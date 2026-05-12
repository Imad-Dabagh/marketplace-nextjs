import { CategoryDTO, ListingDTO, UserDTO } from "./index";

export class Mapper {
  static toCategoryDTO(doc: any): CategoryDTO {
    return {
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
    };
  }

  static toUserDTO(doc: any): UserDTO {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      image: doc.image,
      role: doc.role,
    };
  }

  static toListingDTO(doc: any): ListingDTO {
    return {
      id: doc._id.toString(),
      title: doc.title,
      price: doc.price,
      description: doc.description,
      location: doc.location,
      categoryId: doc.categoryId?._id?.toString() || doc.categoryId?.toString(),
      categoryName: doc.categoryId?.name,
      imageUrls: doc.imageUrls || [],
      sellerId: doc.sellerId,
      createdAt: doc.createdAt.toISOString(),
    };
  }
}

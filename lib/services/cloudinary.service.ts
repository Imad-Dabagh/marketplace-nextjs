import cloudinary from "@/lib/cloudinary";

export class CloudinaryService {
  static async uploadImage(file: File): Promise<string> {
    if (!file || file.size === 0) return "";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "marketplace" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || "");
        }
      ).end(buffer);
    });
  }

  static async uploadMultipleImages(files: File[]): Promise<string[]> {
    const uploadPromises = files
      .filter(file => file.size > 0)
      .map(file => this.uploadImage(file));
    
    return Promise.all(uploadPromises);
  }
}

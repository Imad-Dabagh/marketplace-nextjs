"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface ProfileAvatarProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  const router = useRouter();
  const { update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/users/profile/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      // Update local session data with new image
      await update({ image: data.imageUrl });
      
      // Success - refresh the page to get the updated user data
      router.refresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div 
      className="relative mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-lg group cursor-pointer"
      onClick={handleImageClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {user.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          fill
          sizes="128px"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-4xl font-bold text-zinc-400">
          {user.name?.substring(0, 2).toUpperCase() || 'U'}
        </div>
      )}

      {/* Overlay for uploading state */}
      {isUploading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-8 w-8 text-white" />
        </div>
      )}
    </div>
  );
}

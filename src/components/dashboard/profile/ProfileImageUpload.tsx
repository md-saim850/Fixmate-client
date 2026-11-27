"use client";

import Image from "next/image";
import { Camera, Loader2, UserRound } from "lucide-react";

interface ProfileImageUploadProps {
  avatar: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}

export default function ProfileImageUpload({
  avatar,
  uploading,
  onUpload,
}: ProfileImageUploadProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-green-100 shadow-md">
          {avatar ? (
            <Image
              src={avatar}
              alt="Profile"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <UserRound className="h-10 w-10 text-green-700" />
          )}
        </div>

        <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white shadow hover:bg-green-800">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={handleChange}
            disabled={uploading}
          />
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          Profile Photo
        </p>
        <p className="text-xs text-gray-400">
          JPG, PNG or WebP. Maximum 1MB.
        </p>
      </div>
    </div>
  );
}
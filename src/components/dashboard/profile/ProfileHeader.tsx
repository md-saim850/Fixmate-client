
import { ShieldCheck } from "lucide-react";
import ProfileImageUpload from "./ProfileImageUpload";
import type { UserProfile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
  avatar: string;
  uploading: boolean;
  onUpload: (file: File) => void;
}

export default function ProfileHeader({
  profile,
  avatar,
  uploading,
  onUpload,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-6">
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <ProfileImageUpload
          avatar={avatar}
          uploading={uploading}
          onUpload={onUpload}
        />

        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">
            {profile.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {profile.email}
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            {profile.role}
          </span>
        </div>
      </div>
    </div>
  );
}

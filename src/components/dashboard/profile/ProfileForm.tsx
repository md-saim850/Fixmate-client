
"use client";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  Loader2,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import ProfileInfoField from "./ProfileInfoField";
import type { ProfileFormData, UserProfile } from "@/types/profile";

interface ProfileFormProps {
  profile: UserProfile;
  formData: ProfileFormData;
  saving: boolean;
  uploading: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProfileForm({
  profile,
  formData,
  saving,
  uploading,
  onChange,
  onSubmit,
}: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal details.
          </p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <ProfileInfoField
            label="Full Name"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            icon={UserRound}
            onChange={onChange}
          />

          <ProfileInfoField
            label="Email Address"
            name="email"
            value={profile.email}
            placeholder=""
            icon={Mail}
            readOnly
          />

          <ProfileInfoField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            placeholder="Enter phone number"
            icon={Phone}
            onChange={onChange}
          />

          <ProfileInfoField
            label="Area / Location"
            name="area"
            value={formData.area}
            placeholder="Enter your area"
            icon={MapPin}
            onChange={onChange}
          />

          <ProfileInfoField
            label="Account Role"
            name="role"
            value={profile.role}
            placeholder=""
            icon={ShieldCheck}
            readOnly
          />

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">About Me</Label>

            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={onChange}
                placeholder="Write something about yourself..."
                maxLength={500}
                className="min-h-28 resize-none pl-10"
              />
            </div>

            <p className="text-right text-xs text-gray-400">
              {formData.bio.length}/500
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-100 p-6">
          <Button
            type="submit"
            disabled={saving || uploading}
            className="bg-green-700 text-white hover:bg-green-800"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}


"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { getClientToken } from "@/lib/get-client-token";

import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import ProfileForm from "@/components/dashboard/profile/ProfileForm";

import type {
  UserProfile,
  ProfileFormData,
} from "@/types/profile";
import { uploadImage } from "@/lib/uploadImage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialFormData: ProfileFormData = {
  name: "",
  phone: "",
  area: "",
  bio: "",
  avatar: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] =
    useState<ProfileFormData>(initialFormData);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch profile
  const getProfile = async () => {
    try {
      const token = await getClientToken();

      const res = await fetch(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      const user: UserProfile = data.user;

      setProfile(user);

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        area: user.area || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));

      toast.success("Profile image uploaded successfully");

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);

    try {
      const token = await getClientToken();

      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      const updatedUser: UserProfile = data.user;

      setProfile(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        phone: updatedUser.phone || "",
        area: updatedUser.area || "",
        bio: updatedUser.bio || "",
        avatar: updatedUser.avatar || "",
      });

      // Notify navbar and dashboard header
      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: updatedUser,
        })
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-700" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Unable to load profile.</p>
        <button
          onClick={getProfile}
          className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and account settings.
        </p>
      </div>

      <ProfileHeader
        profile={profile}
        avatar={formData.avatar}
        uploading={uploading}
        onUpload={handleImageUpload}
      />

      <ProfileForm
        profile={profile}
        formData={formData}
        saving={saving}
        uploading={uploading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

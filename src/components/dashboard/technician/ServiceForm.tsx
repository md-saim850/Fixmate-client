
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/uploadImage";

import type {
  TechnicianService,
  ServiceMode,
} from "@/types/dashboard";
import { getClientToken } from "@/lib/get-client-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const categories = [
  "Plumbing",
  "Electrical",
  "AC Repair",
  "Cleaning",
  "Painting",
  "Carpentry",
  "Appliance Repair",
  "Other",
];

interface Props {
  technician: {
    name: string;
    email: string;
  };
  service?: TechnicianService;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function ServiceForm({
  technician,
  service,
  onCancel,
  onSuccess,
}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(service?.image[0]);
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(service?.isAvailable ?? true);

  const inputClass ="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
  
  const handleImage = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error("Image size must be below 1MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };  

  const removeImage = () => {
    if (preview && image) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview(service?.image[0] ?? "");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formValues = Object.fromEntries(formData.entries()) as {
      title: string;
      category: string;
      description: string;
      basePrice: string;
      estimatedDuration: string;
      serviceMode: ServiceMode;
      serviceArea: string;
    };

    const {
      title,
      category,
      description,
      basePrice,
      estimatedDuration,
      serviceMode,
      serviceArea,
    } = formValues;

    if (
      !title.trim() ||
      !category ||
      !description.trim() ||
      !basePrice ||
      !estimatedDuration.trim() ||
      !serviceArea.trim() ||
      !preview
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    const price = Number(basePrice);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Base price must be a positive number");
      return;
    }

    if (!API_URL) {
      toast.error("API URL is not configured");
      return;
    }

    setLoading(true);

    try {

      let images: string[] = service?.image ?? [];

      if (image) {
        const uploadedUrl = await uploadImage(image);
        if (!uploadedUrl) {
          throw new Error("Image upload failed");
        }
        images = [uploadedUrl];
      }

      if (images.length === 0) {
        throw new Error("Please upload a service image");
      }

      const token = await getClientToken();

      if (!token) {
        throw new Error("Authentication required. Please login again.");
      }

      const payload = {
        title: title.trim(),
        category,
        description: description.trim(),
        basePrice: price,
        estimatedDuration: estimatedDuration.trim(),
        serviceMode,
        serviceArea: serviceArea.trim(),
        image: images,
        isAvailable,
      };


      const url = service
        ? `${API_URL}/services/${service._id}`
        : `${API_URL}/services`;

      const response = await fetch(url, {
        method: service ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to save service");
      }
      
      if (!service) {
        setImage(null);
        setPreview("");
        setIsAvailable(true);
      }

      toast.success(
        service
        ? "Service updated successfully!"
        : "Service submitted! Waiting for admin approval."
      );

      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }

    } catch (error) {
      console.error("Service submission error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (  
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Technician information */}
      <div className="grid gap-4 rounded-2xl bg-gray-50 p-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Technician Name</label>
          <input
            value={technician.name}
            readOnly
            className={`${inputClass} bg-gray-100`}
          />
        </div>

        <div>
          <label className={labelClass}>Technician Email</label>
          <input
            value={technician.email}
            readOnly
            className={`${inputClass} bg-gray-100`}
          />
        </div>
      </div>

      {/* Title and category */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Service Title *</label>
          <input
            name="title"
            defaultValue={service?.title ?? ""}
            placeholder="e.g. Professional AC Repair"
            className={inputClass}
            maxLength={100}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <select
            name="category"
            defaultValue={service?.category ?? ""}
            className={inputClass}
            required
          >
            <option value="">Select category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description *</label>
        <textarea
          name="description"
          defaultValue={service?.description ?? ""}
          placeholder="Describe your service..."
          rows={5}
          maxLength={2000}
          className={inputClass}
          required
        />
      </div>

      {/* Price and duration */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Base Price (৳) *</label>
          <input
            name="basePrice"
            type="number"
            min="0.01"
            step="0.01"
            defaultValue={service?.basePrice?.toString() ?? ""}
            placeholder="1500"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Estimated Duration *</label>
          <input
            name="estimatedDuration"
            defaultValue={service?.estimatedDuration ?? ""}
            placeholder="e.g. 2 hours"
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Service mode */}
      <div>
        <label className={labelClass}>Service Mode *</label>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: "home-visit", label: "Home Visit" },
            { value: "shop-drop-off", label: "Shop Drop-off" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50"
            >
              <input
                type="radio"
                name="serviceMode"
                value={item.value}
                defaultChecked={
                  service?.serviceMode
                    ? service.serviceMode === item.value
                    : item.value === "home-visit"
                }
                required
                className="accent-emerald-600"
              />

              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Service area */}
      <div>
        <label className={labelClass}>Service Area *</label>
        <input
          name="serviceArea"
          defaultValue={service?.technician.area}
          placeholder="e.g. Dhaka, Uttara, Mirpur"
          className={inputClass}
          required
        />
      </div>

      {/* Service Availability */}
      <div className="rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Service Availability
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Control whether customers can book this service.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isAvailable}
            aria-label="Toggle service availability"
            onClick={() => setIsAvailable((prev) => !prev)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
              isAvailable ? "bg-emerald-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                isAvailable ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className={labelClass}>Service Image *</label>

        <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-5 transition hover:border-emerald-400 hover:bg-emerald-50/50">
          {preview ? (
            <div className="relative h-48 w-full max-w-md">
              <Image
                src={preview}
                alt="Service preview"
                fill
                unoptimized
                className="rounded-xl object-cover"
              />
            </div>
          ) : (
            <>
              <ImagePlus size={36} className="text-emerald-600" />
              <p className="mt-3 text-sm font-semibold text-gray-700">
                Click to upload service image
              </p>
              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG or WEBP (Maximum 5MB)
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => handleImage(e.target.files?.[0])}
          />
        </label>

        {preview && image && (
          <button
            type="button"
            onClick={removeImage}
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-500"
          >
            <X size={14} />
            Remove new image
          </button>
        )}
      </div>

      {/* Submit */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <Loader2 size={17} className="animate-spin" />
          )}

          {loading
            ? "Saving..."
            : service
              ? "Update Service"
              : "Submit for Approval"}
        </button>
      </div>
    </form>
  );
}

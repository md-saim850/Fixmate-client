
import Image from "next/image";
import {
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { Service } from "@/types/service";

export function TechnicianCard({
  technician,
}: {
  technician: Service["technician"];
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="mb-4 text-sm font-bold text-gray-900">
        Service provider
      </p>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-green-50">
          <Image
            src={technician.avatar || "/default-avatar.png"}
            alt={technician.name || "Technician"}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-900">
              {technician.name}
            </h3>
            <BadgeCheck size={17} className="shrink-0 text-green-600" />
          </div>
          <p className="text-xs text-gray-500">Verified Service Provider</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="my-5 space-y-3 border-y border-gray-100 py-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail size={17} className="shrink-0 text-green-600" />
          <span className="break-all text-gray-600">
            {technician.email || "Email not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Phone size={17} className="shrink-0 text-green-600" />
          <span className="text-gray-600">
            {technician.phone || "Phone not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <MapPin size={17} className="shrink-0 text-green-600" />
          <span className="text-gray-600">
            {technician.area || "Area not provided"}
          </span>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h4 className="mb-2 text-sm font-bold text-gray-900">
          About Provider
        </h4>
        <p className="text-sm leading-6 text-gray-600">
          {technician.bio || "This service provider hasn't added a bio yet."}
        </p>
      </div>
    </div>
  );
}

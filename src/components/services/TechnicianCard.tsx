
import Image from "next/image";
import { BadgeCheck, BriefcaseBusiness, Star } from "lucide-react";
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

      <div className="flex items-center gap-3">
        <div className="relative size-14 overflow-hidden rounded-full bg-green-50">
          <Image
            src={technician.avatar}
            alt={technician.name} 
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-900">
              {technician.name}
            </h3>
              <BadgeCheck size={17} className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Completed jobs</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-bold">
            <BriefcaseBusiness size={14} />
            {/* {technician.totalJobs}+ */}
          </p>
        </div>
      </div>

    </div>
  );
}

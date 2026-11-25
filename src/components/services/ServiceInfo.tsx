
import {ShieldCheck,} from "lucide-react";
import type { Service } from "@/types/service";

export function ServiceInfo({ service }: { service: Service }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {service.category}
        </span>

        <span className="flex items-center gap-1 text-xs font-medium text-green-700">
          <ShieldCheck size={15} />
          Verified service
        </span>
      </div>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        {service.title}
      </h1>

      <div className="my-7 border-t border-gray-100" />

      <h2 className="text-lg font-bold text-gray-900">
        About this service
      </h2>

      <p className="mt-3 text-sm leading-7 text-gray-600 rounded-2xl border border-gray-100 bg-white p-5">
        {service.description}
      </p>
    </div>
  );
}

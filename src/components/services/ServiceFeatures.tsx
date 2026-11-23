
import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/types/service";

export function ServiceFeatures({ service }: { service: Service }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h2 className="text-lg font-bold">Service features</h2>
        <ul className="mt-5 space-y-4">
          {/* {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 size={18} className="shrink-0 text-green-600" />
              {feature}
            </li>
          ))} */}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold">What's included</h2>
        <ul className="mt-5 space-y-4">
          {/* {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 size={18} className="shrink-0 text-green-600" />
              {item}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

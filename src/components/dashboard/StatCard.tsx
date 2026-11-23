
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={23} />
        </div>

        <TrendingUp size={17} className="text-emerald-500" />
      </div>

      <p className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-gray-900">
        {value}
      </h2>

      <p className="mt-2 text-xs text-gray-400">
        {description}
      </p>
    </div>
  );
}

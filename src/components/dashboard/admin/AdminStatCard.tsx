import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
}

export default function AdminStatCard({
  title,
  value,
  icon: Icon,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div className="rounded-xl bg-green-50 p-3 text-green-600">
          <Icon size={22} />
        </div>
      </div>

      <h2 className="mt-5 text-3xl font-bold text-gray-900">
        {value.toLocaleString()}
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}
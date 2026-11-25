import { ShieldCheck } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function AdminHeader({
  title,
  description,
}: Props) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
        <ShieldCheck size={17} />
        Administrator
      </div>
    </header>
  );
}

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";

interface ProfileInfoFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  icon: LucideIcon;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoField({
  label,
  name,
  value,
  placeholder,
  icon: Icon,
  readOnly = false,
  onChange,
}: ProfileInfoFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>

      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`pl-10 ${
            readOnly ? "bg-gray-50 text-gray-500" : ""
          }`}
        />
      </div>
    </div>
  );
}

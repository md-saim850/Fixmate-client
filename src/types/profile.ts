
export type UserRole = "customer" | "technician" | "admin";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  area?: string;
  bio?: string;
  avatar?: string;
}

export interface ProfileFormData {
  name: string;
  phone: string;
  area: string;
  bio: string;
  avatar: string;
}

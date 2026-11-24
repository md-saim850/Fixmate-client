
export type UserRole = "customer" | "technician" | "admin";

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

export type BookingStatus =
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed"
  | "rejected"
  | "cancelled";

export type PaymentStatus = "paid" | "unpaid";

export interface Booking {
  _id: string;
  service: {
    title: string;
    image: string;
  };
  technician: {
    name: string;
    email?: string;
  };
  preferredDate: string;
  basePrice: number;
  finalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  _id: string;
  serviceTitle: string;
  technicianName: string;
  amount: number;
  transactionId: string;
  paidAt: string;
}

export interface DashboardStat {
  title: string;
  value: number;
  description: string;
  icon: string;
}

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type ServiceMode = "home-visit" | "shop-drop-off" | "online";

export interface TechnicianService {
  _id: string;
  title: string;
  category: string;
  description: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: ServiceMode;
  serviceArea: string;
  image: string;
  technicianName: string;
  technicianEmail: string;
  approvalStatus: ApprovalStatus;
  isAvailable: boolean;
  createdAt?: string;
}

export interface TechnicianStats {
  totalServices: number;
  approvedServices: number;
  pendingRequests: number;
}

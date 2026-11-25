export type UserRole = "customer" | "technician" | "admin";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "in-progress"
  | "completed"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: string;
}

export interface AdminService {
  _id: string;
  title: string;
  category: string;
  basePrice: number;
  approvalStatus: ApprovalStatus;
  technician: {
    id: string;
    name: string;
    email?: string;
  };
  createdAt: string;
}

export interface AdminBooking {
  _id: string;
  service: {
    title: string;
  };
  customer: {
    name: string;
    email?: string;
  };
  technician: {
    name: string;
  };
  serviceDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
}

export interface AdminTransaction {
  _id: string;
  customer: {
    name: string;
  };
  technician: {
    name: string;
  };
  service: {
    title: string;
  };
  amount: number;
  transactionId: string;
  createdAt: string;
}

export interface AdminStatus {
  status:{
    totalUsers: number;
    totalTechnicians: number;
    pendingServices: number;
    totalBookings: number;
    totalRevenue: number;
  }
}

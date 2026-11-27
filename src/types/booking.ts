
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
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  serviceDate: string;
  problemDescription: string;
  serviceTitle: string;
  basePrice: number;
  finalAmount?: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export type BookingFilter =
  | "all"
  | "requested"
  | "accepted"
  | "in-progress"
  | "completed";

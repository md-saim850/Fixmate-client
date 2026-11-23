
export type ServiceReview = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string[];
  basePrice: number;
  rating: number;
  totalReviews: number;
  location: string;
  duration: string;
  technician: {
    name: string;
    avatar: string;
    verified: boolean;
    rating: number;
    totalJobs: number;
    experience: string;
  };
  features: string[];
  includes: string[];
  reviews: ServiceReview[];
};

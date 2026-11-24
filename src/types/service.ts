
export type ServiceReview = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
};

export type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  serviceMode:string;

  estimatedDuration: string;
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

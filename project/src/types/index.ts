export type Recipe = {
  id: string;
  name: string;
  chef: string;
  totalRatings: number;
  avgRating: number;
  uploadedOn: string;
  mealType: string;
  dishType: string;
  testKitchenApproved: boolean;
  contestWinner: boolean;
  featured: boolean;
  description: string;
  imgUrl: string;
};

export type SortOption = 'newest' | 'oldest' | 'highest-rated' | 'lowest-rated';

export type Filters = {
  attributes: string[];
  mealTypes: string[];
  dishTypes: string[];
};
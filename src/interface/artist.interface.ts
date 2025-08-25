export type Artist = {
  id: string;
  name: string;
  designation: string;
  rating: number;
  reviews: number;
  tags: string[];
  price: number;
  oldPrice?: number;
  eta: number;
  slotsLeft: number;
  image: string;
  username: string;
};

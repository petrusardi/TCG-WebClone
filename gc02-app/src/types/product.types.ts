export type TProduct = {
  id?: string;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  thumbnail: string;
  tags: string[];
  slug: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
};

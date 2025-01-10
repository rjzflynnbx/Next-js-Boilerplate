export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  calories?: string;
};

export type CartItem = {
  quantity: number;
} & Product;

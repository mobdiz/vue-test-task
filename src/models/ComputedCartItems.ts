import { Product } from "./Product";

export interface ComputedCartItem {
  item: Product;
  count: number;
  sum: number;
}

export interface ComputedCartItems {
  sum: number;
  count: number;
  items: ComputedCartItem[];
}

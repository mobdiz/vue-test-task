import { CartItems } from "@/models/CartItems";
import { Product } from "@/models/Product";

export interface CartState {
  items: CartItems;
  itemsLoading: boolean;
  products: Product[];
  productsLoading: boolean;
}

export interface FetchForCartPayload {
  ids: string[];
}

export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}

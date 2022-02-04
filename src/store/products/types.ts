import { Product } from "@/models/Product";

export interface FetchListPayload {
  pageNum?: number;
  search?: string;
  category?: string;
}

export interface ProductsState {
  items: Product[];
  isItemsLoading: boolean;
  item: Product | null;
  isItemLoading: boolean;
  pageCount: number;
}

import { Category } from "@/models/Category";

export interface CategoriesState {
  items: Category[];
  isItemsLoading: boolean;
}

import { MutationTree } from "vuex";

import * as names from "@/store/names";

import { ProductsState } from "./types";

import { Product } from "@/models/Product";

export const mutations: MutationTree<ProductsState> = {
  [names.PRODUCTS_MUTATION_SET_ITEMS]: (state, items: Product[]) => {
    state.items = items;
  },
  [names.PRODUCTS_MUTATION_SET_ITEMS_LOADING]: (state, loading: boolean) => {
    state.isItemsLoading = loading;
  },
  [names.PRODUCTS_MUTATION_SET_ITEM]: (state, item: Product) => {
    state.item = item;
  },
  [names.PRODUCTS_MUTATION_SET_ITEM_LOADING]: (state, loading: boolean) => {
    state.isItemLoading = loading;
  },
  [names.PRODUCTS_MUTATION_SET_PAGE_COUNT]: (state, pageCount: number) => {
    state.pageCount = pageCount;
  },
};

import { MutationTree } from "vuex";

import { CategoriesState } from "./types";

import { Category } from "@/models/Category";

import * as names from "../names/categories";

export const mutations: MutationTree<CategoriesState> = {
  [names.CATEGORIES_MUTATION_SET_ITEMS]: (state, items: Category[]) => {
    state.items = items;
  },
  [names.CATEGORIES_MUTATION_SET_ITEMS_LOADING](state, loading: boolean) {
    state.isItemsLoading = loading;
  },
};

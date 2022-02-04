import { GetterTree } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { CategoriesState } from "./types";

import { Category } from "@/models/Category";

export const getters: GetterTree<CategoriesState, RootState> = {
  [names.CATEGORIES_GETTERS_COMPUTED_ITEMS]: (state): Category[] => {
    return [
      {
        label: "Все категории",
        id: "",
      },
      ...state.items,
    ];
  },
};

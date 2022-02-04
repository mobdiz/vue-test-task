import { ActionTree } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { CategoriesState } from "./types";

import { api } from "../axios";

import { Category } from "@/models/Category";

export const defaultItem: Category = {
  id: "",
  label: "Все",
};

export const actions: ActionTree<CategoriesState, RootState> = {
  [names.CATEGORIES_ACTION_FETCH_ITEMS]: async ({ commit }): Promise<void> => {
    commit(names.CATEGORIES_MUTATION_SET_ITEMS_LOADING, true);

    try {
      const { data: items } = await api.get<Category[]>(
        "/v3/45c473de-597b-4afb-938d-6fd8004eed63"
      );

      commit(names.CATEGORIES_MUTATION_SET_ITEMS, [defaultItem, ...items]);
    } catch (e) {
      console.error(e);

      alert("Ошибка загрузки категорий");

      commit(names.CATEGORIES_MUTATION_SET_ITEMS, [defaultItem]);
    } finally {
      commit(names.CATEGORIES_MUTATION_SET_ITEMS_LOADING, false);
    }
  },
};

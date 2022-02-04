import { ActionTree } from "vuex";

import { api } from "../axios";

import * as names from "@/store/names";

import { fetchProducts } from "./api";

import { RootState } from "../types";

import { FetchListPayload, ProductsState } from "./types";

import { Product } from "@/models/Product";

const limit = 6;

export const actions: ActionTree<ProductsState, RootState> = {
  [names.PRODUCTS_ACTION_FETCH_PRODUCTS]: async (
    { commit },
    payload: FetchListPayload = {}
  ): Promise<void> => {
    commit(names.PRODUCTS_MUTATION_SET_ITEMS_LOADING, true);

    const startPos = payload.pageNum ? (payload.pageNum - 1) * limit : 0;

    try {
      const { data } = await fetchProducts(payload);

      const filteredList = data.filter((product) => {
        let res = true;

        if (
          payload.search &&
          !product.title.includes(payload.search) &&
          !product.description.includes(payload.search) &&
          !product.content.includes(payload.search)
        ) {
          res = false;
        }

        if (payload.category && product.categoryId !== payload.category) {
          res = false;
        }

        return res;
      });

      const listMockParted = filteredList.slice(startPos, startPos + limit);

      const pageCount = Math.floor(filteredList.length / limit);

      commit(names.PRODUCTS_MUTATION_SET_ITEMS, listMockParted);
      commit(names.PRODUCTS_MUTATION_SET_PAGE_COUNT, pageCount);
    } catch (e) {
      console.error(e);
      alert("Ошибка загрузки продуктов");

      commit(names.PRODUCTS_MUTATION_SET_ITEMS, []);
      commit(names.PRODUCTS_MUTATION_SET_PAGE_COUNT, 1);
    } finally {
      commit(names.PRODUCTS_MUTATION_SET_ITEMS_LOADING, false);
    }
  },
  [names.PRODUCTS_ACTION_FETCH_PRODUCT]: async (
    { commit },
    id: string
  ): Promise<void> => {
    commit(names.PRODUCTS_MUTATION_SET_ITEM_LOADING, true);

    try {
      const { data } = await api.get<Product[]>(
        "v3/2bf99f55-9faa-446d-a09d-749c4f8857af",
        {
          params: {
            id,
          },
        }
      );

      const item = data.find((product) => product.id === id);

      if (item) {
        commit(names.PRODUCTS_MUTATION_SET_ITEM, item);
      }
    } catch (e) {
      console.error(e);
    } finally {
      commit(names.PRODUCTS_MUTATION_SET_ITEM_LOADING, false);
    }
  },
};

import { ActionTree } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { CartState, FetchForCartPayload, UpdateQuantityPayload } from "./types";

import { CartItems } from "@/models/CartItems";

import { Product } from "@/models/Product";

import { fetchProducts } from "../products/api";

const keyForLocalStorage = "cartItems";

export const actions: ActionTree<CartState, RootState> = {
  [names.CART_ACTION_FETCH_ITEMS]: ({ commit, dispatch }): void => {
    // Оставил статус загрузки на случай, если будет асинхронный запрос

    commit(names.CART_MUTATION_SET_ITEMS_LOADING, true);

    const itemsStr = localStorage.getItem(keyForLocalStorage) || "{}";

    const items: CartItems = JSON.parse(itemsStr);

    commit(names.CART_MUTATION_SET_ITEMS, items);
    commit(names.CART_MUTATION_SET_ITEMS_LOADING, false);

    dispatch(names.CART_ACTION_FETCH_PRODUCTS, { ids: Object.keys(items) });
  },
  [names.CART_ACTION_FETCH_PRODUCTS]: async (
    { commit },
    payload: FetchForCartPayload
  ): Promise<void> => {
    commit(names.CART_MUTATION_SET_PRODUCTS_LOADING, true);

    try {
      const { data } = await fetchProducts();

      const filteredList = data.filter((product) =>
        payload.ids.includes(product.id)
      );

      commit(names.CART_MUTATION_SET_PRODUCTS, filteredList);
    } catch (e) {
      console.error(e);

      alert("Ошибка загрузки товаров из корзины");
    } finally {
      commit(names.CART_MUTATION_SET_PRODUCTS_LOADING, false);
    }
  },
  [names.CART_ACTION_ADD_ITEM]: (
    { commit, dispatch, state },
    payload: Product
  ) => {
    commit(names.CART_MUTATION_ADD_ITEM, payload);

    dispatch(names.CART_ACTION_SAVE_ITEMS_TO_LOCAL_STORAGE);

    dispatch(names.CART_ACTION_FETCH_PRODUCTS, {
      ids: Object.keys(state.items),
    });
  },
  [names.CART_ACTION_SAVE_ITEMS_TO_LOCAL_STORAGE]: ({ state }) => {
    localStorage.setItem(keyForLocalStorage, JSON.stringify(state.items));
  },
  [names.CART_ACTION_UPDATE_QUANTITY]: (
    { commit, dispatch },
    payload: UpdateQuantityPayload
  ) => {
    commit(names.CART_MUTATION_UPDATE_QUANTITY, payload);

    dispatch(names.CART_ACTION_SAVE_ITEMS_TO_LOCAL_STORAGE);
  },
};

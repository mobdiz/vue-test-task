import { MutationTree } from "vuex";

import * as names from "@/store/names";

import { CartState, UpdateQuantityPayload } from "./types";

import { CartItems } from "@/models/CartItems";
import { Product } from "@/models/Product";

export const mutations: MutationTree<CartState> = {
  [names.CART_MUTATION_SET_ITEMS]: (state, items: CartItems) => {
    state.items = items;
  },
  [names.CART_MUTATION_SET_ITEMS_LOADING]: (state, loading: boolean) => {
    state.itemsLoading = loading;
  },
  [names.CART_MUTATION_SET_PRODUCTS]: (state, items: Product[]) => {
    state.products = items;
  },
  [names.CART_MUTATION_SET_PRODUCTS_LOADING]: (state, loading: boolean) => {
    state.productsLoading = loading;
  },
  [names.CART_MUTATION_ADD_ITEM]: (state, id: string) => {
    if (state.items[id]) {
      state.items = {
        ...state.items,
        [id]: state.items[id] + 1,
      };
    } else {
      state.items = {
        ...state.items,
        [id]: 1,
      };
    }
  },
  [names.CART_MUTATION_UPDATE_QUANTITY]: (
    state,
    payload: UpdateQuantityPayload
  ) => {
    const items = { ...state.items };

    if (payload.quantity) {
      items[payload.id] = payload.quantity;
    } else {
      delete items[payload.id];
    }

    state.items = items;
  },
};

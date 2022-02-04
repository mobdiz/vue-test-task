import { GetterTree } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";
import { CartState } from "./types";

import {
  ComputedCartItems,
  ComputedCartItem,
} from "@/models/ComputedCartItems";

export const getters: GetterTree<CartState, RootState> = {
  [names.CART_GETTER_COMPUTED_ITEMS]: (state): ComputedCartItems => {
    const computedCartItems: ComputedCartItems = {
      count: 0,
      sum: 0,
      items: [],
    };

    const { items, products } = state;

    products.forEach((product) => {
      if (!items[product.id]) {
        return;
      }

      const count = items[product.id];
      const sum = product.price * count;

      const computedCartItem: ComputedCartItem = {
        item: product,
        count,
        sum,
      };

      computedCartItems.sum += sum;
      computedCartItems.count += count;
      computedCartItems.items.push(computedCartItem);
    });

    return computedCartItems;
  },
  [names.CART_GETTER_IS_LOADING]: (state): boolean => {
    return state.itemsLoading || state.productsLoading;
  },
};

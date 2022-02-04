import { Module } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { ProductsState } from "./types";

import { actions } from "./actions";
import { mutations } from "./mutations";

export const state: ProductsState = {
  [names.PRODUCTS_STATE_ITEMS]: [],
  [names.PRODUCTS_STATE_IS_ITEMS_LOADING]: true,
  [names.PRODUCTS_STATE_ITEM]: null,
  [names.PRODUCTS_STATE_IS_ITEM_LOADING]: true,
  [names.PRODUCTS_STATE_PAGE_COUNT]: 1,
};

const namespaced: boolean = true;

export const products: Module<ProductsState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

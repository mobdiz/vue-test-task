import { Module } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { CartState } from "./types";

import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

const itemStr = localStorage.getItem("cartItems") || "{}";

const items = JSON.parse(itemStr);

export const state: CartState = {
  [names.CART_STATE_ITEMS]: items,
  [names.CART_STATE_ITEMS_LOADING]: true,
  [names.CART_STATE_PRODUCTS]: [],
  [names.CART_STATE_PRODUCTS_LOADING]: true,
};

const namespaced: boolean = true;

export const cart: Module<CartState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};

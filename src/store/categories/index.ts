import { Module } from "vuex";

import * as names from "@/store/names";

import { RootState } from "../types";

import { CategoriesState } from "./types";

import { getters } from "./getters";
import { actions, defaultItem } from "./actions";
import { mutations } from "./mutations";

export const state: CategoriesState = {
  [names.CATEGORIES_STATE_ITEMS]: [defaultItem],
  [names.CATEGORIES_STATE_ITEMS_LOADING]: false,
};

const namespaced: boolean = true;

export const categories: Module<CategoriesState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

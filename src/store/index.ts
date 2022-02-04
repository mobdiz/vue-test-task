import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import { RootState } from "./types";

import { products } from "./products";
import { categories } from "./categories";
import { cart } from "./cart";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    products,
    categories,
    cart,
  },
};

export default new Vuex.Store<RootState>(store);

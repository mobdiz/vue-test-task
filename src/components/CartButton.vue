<template>
  <v-btn block color="primary" large tile to="/cart" :loading="isLoading">
    {{ cartButtonText }}
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";

import * as names from "@/store/names";

import { namespace } from "vuex-class";

import { Component } from "vue-property-decorator";

import { declOfNum } from "@/helpers/declOfNum";
import { numToCurrency } from "@/helpers/numToCurrency";

import { ComputedCartItems } from "@/models/ComputedCartItems";

const cartModule = namespace("cart");

@Component
export default class CartButton extends Vue {
  @cartModule.Getter(names.CART_GETTER_COMPUTED_ITEMS)
  computedCartItems!: ComputedCartItems;

  @cartModule.Getter(names.CART_GETTER_IS_LOADING)
  isLoading!: boolean;

  get cartButtonText(): string {
    const { count, sum } = this.computedCartItems;

    if (!count) {
      return "Корзина пуста";
    }

    const formattedPrice = numToCurrency(sum);

    const productStr = declOfNum(count, ["программа", "программы", "программ"]);

    return `${count} ${productStr} - ${formattedPrice}`;
  }
}
</script>

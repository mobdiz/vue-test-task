<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbs" class="px-0 pt-0"></v-breadcrumbs>

    <h1 class="mb-7">Корзина</h1>

    <div v-if="isLoading" class="d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <template v-else-if="cartItems.count">
      <shop-cart />
    </template>

    <v-alert v-else outlined type="info"> Корзина пуста </v-alert>
  </v-container>
</template>

<script lang="ts">
import { ComputedCartItems } from "@/models/ComputedCartItems";
import Vue from "vue";

import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const cartModule = namespace("cart");

@Component({
  components: {
    ShopCart: () => import("@/components/ShopCart.vue"),
  },
})
export default class CartPage extends Vue {
  @cartModule.Getter("computedItems")
  cartItems!: ComputedCartItems;

  @cartModule.Getter("isLoading")
  isLoading!: boolean;

  breadcrumbs = [
    {
      text: "Программы НМО",
      disabled: false,
      href: "/",
    },
    {
      text: "Корзина",
      disabled: true,
      href: "/cart",
    },
  ];
}
</script>

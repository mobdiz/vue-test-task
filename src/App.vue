<template>
  <v-app class="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.v-application {
  &--wrap {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>

<script lang="ts">
import Vue from "vue";

import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { CartItems } from "./models/CartItems";

const cartModule = namespace("cart");

@Component
export default class extends Vue {
  @cartModule.Action("fetchItems")
  // eslint-disable-next-line no-unused-vars
  fetchCartItems!: () => Promise<void>;

  @cartModule.State("items")
  cartItems!: CartItems;

  created() {
    this.fetchCartItems();
  }
}
</script>

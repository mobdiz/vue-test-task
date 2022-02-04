<template>
  <v-card tile class="product" :to="`/products/${product.id}`">
    <v-img aspect-ratio="1" :src="product.image" />

    <v-card-text>
      <div class="d-flex justify-space-between mb-2">
        <strong class="product__title primary--text">
          {{ product.title }}
        </strong>
        <div class="ml-4">
          {{ product.price | currency }}
        </div>
      </div>
      <div>
        {{ product.description }}
      </div>
    </v-card-text>

    <v-card-actions class="justify-center pa-4">
      <v-btn
        color="primary"
        tile
        @click.prevent="addToCart(product.id)"
        v-if="product.price && !isExistInCart"
      >
        Купить
      </v-btn>
      <v-btn color="primary" tile to="/cart" v-else-if="isExistInCart">
        В корзине
      </v-btn>
      <v-btn tile :to="`/products/${product.id}`"> Подробнее </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import * as names from "@/store/names";

import { Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { CartItems } from "@/models/CartItems";
import { Product } from "@/models/Product";

const cartModule = namespace("cart");

@Component
export default class ProductCard extends Vue {
  @Prop({ type: Object, required: true }) product!: Product;

  @cartModule.Action(names.CART_ACTION_ADD_ITEM)
  addToCart!: (id: string) => Promise<void>;

  @cartModule.State(names.CART_STATE_ITEMS)
  cartItems!: CartItems;

  get isExistInCart() {
    return this.product && this.cartItems[this.product.id];
  }
}
</script>

<style lang="scss" scoped>
.product {
  &__title {
    font-size: 16px;
  }
}
</style>

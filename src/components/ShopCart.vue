<template>
  <div class="cart">
    <div class="subtitle mb-10">Продуктов: {{ cartItems.count }}</div>

    <v-card
      tile
      v-for="product in products"
      :key="product.item.id"
      class="mb-7"
    >
      <v-row align="center" class="mx-0">
        <v-col cols="3" md="2">
          <router-link :to="`/products/${product.item.id}`">
            <v-img :aspect-ratio="16 / 10" :src="product.item.image" />
          </router-link>
        </v-col>

        <v-col cols="9" md="6">
          <v-card-title class="pt-0 px-0">
            <router-link
              :to="`/products/${product.item.id}`"
              class="link-to-product"
            >
              {{ product.item.title }}
            </router-link>
          </v-card-title>

          <v-card-subtitle class="pb-0 px-0">
            {{ product.item.description }}
          </v-card-subtitle>

          <p class="mb-0">
            <strong>{{ product.item.price | currency }}</strong>
          </p>
        </v-col>

        <v-col cols="12" md="4" class="py-6">
          <div
            class="d-flex justify-center justify-md-end flex-wrap align-center"
          >
            <v-btn
              class="mx-2"
              icon
              @click.prevent="
                () => {
                  updateItemQuantity({
                    id: product.item.id,
                    quantity: product.count - 1,
                  });
                }
              "
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              hide-details
              solo
              class="quanitity-field"
              single-line
              dense
              type="number"
              :min="1"
              :max="100"
              :value="product.count"
              @click.stop.prevent="() => {}"
              @input="
                ($event) => {
                  updateItemQuantity({
                    id: product.item.id,
                    quantity: Number($event),
                  });
                }
              "
            />
            <v-btn
              class="mx-2"
              icon
              @click.prevent="
                () => {
                  updateItemQuantity({
                    id: product.item.id,
                    quantity: product.count + 1,
                  });
                }
              "
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              icon
              danger
              @click.prevent="
                () => {
                  updateItemQuantity({
                    id: product.item.id,
                    quantity: 0,
                  });
                }
              "
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="mt-10 text-right">
      <strong>Итого: {{ cartItems.sum | currency }}</strong>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import {
  ComputedCartItem,
  ComputedCartItems,
} from "@/models/ComputedCartItems";

import { UpdateQuantityPayload } from "@/store/cart/types";

const cartModule = namespace("cart");

@Component
export default class Shopcart extends Vue {
  @cartModule.Getter("computedItems")
  cartItems!: ComputedCartItems;

  @cartModule.Action("updateQuantity")
  updateItemQuantity!: UpdateQuantityPayload;

  get products(): ComputedCartItem[] {
    return this.cartItems.items;
  }
}
</script>

<style lang="scss" scoped>
.quanitity-field {
  max-width: 80px;
}

.link-to-product {
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
}
</style>

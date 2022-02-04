<template>
  <div>
    <v-container>
      <v-breadcrumbs :items="breadcrumbs" class="px-0 pt-0" />

      <div v-if="isLoading" class="d-flex align-center justify-center">
        <v-progress-circular indeterminate color="primary" />
      </div>

      <v-card tile v-else-if="product">
        <v-row class="ma-0">
          <v-col cols="12" md="6" class="mb-4 mb-md-0">
            <v-img :src="product.image" />
          </v-col>
          <v-col cols="12" md="6">
            <h1 class="mb-4">
              {{ product.title }}
            </h1>
            <p class="subtitle">{{ product.description }}</p>
            <div v-html="product.content" />
            <p>
              <strong>{{ product.price | currency }}</strong>
            </p>
            <v-btn
              color="primary"
              v-if="!isExistInCart"
              @click="addToCart(product.id)"
            >
              Добавить в корзину
            </v-btn>
            <v-btn color="primary" v-if="isExistInCart" to="/cart">
              Перейти в корзину
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

      <v-alert v-else outlined type="info"> Продукт не найден </v-alert>
    </v-container>
  </div>
</template>

<script lang="ts">
import { CartItems } from "@/models/CartItems";
import { Product } from "@/models/Product";
import Vue from "vue";

import { Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const productsModule = namespace("products");
const cartModule = namespace("cart");

@Component
export default class ProductPage extends Vue {
  @productsModule.Action("fetchProduct")
  fetchProduct!: (id: string) => void;

  @productsModule.State("item")
  product!: Product;

  @productsModule.State("isItemLoading")
  isLoading!: boolean;

  @cartModule.State("items")
  cartItems!: CartItems;

  @cartModule.Action("addItem")
  addToCart!: (id: string) => Promise<void>;

  created() {
    this.fetchProduct(this.$route.params.id);
  }

  get isExistInCart() {
    return this.product && this.cartItems[this.product.id];
  }

  get breadcrumbs() {
    const items = [
      {
        text: "Программы НМО",
        disabled: false,
        href: "/",
      },
    ];

    if (this.isLoading) {
      items.push({
        text: "Продукт ...",
        disabled: true,
        href: `#`,
      });
    } else if (this.product) {
      items.push({
        text: this.product.title,
        disabled: true,
        href: `/products/${this.product.id}`,
      });
    } else {
      items.push({
        text: "Продукт не найден",
        disabled: true,
        href: this.$route.fullPath,
      });
    }

    return items;
  }

  @Watch("product", { immediate: true })
  onUpdateProduct(product: Product) {
    document.title = product?.title || "Продукт";
  }
}
</script>

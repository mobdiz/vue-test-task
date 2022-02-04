<template>
  <div class="products-list">
    <div v-if="isLoading" class="d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-row v-else-if="products.length">
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="product of products"
        :key="product.id"
      >
        <product-card :product="product" />
      </v-col>
    </v-row>

    <v-alert v-else outlined type="info">
      Продукты не найдены. Измените параметры фильтра
    </v-alert>

    <div class="text-center mt-8" v-if="isShowedPagination">
      <v-pagination :value="pageNum" :length="pageCount" @input="goToPage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

import * as names from "@/store/names";

import { Product } from "@/models/Product";

import { FetchListPayload } from "@/store/products/types";

const productsModule = namespace("products");

@Component({
  components: {
    ProductCard: () => import("@/components/ProductCard.vue"),
  },
})
export default class ProductList extends Vue {
  @productsModule.State(names.PRODUCTS_STATE_ITEMS)
  products!: Product[];

  @productsModule.State(names.PRODUCTS_STATE_IS_ITEMS_LOADING)
  isLoading!: boolean;

  @productsModule.State(names.PRODUCTS_STATE_PAGE_COUNT)
  pageCount!: number;

  @productsModule.Action("fetchProducts")
  fetchProducts!: (payload?: FetchListPayload) => void;

  get pageNum(): number {
    return this.$route.query.pageNum ? Number(this.$route.query.pageNum) : 1;
  }

  get isShowedPagination() {
    return this.products.length && !this.isLoading && this.pageCount > 1;
  }

  goToPage(pageNum: number) {
    const query: Record<string, string> = {};

    if (!pageNum || pageNum === 1) {
      delete query.pageNum;
    } else {
      query.pageNum = String(pageNum);
    }

    this.$router.push({ query });
  }
}
</script>

<template>
  <v-container>
    <v-row align-scratch>
      <v-col cols="12" sm="5" md="4" lg="3" class="sidebar-wrapper">
        <app-sidebar class="sidebar" />
      </v-col>
      <v-col cols="12" sm="7" md="8" lg="9">
        <products-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import * as names from "@/store/names";

import { FetchListPayload } from "@/store/products/types";

const productsModule = namespace("products");
const categoriesModule = namespace("categories");

@Component({
  components: {
    ProductsList: () => import("@/components/ProductsList.vue"),
    AppSidebar: () => import("@/components/AppSidebar.vue"),
  },
})
export default class ProductssListPage extends Vue {
  @productsModule.Action(names.PRODUCTS_ACTION_FETCH_PRODUCTS)
  fetchProducts!: (payload?: FetchListPayload) => Promise<void>;

  @categoriesModule.Action(names.CATEGORIES_ACTION_FETCH_ITEMS)
  fetchCategories!: () => Promise<void>;

  @Watch("$route.query", { immediate: true })
  onUpdateQueryParams(params: Record<string, string>) {
    this.fetchProducts({
      search: params.search,
      category: params.category,
      pageNum: params.pageNum ? Number(params.pageNum) : undefined,
    });
  }

  created() {
    this.fetchCategories();
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: relative;
}

.sidebar {
  @media screen and (min-width: 600px) {
    position: sticky;
    top: 0;
    margin-top: -32px;
    padding: 32px 5px;
    margin-left: -5px;
    margin-right: -5px;
    max-height: 100vh;
    overflow: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>

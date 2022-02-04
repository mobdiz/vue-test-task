<template>
  <div class="sidebar">
    <products-search class="mb-5" />
    <categories-list />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    ProductsSearch: () => import("@/components/ProductsSearch.vue"),
    CategoriesList: () => import("@/components/CategoriesList.vue"),
  },
})
export default class AppSidevar extends Vue {}
</script>

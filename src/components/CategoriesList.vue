<template>
  <v-card tile :loading="isLoading">
    <v-card-title> Категории </v-card-title>
    <v-card-text>
      <v-list nav dense class="pa-0">
        <v-list-item-group v-model="selectedCategoryId" color="primary">
          <v-list-item
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
            :disabled="category.id === selectedCategoryId"
          >
            <v-list-item-content>
              <v-list-item-title>{{ category.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import * as names from "@/store/names";

import { Category } from "@/models/Category";

const categoriesModule = namespace("categories");

@Component
export default class CategoriesList extends Vue {
  selectedCategoryId: string = this.$route.query.category?.toString() || "";

  get queryParams() {
    return this.$route.query ? { ...this.$route.query } : {};
  }

  @categoriesModule.State(names.CATEGORIES_STATE_ITEMS)
  categories!: Category[];

  @categoriesModule.State(names.CATEGORIES_STATE_ITEMS_LOADING)
  isLoading!: Category[];

  @Watch("selectedCategoryId")
  onUpdateSelectedCategoryId(id: string) {
    const query = { ...this.queryParams };

    delete query.pageNum;

    if (id) {
      query.category = id;
    } else {
      delete query.category;
    }

    this.$router.push({ query });
  }
}
</script>

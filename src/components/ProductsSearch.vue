<template>
  <v-card tile>
    <cart-button />
    <v-card-title>Программы НМО</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field
          small
          v-model="searchString"
          required
          outlined
          dense
          hide-details
          clearable
          label="Поиск"
          append-icon="mdi-magnify"
          @click:append="submit"
          @click:clear="clear"
        />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { Component } from "vue-property-decorator";

@Component({
  components: {
    CartButton: () => import("@/components/CartButton.vue"),
  },
})
export default class ProductsSearch extends Vue {
  searchString: string = this.$route.query.search?.toString() || "";

  get queryParams() {
    return this.$route.query ? { ...this.$route.query } : {};
  }

  submit() {
    const query = { ...this.queryParams };

    delete query.pageNum;

    if (this.searchString) {
      query.search = this.searchString;
    } else {
      delete query.search;
    }

    this.$router.push({
      query,
    });
  }

  clear() {
    const query = { ...this.queryParams };

    delete query.pageNum;
    delete query.search;

    this.$router.push({
      query,
    });
  }
}
</script>

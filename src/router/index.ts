import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("@/pages/ProductsListPage.vue"),
    name: "products",
    meta: {
      title: "Программы НМО",
    },
  },
  {
    path: "/cart",
    component: () => import("@/pages/CartPage.vue"),
    name: "cart",
    meta: {
      title: "Корзина",
    },
  },
  {
    path: "/products/:id",
    name: "product",
    component: () => import("@/pages/ProductPage.vue"),
  },
  {
    path: "/products",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    const isProductsPagePrev = from.name === "products";

    const isProductsPageNow = to.name === "products";
    const isProductPageNow = to.name === "product";
    const isCartPageNow = to.name === "cart";

    const isChangeQueryParams =
      JSON.stringify(to.query) !== JSON.stringify(from.query);

    const isChangeProductsParams =
      isProductsPagePrev && isProductsPageNow && isChangeQueryParams;

    if (isProductPageNow || isCartPageNow || isChangeProductsParams) {
      return { x: 0, y: 0 };
    }

    return savedPosition;
  },
});

router.beforeEach((to, _, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;

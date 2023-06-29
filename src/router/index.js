import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    { name: "home", path: "/", component: HomePage },
    {
      name: "about",
      path: "/about",
      component: () => import("../components/RecipesView.vue"),
    },
    {
      name: "recipe",
      path: "/recipe/:name",
      component: () => import("../components/SingleRecipe.vue"),
    },
  ],
});
export default router;

import NProgress from "nprogress";
import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/post/:number",
    name: "Post",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  base: "/vue-issue-blog",
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;

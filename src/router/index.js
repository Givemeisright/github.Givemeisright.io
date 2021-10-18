import NProgress from "nprogress";
import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dist",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/dist/about",
    name: "About",
    component: About,
  },
  {
    path: "/dist/post/:number",
    name: "Post",
    component: Post,
  },
  {
    path: "*",
    redirect: "/dist",
  },
];

const router = new VueRouter({
  base: "/github.Givemeisright.io",
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

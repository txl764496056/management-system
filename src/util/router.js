import Vue from "vue";
import Router from "vue-router";
import Main from "../views/Main.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/Login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Login.vue")
    },
    {
      path: "/",
      // name: 'index',//当某个路由有子集路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性。
      component: Main,
      children: [
        {
          path: "/",
          name: "控制台",
          component: () => import("../views/Main/Home.vue")
        },
        {
          path: "/business/list",
          name: "企业账号列表",
          component: () => import("../views/Main/Business/List.vue")
        },
        {
          path: "/business/verification",
          name: "账号申请与审核",
          component: () => import("../views/Main/Business/Verification.vue")
        }
      ]
    }
  ]
});

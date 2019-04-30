import Vue from "vue";
import App from "./App.vue";
import router from "./util/router";
import store from "./util/store";
import "./util/registerServiceWorker";
import vueBlue from "vue-blu";
import "vue-blu/dist/css/vue-blu.min.css";
import Cookie from "js-cookie";

import { accountApi } from "./config/api";
Vue.prototype.accountApi = accountApi;

Vue.use(vueBlue);

Vue.config.productionTip = false;

/**
 * store 中 history
 */
let history = Cookie.getJSON("history");
if (history) {
  for (let i = 0; i < history.name.length; i++) {
    store.commit("addHistory", {
      name: history.name[i],
      path: history.path[i]
    });
  }
}

/**
 * router 页面跳转一次，都会执行一次 router.beforeEach  router.afterEach
 * 注意一些数据清空，或者恢复默认值
 */

/**
 * 进入路由之前
 */
router.beforeEach((to, from, next) => {
  let token = accountApi.getToken();
  // 1、有token
  if (token) {
    //IF1

    if (store.state.admin.id > 0) {
      //页面没刷新

      // IF3
      if (to.path != "/login") {
        //用户首次进入的是非登录页
        next();
      } else {
        next(store.state.login_redirect); //用户首次进入的是登录，登录完成后，跳转至首页（login_direct默认是首页地址）
      } //IF3-END
    } else {
      //页面刷新后，状态恢复默认值
      // 获取用户信息
      accountApi
        .getUserInfo()
        .then(res => {
          store.commit("setAdmin", res.admin);
          accountApi.setToken(res.admin.token);
          if (to.path !== "/login") {
            next();
          } else {
            next(store.state.login_redirect);
          }
        })
        .catch(error => {
          accountApi.loginOut(); //退出登录（清除cookie即可）
          if (to.path != "/login") {
            store.commit("LoginRediret", to.path);
            next("/login");
          } else {
            next();
          }
        });
    }

    //2、无token
    // IF2
  } else if (to.path !== "/login") {
    //打开的非登录页面
    store.commit("LoginRediret", to.path); //保存用户进站时的路径，等待用户登录完成跳转至进站的页面
    next("/login");
  } else {
    //打开的是登录页面
    next();
  } //IF1-END IF2-END
});

/**
 * 进入路由后
 */
router.afterEach(to => {
  if (to.path === "/login") {
    store.commit("emptyHistory"); //先清空，否则会出现，页面跳转一次，调用一次addHistory，加一个对象,就会出现多个“控制台”
    Cookie.remove("history");
    store.commit("addHistory", { name: "控制台", path: "/" });
  } else {
    store.commit("addHistory", { name: to.name, path: to.path });
    Cookie.set("history", store.state.history);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

"use strict";
import Cookie from "js-cookie";
import axios from "axios";
import qs from "qs";
import { auth, LOCAL_API } from "./dev.env";

import router from "../util/router";
import store from "../util/store";

let axios_1 = axios.create({
  // baseURL:LOCAL_API.BASE_API1, //json-server模拟
  baseURL: LOCAL_API.BASE_API2, //真实服务器
  headers: { "X-Data-Type": "json" },
  responseType: "json"
});

/**
 * 请求设置，发送请求前执行的最后一个过程
 * post请求时，服务器先接收header头信息，再来决定要不要接收请求体
 * 请求头里携带token，可以提前服务器验证，接口访问就不用带token了
 */
axios_1.interceptors.request.use(
  function(config) {
    let token = Cookie.get(auth.cookie_key);
    if (token) {
      config.headers.common["Authorization"] = auth.token_type + " " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应设置,接收到响应后执行的第一个过程
axios_1.interceptors.response.use(
  function(response) {
    return response.data.result;
  },
  function(error) {
    // 状态403表示用户登录信息已过期
    if (error.response.data.code === 403) {
      Cookie.remove(auth.cookie_key);
      let path = router.history.current.path;
      store.commit("LoginRediret", path);
      router.push("/login");
      // 过期提示
      // router.app.$notify.danger({content:error.response.data.msg});
    }
    return Promise.reject(error.response.data);
  }
);

const axios_instance = {
  get(url, params, config) {
    if (params) {
      url =
        url +
        (url.indexOf("?") < 0 ? "?" : "&") +
        qs.stringify(params, { arrayFormat: "brackets" });
      return axios_1.get(url, config);
    }
  }
};

export const accountApi = {
  getToken: () => Cookie.get(auth.cookie_key),
  setToken: key => Cookie.set(auth.cookie_key, key),
  login: (username, password) => axios_1.post("/login", { username, password }),
  loginOut: () => Cookie.remove(auth.cookie_key),
  getUserInfo: () => axios_1.get("/login")
};

export const businessApi = {
  list: ({ keyword, status, page, size }) =>
    axios_instance.get("/business/search", { keyword, status, page, size })
};

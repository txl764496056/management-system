import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: {
      //用户信息
      id: "",
      username: "",
      token: ""
    },
    login_redirect: "/", //用户进入站内时的路径（默认是首页）
    history: {
      name: [],
      path: []
    },
    current: {
      index: null,
      name: "控制台"
    }
  },
  mutations: {
    LoginRediret(state, path) {
      state.login_redirect = path;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    addHistory(state, { name, path }) {
      let index = state.history.name.indexOf(name);
      let len = state.history.name.length;
      if (index === -1) {
        state.history.name.push(name);
        state.history.path.push(path);
        index = len;
      }
      state.current = { name, index };
    },
    delHistory(state, name) {
      let index = state.history.name.indexOf(name);
      if (index !== -1) {
        state.history.name.splice(index, 1);
        state.history.path.splice(index, 1);
      }
    },
    emptyHistory(state) {
      state.history.name = [];
      state.history.path = [];
    }
  },
  actions: {}
});

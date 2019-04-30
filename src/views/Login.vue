<template>
  <div>
    <div class="login">
      <span>txl--登陆到后台</span>
      <div>
        <input
          type="text"
          v-model="username"
          @keyup.enter="login"
          placeholder="输入用户名"
        />
        <input
          type="password"
          v-model="password"
          @keyup.enter="login"
          placeholder="输入登陆密码"
        />
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {},
  computed: {
    ...mapState(["login_redirect"])
  },
  methods: {
    login() {
      this.accountApi
        .login(this.username, this.password)
        .then(res => {
          let admin = res.admin;
          this.$store.commit("setAdmin", admin); //保存登录用户信息
          this.accountApi.setToken(res.admin.token);
          //将路由当前路径改为用户首次打开页面的路径(实现用户登录成功跳转至用户首次打开的页面)
          this.$router.push(this.login_redirect);
        })
        .catch(error => {
          this.$notify.danger({ content: error.msg });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 420px;
  padding: 40px;
  background: #fff;
  font-size: 14px;
  margin: 120px auto 0;
  position: relative;
  span {
    background: rgb(24, 159, 146);
    color: #fff;
    display: block;
    line-height: 55px;
    padding-left: 60px;
    margin-left: -58px;
    position: relative;
    margin-bottom: 30px;
    &::after {
      content: "";
      display: block;
      height: 10px;
      border-right: 18px solid #000;
      border-bottom: 10px solid transparent;
      position: absolute;
      left: 0;
    }
  }
  input {
    display: block;
    border: 1px solid rgb(220, 222, 224);
    line-height: 48px;
    padding: 0 16px;
    font-size: 12px;
    width: 100%;
    margin-bottom: 15px;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    &:focus {
      border-width: 1px;
      border-style: solid;
      border-color: rgb(24, 159, 146);
      border-radius: 3px;
      outline: none;
    }
  }
  button {
    display: block;
    background: rgb(24, 159, 146);
    color: #fff;
    border: 0;
    line-height: 48px;
    width: 100%;
    cursor: pointer;
  }
}
</style>

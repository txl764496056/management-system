<template>
  <div class="main">
    <header>
      <div class="company">Admin</div>
      <div>
        <a><i class="fa fa-user-circle"></i> {{ admin.username }}</a>
        <a><i class="fa fa-key"></i> 修改密码</a>
        <a><i class="fa fa-sign-out"></i> 退出登录</a>
      </div>
    </header>
    <nav>
      <menus>
        <menu-item icon="briefcase">
          <span>企业管理</span>
          <menus slot="sub">
            <menu-item
              to="/business/list"
              :is-active="$route.path === '/business/list'"
              >企业账号列表</menu-item
            >
            <menu-item
              to="/business/verification"
              :is-active="$route.path === '/business/verification'"
              >账号申请与审核</menu-item
            >
            <menu-item>账号活动日志</menu-item>
          </menus>
        </menu-item>
        <menu-item icon="trademark">
          <span>品牌管理</span>
          <menus slot="sub">
            <menu-item>品牌列表</menu-item>
          </menus>
        </menu-item>
      </menus>
    </nav>
    <section>
      <span v-for="(name, index) in history.name" :key="index">
        <router-link :to="history.path[index]">{{ name }}</router-link>
        <i
          class="fa fa-close"
          v-show="name !== '控制台'"
          @click="closeTab(name)"
        ></i>
      </span>
    </section>
    <router-view id="content" />
    <footer>Copyright ©2017 x-admin v2.3 All Rights Reserved</footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Main",
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState(["history", "admin", "current"])
  },
  methods: {
    closeTab(name) {
      if (name === this.current.name) {
        this.$router.push(this.history.path[this.current.index - 1]);
      }
      this.$store.commit("delHistory", name);
    }
  }
};
</script>

<style lang="scss">
.main {
  &,
  .pagination,
  .select select,
  .input,
  .textarea,
  .button {
    font-size: 12px;
  }
  .table-toolbar h1 {
    line-height: 32px;
    font-size: 16px;
  }
  &,
  & > header,
  & > nav,
  & > footer,
  & > section,
  & > #content {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  & > header {
    display: flex;
    justify-content: space-between;
    bottom: auto;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: #222;
    color: #fff;
    padding: 0 10px;
    // .company {
    //     font-size: 18px;
    //     margin: 0 10px;
    //     height: 100%;
    //     width: 200px;
    // }
    // .at-btn--text {
    //     color: #aaa;
    //     &:hover {
    //         color: #fff;
    //     }
    // }
    // a {
    //     display: inline-block;
    //     margin: 0 10px;
    //     cursor: pointer;
    //     color: #aaa;
    //     &:hover {
    //         color: #fff;
    //     }
    // }
  }
  & > nav {
    right: auto;
    top: 46px;
    bottom: 41px;
    width: 220px;
    background: #eee;
    border-right: 1px solid #e5e5e5;
    // a {
    //     border-left: 4px solid transparent;
    //     opacity: 1;
    //     &:hover {
    //         color: #009688;
    //     }
    // }
    // a.router-link-exact-active.router-link-active, .router-link-exact-active-sup a {
    //     background: #009688;
    //     color: #fff;
    //     border-color: #04564e;
    // }
  }
  & > section {
    top: 46px;
    bottom: auto;
    height: 35px;
    border-bottom: 1px solid #e6e6e6;
    left: 220px;
    background: rgb(239, 238, 240);
    line-height: 35px;
    span {
      display: inline-block;
      a,
      i {
        padding: 0 10px;
        color: #000;
        cursor: pointer;
      }
      a.router-link-exact-active,
      a.router-link-exact-active + i {
        display: inline-block;
        background: #fff;
      }
    }
  }
  & > footer {
    top: auto;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    background: #222;
    color: #fff;
    padding: 0 10px;
  }
  & > #content {
    top: 81px;
    bottom: 41px;
    left: 220px;
    background: #fff;
    padding: 15px;
  }
  .pagination .select {
    margin-right: 0;
  }
}
.content-none {
  text-align: center;
  font-size: 16px;
  color: #999;
  letter-spacing: 1px;
  margin: 50px 0;
}
</style>

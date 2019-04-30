<template>
  <div>
    <data-table :data="list">
      <table-toolbar>
        <div slot="left">
          <h1 class="control has-addons">企业账号列表</h1>
          <div class="control has-addons">
            <span class="select">
              <select v-model="queryData.status" @change="listData()">
                <option value="0">全部</option>
                <option value="1">常规</option>
                <option value="2">认证</option>
                <option value="9">禁用</option>
              </select>
            </span>
            <input
              class="input"
              type="text"
              v-model="queryData.keyword"
              @keyup.enter="listData()"
              placeholder="关键字"
            />
            <a class="button"
              ><i class="fa fa-search" @click="listData()"></i
            ></a>
            <a class="button"><i class="fa fa-trash-o"></i></a>
          </div>
        </div>
        <div class="right" slot="right">
          <p class="control has-addons">
            <a class="button"><i class="fa fa-plus"></i> &nbsp; 新增</a>
            <a class="button"><i class="fa fa-minus"></i> &nbsp; 删除</a>
            <a class="button"><i class="fa fa-check"></i> &nbsp; 启用</a>
            <a class="button"><i class="fa fa-remove"></i> &nbsp; 禁用</a>
          </p>
          <pagination
            :total="total"
            :page-size="size"
            :size-options="[15, 30, 50]"
            layout="total,pager"
          ></pagination>
        </div>
      </table-toolbar>
      <column label="账户名" field="username"></column>
      <column label="企业名称" field="business_name"></column>
      <column label="代表人姓名" field="legal_person"></column>
      <column label="代表人电话" field="phone"></column>
      <column label="状态">
        <!-- slot-scope 代替 scope ，否则会有关于scope/slot-scope警告-->
        <template slot-scope="row">
          <span v-show="row.status == '1'">常规</span>
          <span v-show="row.status == '2'">认证</span>
          <span v-show="row.status == '9'">禁用</span>
        </template>
      </column>
      <column label="入驻时间" field="created_time"></column>
      <column label="操作" field="created_time"></column>
    </data-table>
  </div>
</template>

<script>
import { businessApi } from "@/config/api";
export default {
  name: "List",
  data() {
    let queryData = this.$route.query;
    return {
      size: 20,
      list: [],
      total: 0,
      queryData: {
        keyword: (queryData.keyword || "") + "",
        status: parseInt(queryData.status || 0),
        page: parseInt(queryData.page || 1)
      }
    };
  },
  mounted() {
    this.listData();
  },
  methods: {
    listData() {
      businessApi
        .list({ ...this.queryData, size: this.size })
        .then(res => {
          this.list = res.list;
          this.total = res.total;
        })
        .catch(err => {
          console.log(err, "企业账号列表");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.right p.control {
  justify-content: flex-end;
}
</style>

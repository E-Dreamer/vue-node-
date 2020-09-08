<style lang="less" scoped>
.cBreadcrumb {
  background: #fff;
  padding: 10px 0;
  padding-left: 10px;

  /deep/ .el-breadcrumb__inner {
    font-size: 13px;
  }
}
</style>

<template>
  <div class="cBreadcrumb">
    <el-breadcrumb separator="/">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.getBreadcrumb();
        // this.getBreadcrumbTwo();
      }
    }
  },
  methods: {
    // 这是根据路由信息获取对应的meta里面的title 但是有缺陷
    isHome(route) {
      return route.name === "index";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      matched.shift();
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    }

    // 下面我们通过拿到当前的路由信息 再根据保存的路由比较 获取
    // getBreadcrumbTwo(){
    //   console.log(this.$route);
    // }
  },
  created() {
    this.getBreadcrumb();
  },
  mounted() {}
};
</script>

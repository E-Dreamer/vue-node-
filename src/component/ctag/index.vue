<style lang="less" scoped>
.tag {
  background: white;
  text-align: left;
  margin-bottom: 10px;
  line-height: 40px;
  padding-left: 10px;
}
.taglist {
  margin-right: 10px;
  cursor: pointer;
}
</style>

<template>
  <div class="tag">
    <el-tag
      class="taglist"
      v-for="(item,index) in tag"
      :key="item.id"
      :size="$store.state.screenWidth"
      :closable="item.title !== '首页'"
      :disable-transitions="false"
      @close="handleClose(item, index)"
      @click="changeMenu(item)"
      :effect="$route.name === item.path ? 'dark' : 'plain'"
    >{{item.title}}</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    tag() {
      return this.$store.state.tag;
    },
  },
  methods: {
    changeMenu(item) {
      this.$router.push(item.path);
    },
    handleClose(item, index) {
      let length = this.tag.length - 1;
      this.$store.commit("closeTag", item);
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (item.path !== this.$route.name) {
        return;
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push({ path: this.tag[index - 1].path });
      } else {
        // 否则往右边跳转
        this.$router.push({ path: this.tag[index].path });
      }
    },
  },
  created() {},
};
</script>
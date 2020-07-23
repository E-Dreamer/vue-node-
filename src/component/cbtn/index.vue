<style lang="less" scoped>
.btn {
  padding: 0 20px;
}
</style>

<template>
  <div class="btn">
    <!-- plain -->
    <el-button
      v-for="(item,index) in btn"
      :key="index"
      :size="$store.state.screenWidth"
      :icon="item.icon"
      :round="item.round"
      :type="item.type"
      :disabled='item.disabled'
      @click="$emit('btnclick',item)"
    >{{item.title}}</el-button>
  </div>
</template>


<script>
export default {
  props: {
    btn: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods:{
  },
  created(){
  },
  mounted(){}
};
</script>
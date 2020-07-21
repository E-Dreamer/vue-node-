<style lang="less" scoped>
.form {
  padding: 20px;
}
</style>

<template>
  <div class="form">
    <el-form :inline="true" :model="form" class="demo-form-inline" rules="rules" :ref="Formname">
      <div v-for="(item,index) in FormData" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" v-if="item.style == 'input'">
          <el-input :size="$store.state.screenWidth" v-model="ruleForm[item.prop]" :placeholder="item.plac"></el-input>
        </el-form-item>
      </div>
      <slot name="footer" :Formname='Formname'></slot>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    FormData: {
      type: Array
    },
    ruleForm: {
      type: Object
    },
    Formname:{
        type:String
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
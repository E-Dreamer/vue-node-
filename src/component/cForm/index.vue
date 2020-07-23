<style lang="less" scoped>
.form {
  padding: 20px 20px 10px;
}
.formline {
  display: flex;
}
.formstand {
  /deep/.el-form-item {
    width: 100%;
    text-align: left;
  }
}
.btn {
  vertical-align: middle;
}
/deep/.el-form-item {
  margin-bottom:8px;
}
</style>

<template>
  <div :class="Indrawer ? '':'form'">
    <el-form
      :inline="true"
      :model="ruleForm"
      :class="Indrawer ? 'formstand':'formline'"
      :rules="rules"
      :ref="Formname"
      @submit.native.prevent
      :label-width="Indrawer ? '120px':'auto'"
    >
      <div v-for="(item,index) in FormData" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" v-if="item.style == 'input'">
          <el-input
            :size="$store.state.screenWidth"
            v-model="ruleForm[item.prop]"
            :placeholder="item.plac"
            clearable
            @change="inputChange"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <slot name="footer" :Formname="Formname"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    FormData: {
      type: Array,
    },
    ruleForm: {
      type: Object,
    },
    Formname: {
      type: String,
    },
    rules: { type: Object },
    self: { type: Object },
    Indrawer: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  methods: {
    // 输入框回车事件
    inputChange() {},
  },
  created() {},
  mounted() {},
};
</script>
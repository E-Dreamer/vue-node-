<style lang="less" scoped>
/deep/.el-drawer__header {
  text-align: left;
  font-size: 14px;
  font-weight: 700;
}
</style>

<template>
  <div v-if="drawer">
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="30%"
      v-loading="darwerlogin"
    >
      <cform
        :ruleForm="options.ruleForm"
        :FormData="options.FormData"
        :Formname="options.Formname"
        :Indrawer="true"
        :ref="options.ref"
      ></cform>
      <el-button
        type="primary"
        :size="$store.state.screenWidth"
        @click="cancel(options.Formname)"
      >确认</el-button>
      <el-button type="warning" :size="$store.state.screenWidth" @click="reset(options.Formname)">重置</el-button>
    </el-drawer>
  </div>
</template>

<script>
import md5 from 'md5'
import cform from "../cForm/index";
export default {
  components: { cform },
  data() {
    return {
      drawer: false,
      title: "",
      url: "",
      options: {},
      ruleForm: {},
      darwerlogin: false,
    };
  },
  watch: {
    "options.ruleForm": {
      deep: true,
      handler(newv, oldv) {
        this.ruleForm = newv;
      },
    },
  },
  methods: {
    handleClose() {
      var that = this;
      for (let k in this.ruleForm) {
        if (this.ruleForm[k] !== "") {
          this.$tool
            .Confirm("warning", "您修改了信息，是否要保存修改的信息？")
            .then(() => {
              that.cancel(this.options.Formname);
            })
            .catch(() => {
              that.drawer = false;
            });
          return;
        } else {
          that.drawer = false;
        }
      }
      // this.reset(this.options.Formname);
    },
    cancel(formName) {
      this.$refs[this.options.ref].$refs[formName].validate((valid) => {
        if (valid) {
          if(this.title == '新增人员页面'){
            this.ruleForm.passWord = md5(this.ruleForm.passWord)
          }
          this.$ajax.post(this.url, this.ruleForm).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs[this.options.ref].$refs[formName].resetFields();
      this.options.FormData.forEach((item) => {
        //如果是输入框的 直接将属性值赋值为空
        if (item.style === "input" && this.ruleForm.hasOwnProperty(item.prop)) {
          this.ruleForm[item.prop] = "";
        } else if (item.style === "select") {
          //如果是下拉 有两种情况 第一种接口中没有字典数对应的名称 第二种是存在字典数对应的名称(做了判断了就不弄了)
          if (this.ruleForm.hasOwnProperty(item.prop)) {
            this.ruleForm[item.prop] = "";
          }
        }
      });
    },
  },
  created() {},
  mounted() {
    this.$bus.off("opendarwer");
    this.$bus.on("opendarwer", (options, title, url) => {
      // 复制一份 这样修改的就是复制出来的 对象
      let copyoptions = JSON.parse(JSON.stringify(options));
      this.options = copyoptions;
      this.title = title;
      this.url = url;
      this.drawer = true;
    });
  },
};
</script>
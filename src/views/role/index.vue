<style lang="less" scoped>
</style>

<template>
  <div class="role c_div c_flex">
    <cForm :FormData="FormData" :ruleForm="ruleForm" :Formname="Formname" ref="cform" :self="this">
      <template slot="footer" slot-scope="scope">
        <el-button type="primary" @click="submit(scope.Formname)" size="small">查询</el-button>
        <el-button @click="reset(scope.Formname)" size="small">重置</el-button>
      </template>
    </cForm>
    <cbtn :btn="btn" @btnclick="handlebtnClick"></cbtn>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="table"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        align='center'
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import cForm from "../../component/cForm/index";
import cbtn from "../../component/cbtn/index";
export default {
  components: { cForm, cbtn },
  data() {
    return {
      FormData: [
        {
          style: "input",
          label: "角色名",
          prop: "roleName",
          plac: "请输入角色名",
        },
      ],
      ruleForm: {
        roleName: "",
      },
      Formname: "Formname",
      btn: [
        {
          title: "新增角色",
          icon: "el-icon-plus",
          type: "primary",
          call: () => {
            this.add();
          },
        },
      ],
      tableData: [],
      tableHeader: [
        {
          prop: "roleName",
          label: "角色名",
        },
        {
          prop: "roleInfo",
          label: "说明",
        },
        {
          prop: "createTime",
          label: "创建时间",
        },
      ],
      loading: false,
      options: {
        Formname: "Formname",
        ref: "cfrom",
        FormData: [
          {
            style: "input",
            label: "角色名",
            prop: "roleName",
            plac: "请输入角色名",
          },
          {
            style: "input",
            label: "角色描述",
            prop: "roleInfo",
            plac: "请输入角色描述",
          },
        ],
        ruleForm: {
          roleName: "",
          roleInfo: "",
        },
      },
    };
  },
  methods: {
    submit(formName) {
      this.$refs["cform"].$refs[formName].validate((valid) => {
        if (valid) {
          this.getTableData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs["cform"].$refs[formName].resetFields();
      this.getTableData();
    },
    handlebtnClick(item) {
      item.call();
    },
    add() {
      this.$bus.emit(
        "opendarwer",
        this.options,
        "新增角色页面",
        this.$api.addrole
      );
    },
    getTableData() {
      this.loading = true;
      this.$ajax
        .post(this.$api.rolelist, { roleName: this.ruleForm.roleName })
        .then((res) => {
          this.tableData = res.result;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  created() {
      this.getTableData();
  },
};
</script>
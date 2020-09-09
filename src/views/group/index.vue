<style lang="less" scoped>
.box {
  text-align: left;
}
/deep/.el-table thead {
  background: #999 !important;
}
/deep/.el-table td {
  padding: 2px;
}

/deep/.el-table th {
  padding: 10px;
}
.form {
  padding: 15px 30px 10px 20px;
  background: #fff;
  margin-bottom: 10px;
}
.right {
  float: right;
}
.body {
  padding: 10px;
  background: #fff;
}
.deletebtn {
  margin-bottom: 10px;
}
.pagination {
  text-align: center;
}

.el-button--text {
    // color:'',
    font-size:12px,
}
</style>

<template>
  <div class="box" id='printBox'>
    
    <el-form inline :model="formInline" class="form" size="mini">
      <el-form-item
        v-for="(item, index) in form"
        :key="index"
        :label="item.label"
      >
        <el-input v-model="formInline[item.prop]"></el-input>
      </el-form-item>
      <el-form-item class="right">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="body">
      <el-button size="mini" class="deletebtn">删除</el-button>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" label="全选" width="100">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align='center'
        >
        </el-table-column>
        <el-table-column label="操作" width="300">
          <el-button type="text">查看</el-button>
          <el-button type="text">关联隐患</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
    <div>
      <label>这是普通input：</label>
      <input type="text" v-model="input">
    </div>
    <el-button v-print="'#printBox'">打印</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input:'',
      formInline: {
        category: "",
        organization: "",
        unit: ""
      },
      form: [
        {
          label: "检查类别",
          prop: "category"
        },
        {
          label: "组织人",
          prop: "organization"
        },
        {
          label: "被检查单位",
          prop: "unit"
        }
      ],
      tableHeader: [
        {
          label: "检查类别",
          prop: "category"
        },
        {
          label: "组织人",
          prop: "organization"
        },
        {
          label: "被检查单位",
          prop: "unit"
        },
        {
          label: "完成时间",
          prop: "date"
        }
      ],
      tableData: [
        {
          category: "随意",
          organization: "阿达撒",
          unit: "单位",
          date: "2020-09-08"
        },
        {
          category: "随意",
          organization: "阿达撒",
          unit: "单位",
          date: "2020-09-08"
        }
      ]
    };
  },
  methods: {
    onSubmit() {}
  },
  created() {}
};
</script>

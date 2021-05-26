<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-date-picker
            v-model="formData"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="mr10"
        >
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="doFilter" class="mr50">查询</el-button>
        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp"
                  @keyup.enter.native="doFilter"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="serial_number" label="序列号" class="el-table" align="center"></el-table-column>
        <el-table-column prop="device_id" label="设备ID" class="el-table" align="center"></el-table-column>
        <el-table-column prop="location_of_the_device" label="设备所在的位置" class="el-table"
                         align="center"></el-table-column>
        <el-table-column prop="device_start_date" label="设备开启日期" class="el-table" align="center"></el-table-column>
        <el-table-column prop="device_shutdown_date" label="设备关闭日期" class="el-table" align="center"></el-table-column>
        <el-table-column prop="device_activation_time" label="设备激活时间" class="el-table" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MaintenanceInformationSheet",
  data() {
    return {
      tableData:[],
      formData:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function () {
      axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_day").then(v => {
        let data = v.data;
        this.tableData = data.data
      })
    },
    doFilter:function (){
      console.log(this.formData[0])
      console.log(this.formData[1])
    }
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.mr10 {
  margin-right: 10px;
}
.mr50 {
  margin-right: 50px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>












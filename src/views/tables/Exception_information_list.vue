<template>
  <div>
    <div class="container">
      <div class="handle-box">
      <el-select placeholder="高级查询" class="handle-select mr10" @change="dateTypeSelectChange">
        <el-option value="1" label="按日查询"></el-option>
        <el-option value="2" label="按周查询"></el-option>
        <el-option value="3" label="按月查询"></el-option>
        <el-option value=“4” label="按年查询"></el-option>
      </el-select>
        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp" @keyup.enter.native="doFilter"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="device_id" label="设备ID" class="el-table"  align="center"></el-table-column>
        <el-table-column prop="location_of_the_device" label="设备所在的位置" class="el-table"  align="center"></el-table-column>
        <el-table-column prop="information_feedback_after_pad_device_failure" label="Pad端异常信息" class="el-table" align="center"></el-table-column>
        <el-table-column prop="feedback_of_information_after_the_failure_of_smp" label="树莓派端异常信息" class="el-table"  align="center"></el-table-column>
        <el-table-column prop="device_shutdown_information_feedback_after_failure_window" label="windows端控件异常信息" class="el-table"  align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Listofabnormalinformation",
  data() {
    return {
      tableData:[],
      search_name:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    doFilter:function (){
      var fd = new FormData()
      fd.append("mydevice_id",this.search_name)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('http://47.94.80.231:8080/SLKJ/data/search_get_Exception_Information_List_Infos',fd,config).then(v => {
        console.log(v)
        let data = v.data;
        this.tableData = data.data
      })
    },
    getData: function () {
      axios.get("http://47.94.80.231:8080/SLKJ/data/get_Exception_Information_List_Infos").then(v => {
        let data = v.data;
        this.tableData = data.data
      })
    },
    dateTypeSelectChange: function (val) {
      if (val === "1") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Exception_Information_List_Infos_day").then(v => {
          let data=v.data;
          this.tableData=data.data
        })
      } else if (val === "2") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Exception_Information_List_Infos_week").then(v => {
          let data=v.data;
          this.tableData=data.data
        })
      } else if (val === "3") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Exception_Information_List_Infos_month").then(v => {
          let data=v.data;
          this.tableData=data.data
        })
      } else if (val === "4") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Exception_Information_List_Infos_year").then(v => {
          let data=v.data;
          this.tableData=data.data
        })
      }
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}
</style>
<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>
      </div>
      <el-table :data="tableData" border>
<!--        <el-table-column type="selection" class="el-table" width="90"></el-table-column>-->
        <el-table-column prop="device_id" label="设备ID" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="location_of_the_device" label="设备所在的位置" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_day" label="异常中断的次数(日) " class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_week" label="异常中断的次数(周)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_month" label="异常中断的次数(月)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_year" label="异常中断的次数(年)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_day" label="异常退出次数(日)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_week" label="异常退出次数(周)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_month" label="异常退出次数(月)" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_year" label="异常退出次数(年)" class="el-table" width="180" align="center"></el-table-column>
      </el-table>
    </div>
<!--    <el-pagination-->
<!--        :page-size="20"-->
<!--        :pager-count="11"-->
<!--        layout="prev, pager, next"-->
<!--        :total="1000">-->
<!--    </el-pagination>-->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "ExceptionInformationTable",
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
      axios.post('http://47.94.80.231:8080/SLKJ/data/search_get_Abnormal_Information_Statistics_Infos',fd,config).then(v => {
        console.log(v)
        let data = v.data;
        this.tableData = data.data
      })
    },
    getData: function () {
      axios.get("http://47.94.80.231:8080/SLKJ/data/get_Abnormal_Information_Statistics_Infos").then(v => {
        let data = v.data;
        this.tableData = data.data
      })
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.mr10 {
  margin-right: 10px;
}

</style>




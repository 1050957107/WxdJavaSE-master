<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <!--        <el-select v-model="value" placeholder="按日查询" class="handle-select mr10" @change="dateTypeSelectChange">-->
        <!--          <el-option-->
        <!--              v-for="item in options"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value">-->
        <!--          </el-option>-->
        <!--        </el-select>-->
        <!--        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp" @keyup.enter.native="doFilter"></el-input>-->
        <!--        <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>-->
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
        <el-button type="primary" icon="el-icon-search" @click="doSelect" class="mr50">按照时间查询</el-button>
        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp"
                  @keyup.enter.native="doSearch"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doSearch">按照ID搜索</el-button>
      </div>
        <el-table :data="(tableData|| '').slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
          <el-table-column prop="serial_number" label="序列号" class="el-table" align="center"></el-table-column>
          <el-table-column prop="device_id" label="设备ID" class="el-table" align="center"></el-table-column>
          <el-table-column prop="location_of_the_device" label="设备所在的位置" class="el-table"
                           align="center"></el-table-column>
          <el-table-column prop="device_start_date" label="设备开启日期" class="el-table" align="center"></el-table-column>
          <el-table-column prop="device_shutdown_date" label="设备关闭日期" class="el-table" align="center"></el-table-column>
          <el-table-column prop="device_activation_time" label="设备激活时间" class="el-table" align="center"></el-table-column>
        </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "BasicInformationTable",
  data() {
    return {
      // options: [
      //   {
      //     value: '1',
      //     label: '按日查询'
      //   },
      //   {
      //     value: '2',
      //     label: '按周查询'
      //   },
      //   {
      //     value: '3',
      //     label: '按月查询'
      //   },
      //   {
      //     value: '4',
      //     label: '按年查询'
      //   }
      // ],
      total:0,
      tableData: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      search_name:'',
      formData:[],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    doSearch: function () {
      const rLoading = this.openLoading()
      var fd = new FormData()
      fd.append("mydevice_id", this.search_name)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.search_name === "") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos").then(v => {
          rLoading.close()
          this.tableData = v.data.data
          this.total=this.tableData.length
        })
      } else {
        axios.post('http://47.94.80.231:8080/SLKJ/data/search_get_Basic_Information_Of_Equipment_Infos', fd, config).then(v => {
          rLoading.close()
          this.tableData = v.data.data
          if (v.data.code==201){
            this.total=0
            this.currentPage=1
          }else {
            this.total=this.tableData.length
          }
        })
      }
    },
    getData: function () {
      axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos").then(v => {
        this.tableData = v.data.data
        this.total=this.tableData.length
      })
    },
    doSelect: function () {
      const rLoading = this.openLoading()
      var fd = new FormData()
      fd.append("startTime", this.formData[0])
      fd.append("endTime", this.formData[1])
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_fromData', fd, config).then(v => {
        rLoading.close()
        this.tableData = v.data.data
        this.total=this.tableData.length
        if (v.data.code==201){
          this.total=0
          this.currentPage=1
        }else {
          this.tableData = v.data.data
          this.total=this.tableData.length
        }
      })
    },
    dateTypeSelectChange: function (val) {
      const rLoading = this.openLoading()
      if (val === "1") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_day").then(v => {
          rLoading.close()
          this.tableData = v.data.data
        })
      } else if (val === "2") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_week").then(v => {
          rLoading.close()
          this.tableData = v.data.data
        })
      } else if (val === "3") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_month").then(v => {
          rLoading.close()
          this.tableData = v.data.data
        })
      } else if (val === "4") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Basic_Information_Of_Equipment_Infos_year").then(v => {
          rLoading.close()
          this.tableData = v.data.data
        })
      }
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
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

.mr50 {
  margin-right: 50px;
}
</style>
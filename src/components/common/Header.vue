<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
      <div class="logo">后台管理系统</div>
    <div class="header-right">
        <img height="70" src="../../assets/images/project.png"/>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus';

export default {
  data() {
    return {
      collapse:false
    };
  },
  methods: {
    collapseChage: function () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
</style>

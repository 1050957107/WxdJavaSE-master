<template>
  <div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <!--控制菜单开关-->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <!--过渡动画-->
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
        <!--element-ui 回到顶部组件el-backtop-->
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>

  </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import bus from './bus';

export default {
  // data() 为变量赋值等
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  // components 组件注册
  components: {
    vHead,
    vSidebar
  },
  //created 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
  //控住菜单的闭合
  created() {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
    //一、$emit
    // 1、this $emit（'自定义时间名',要传送的数据）；
    // 2、触发当前实例上的时间，要传递的数据会传给监听器；
    // 二、$on
    // 1、VM.$on('事件名',callback)    --------------------callback回调$emit要传送的数据；
    // 2、监听当前实例上自定义时间；

    // bus.$on('tags', msg => {
    //   let arr = [];
    //   for (let i = 0, len = msg.length; i < len; i++) {
    //     msg[i].name && arr.push(msg[i].name);
    //   }
    //   this.tagsList = arr;
    // });
  }
};
</script>
<style>
/*分页设置居中*/
.el-pagination {
  margin: 50px;
  text-align: center;
}
</style>
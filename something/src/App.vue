<template>
  <div id="app">
    <!-- <div class="logo"><img src="../static/images/cnodejs_light.svg" alt="" /></div> -->
    <!-- 通过配置路由meta.keepAlive对页面做是否缓存处理 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .logo{
    background:#444;
    img{
      width:30%;
      margin:20px auto;
    }
  }
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import LibFlexible from 'lib-flexible';
import FastClick from 'fastclick'
import 'flex.css'
import 'animate.css'
import './mock.js'
import VueLazyLoad from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: '../static/images/error.png',
  loading: '../static/images/loading2.gif',
  attempt: 1
});

Vue.use(VueAwesomeSwiper)

axios.defaults.baseURL = 'https://cnodejs.org/api/v1/'
Vue.prototype.$http = axios;

FastClick.attach(document.body);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

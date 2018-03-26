import Vue from 'vue'
import Router from 'vue-router'
import Hitokoto from '@/components/Hitokoto'
import Home from '@/components/Home'
import Index from '@/components/Index'
import Hello from '@/components/Hello'
import MyPicShow from '@/components/MyPicShow'
import Music from '@/components/Music'
import PlayLists from '@/components/PlayLists'
const Detail = resolve => require(['@/components/Detail.vue'], resolve);
const SearchList = resolve => require(['@/components/SearchList.vue'], resolve);
const MvPlay = resolve => require(['@/components/MvPlay.vue'], resolve);
const Pixiv = resolve => require(['@/components/Pixiv.vue'], resolve);
const PixivIndex = resolve => require(['@/components/PixivIndex.vue'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hitokoto',
      component: Hitokoto,
      meta:{
        keepAlive: true,
        title:'Hitokoto - 一言',
      }
    },
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index,
    //   meta:{
    //     keepAlive: true,
    //     title:'Something',
    //   }
    // },
    {
      path: '/cnode',
      name: 'Home',
      component: Home,
      meta:{
        keepAlive: true,
        title: 'cnode社区'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
      meta:{
        keepAlive: true,
      }
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta:{
        keepAlive: true,
      }
    },
    {
      path: '/picshow',
      name: 'MyPicShow',
      component: MyPicShow,
      meta:{
        keepAlive: true,
      }
    },
    {
      path: '/music',
      name: 'Music',
      component: Music,
      meta:{
        keepAlive: true,
        title:'Music'
      }
    },
    {
      path: '/playlists/:id',
      name: 'PlayLists',
      component: PlayLists,
      meta:{
        keepAlive: false,
      }
    },
    {
      path: '/search',
      name: 'SearchList',
      component: SearchList,
      meta:{
        keepAlive: true,
      }
    },
    {
      path: '/mvplay/:id',
      name: 'MvPlay',
      component: MvPlay,
      meta:{
        keepAlive: false,
      }
    },
    {
      path: '/pixiv',
      name: 'Pixiv',
      component: Pixiv,
      meta:{
        keepAlive: false,
        title:'Pixiv',
      }
    },
    {
      path: '/pixivindex',
      name: 'PixivIndex',
      component: PixivIndex,
      meta:{
        keepAlive: true,
        title:'PixivIndex',
      }
    }
  ]
})

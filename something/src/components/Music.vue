<template>
    <div>
        <div class="searchbar" flex="dir:left box:justify">
            <div class="icons" flex="main:center cross:center"><i class="iconfont icon-maikefeng"></i></div>
            <div class="seachbox">
                <router-link to="/search">歌名、歌手、专辑</router-link>
            </div>
            <div class="icons" flex="main:center cross:center"><i class="iconfont icon-cf-c57"></i></div>
        </div>
        <div>
            <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="item in [1,2,3,4]" :key="item"><img :src="'http://placeimg.com/640/240/any?id=2' + item" alt="" /></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
          </swiper>
        </div>
        <div class="tuijianbar" flex="dir:right box:first">
            <div class="more">更多<i class="iconfont icon-more"></i></div>
            <div class=""><i class="iconfont icon-huo red"></i>推荐歌单</div>
        </div>
        <div>
            <ul class="play-list">
                <li v-for="vo in playLists">
                    <router-link :to="{ name: 'PlayLists', params: { id: vo.id }}">
                        <span class="playTimes"><i class="iconfont icon-headset"></i>{{vo.playCount}}</span>
                        <img :src="vo.coverImgUrl" alt="" />
                        <div class="music-txt">{{vo.name}}</div>
                    </router-link>
                </li>
                <router-link :to="{ name: 'PlayLists', params: { id: '987889040' }}">
                    <span class="playTimes"><i class="iconfont icon-headset"></i>10086</span>
                    <img :src="'http://placeimg.com/640/240/any?id=2'" alt="" />
                    <div class="music-txt">其中一个</div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name:'music',
        data() {
            return {
                playLists:[],
                swiperOption: {
                  pagination: {
                    el: '.swiper-pagination'
                  },
                  autoplay: true,//可选选项，自动滑动
                }
            }
        },
        created() {
            this.$http.get('http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=0&limit=30')
            .then((res) => {
                console.log(res);
                this.playLists = res.data.playlists
            })
            .catch((err) => {
                console.log(err)
            })
        },
        mounted() {

        },
        methods: {

        }
    }

</script>

<style lang="scss" scoped>
    .logo{
        display:none;
    }
    .red{
        color:red;
    }
    .searchbar{
        height:46px;
        background:#D43C33;
        .icons{
            width:40px;
            height:46px;
            color:#fff;
            .iconfont{
            font-size:26px;
            }
        }
        .seachbox{
            padding:8px;
            a{
                display:inline-block;
                background:#fff;
                height:30px;
                width: 100%;
                border-radius:4px;
                padding: 0 10px;
                line-height: 30px;
                color:#999;
            }
        }
    }
    .tuijianbar{
        text-align:left;
        padding:10px;
        font-size:18px;
        .more{
            width:60px;
            text-align:right;
            font-size:14px;
        }
    }
    .play-list{
        padding:5px;
        li{
            width:33.333%;
            display:inline-block;
            padding:5px;
            float: left;
            height:170px;
            position:relative;
            .playTimes{
                position:absolute;
                color:#fff;
                width:-webkit-calc(100% - 10px);
                width:calc(100% - 10px);
                background:rgba(0,0,0,0.2);
                padding:3px 0;
            }
            .music-txt{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }
    }
</style>

<template>
    <div class="pixiv-box">
        <div class="pixiv-search" flex="dir:left box:last">
            <div class="ipt-box"><input type="text" v-model="keywords" v-on:keyup.enter="doEnter()" /></div>
            <div class="search-btn"><router-link :to="{ name: 'Pixiv', params: { keyword: keywords }}">搜索</router-link></div>
        </div>
        <div class="tags">
            <router-link v-for="(vo, i) in tags" :to="{ name: 'Pixiv', params: { keyword: vo.name }}" :key="i">{{vo.name}}</router-link>
        </div>
    </div>
</template>

<script type="text/javascript">
    
    export default {
        name: 'pixivindex',
        data() {
            return {
                tags:[],
                keywords:'',
            }
        },
        created() {
            this.getTags();
        },
        methods: {
            getTags() {
                this.$http.get('https://api.imjad.cn/pixiv/v1/?type=tags')
                .then((res) => {
                    console.log(res);
                    this.tags = res.data;
                })
            },
            doEnter() {
                this.$router.push({ name: 'Pixiv', params: { keyword: this.keywords }})
            }
        }
    }

</script>

<style lang="scss">
    @import '../../static/css/common.scss';
    body:before {
      content: ' ';
      position: fixed;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url(../../static/images/930f5212c99ccc71accd4615cb03e255.jpg) center 0 no-repeat;
      background-size: cover;
    }
    .pixiv-box{
        // background:{
        //     position:0 0;
        //     size:100% auto;
        //     image:url(../../static/images/930f5212c99ccc71accd4615cb03e255.jpg);
        //     attachment:fixed;
        //     repeat:no-repeat;
        // }
        .pixiv-search{
            position:fixed;
            background:#088de8;
            width:100%;
            height:40px;
            padding:5px 0;
            .ipt-box{
                padding-left: 15px;
                input{
                    height:30px;
                    width:100%;
                    padding-left: 15px;
                }
            }
            .search-btn{
                width:80px;
                a{
                    display:block;
                    font-size:16px;
                    color:#fff;
                    height:100%;
                    line-height: 30px;
                }
            }
        }
    }
    .tags {
        padding-top: 50px;
        a{
            display:inline-block;
            line-height: 30px;
            border: 1px solid #e1e1e1;
            font-size:16px;
            padding:5px 10px;
            background:rgba(255,255,255,0.5);
            margin:5px 5px 0 0;

        }
    }
</style>
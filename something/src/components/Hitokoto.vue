<template>
    <div class="hitokoto" :style="{'background-image':bg(bgChange)}">
        <div class="content" @click.stop="getHitokoto();">
            <div class="content-text">
                <div class="main-text">
                    <div class="txt-left">『</div>
                    <transition 
                    name="text-animation"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    >
                    <div class="txt-center" v-show="hitokotoShow">{{hitokoto.hitokoto}}</div>
                    </transition>
                    <div class="txt-right">』</div>
                </div>
                <div class="author">-「{{hitokoto.author}}」</div>
            </div>
        </div>
        <div class="entry-box">
            <div flex="box:mean">
                <router-link :to="'/cnode'">Cnode</router-link>
                <router-link :to="'/music'">Music</router-link>
            </div>
            <div flex="box:mean">
                <router-link :to="'/picshow'">Picshow</router-link>
                <router-link :to="'/pixivindex'">Pixiv</router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">

    export default {
        name:"hitokoto",
        data(){
            return {
                hitokoto:{},
                hitokotoShow:true,
                bgChange:require('../../static/images/1.jpg')
            }
        },
        created() {
            this.getHitokoto();
        },
        methods: {
            getHitokoto() {
                this.hitokotoShow = false;
                // this.$http.get('https://sslapi.hitokoto.cn/')
                this.$http.get('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=50&encode=json')
                .then((res) => {
                    console.log(res);
                    var id;
                    id = Math.ceil(Math.random()*21);
                    console.log(id)
                    this.hitokoto = res.data;
                    this.hitokotoShow = true;
                    this.bgChange = require('../../static/images/'+id+'.jpg');
                    console.log(this.bgChange)
                })
            },
            bg(url){
                return `url(${url})`
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/common.scss';
    body,html,#app{
        width:100%;
        height:100%;
    }
    .hitokoto{
        width:100%;
        height:100%;
        @include background();
        background-image:url(../../static/images/background.jpg);
        .content{
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.5);
            position: relative;
            .content-text{
                position:absolute;
                width:55%;
                top:50%;
                left:50%;
                transform:translateX(-50%) translateY(-70%);
                color:#fff;
                .main-text{
                    font-size:26px;
                }
                .txt-left{
                    text-align:left;
                }
                .txt-center{
                    padding: 0 5%;
                }
                .txt-right{
                    text-align:right;
                }
                .author{
                    color:rgba(255,255,255,0.87);
                    font-size:20px;
                    text-align:right;
                    margin-top: 10px
                }
            }
        }
        .entry-box{
            position:fixed;
            bottom:0;
            width:100%;
            padding:50px 20px;
            a{
                height:40px;
                background:rgba(255,255,255,0.5);
                line-height: 40px;
                margin:5px;
            }
        }
    }


@media screen and (max-width: 600px){
    .hitokoto{
        // background-image:url(../../static/images/930f5212c99ccc71accd4615cb03e255.jpg);
        .content{
            .content-text{
                width:95%;
            }

        }
    }
}
</style>
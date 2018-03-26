<template>
    <div class="index" :style="{'background-image':returnBg()}">
        <div class="entry-box">
            <div flex="box:mean">
                <router-link :to="'/cnode'">Cnode</router-link>
                <router-link :to="'/music'">Music</router-link>
            </div>
            <div flex="box:mean">
                <router-link :to="'/hitokoto'">Hitokoto</router-link>
                <router-link :to="'/pixivindex'">Pixiv</router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    
export default {
    name: 'index',
    data() {
        return {
            images:['1','2','3','4','5',]
        }
    },
    methods: {
        returnBg(id){
            var id;
            id = this.images[Math.floor(Math.random()*5)]
            return 'url(../../static/images/'+id+'.jpg)'
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
    .index{
        width:100%;
        height:100%;
        @include background();
        background-image:url(../../static/images/1.jpg);
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

</style>
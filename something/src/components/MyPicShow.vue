<template>
    <div class="picshow">
        <div v-for="item in images" class="pre-img">
            <div class="imgshow bigimg" v-lazy:background-image="returnBg(item.id)">
                <div class="pic-msg" flex="main:center cross:center">
                    <div>
                       <div class="pic-title">{{item.text[0]}}</div>
                        <div>By {{item.name[0]}}</div> 
                    </div>
                </div>
            </div>
            <div flex="box:mean">
                <div class="imgshow" v-lazy:background-image="returnBg(item.id + '1')">
                    <div class="pic-msg" flex="main:center cross:center">
                        <div>
                           <div class="pic-title">{{item.text[1]}}</div>
                            <div>By {{item.name[1]}}</div> 
                        </div>
                    </div>
                </div>
                <div class="imgshow" v-lazy:background-image="returnBg(item.id + '2')">
                    <div class="pic-msg" flex="main:center cross:center">
                        <div>
                           <div class="pic-title">{{item.text[2]}}</div>
                            <div>By {{item.name[2]}}</div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

// http://musicapi.duapp.com/api.php?type=topPlayList&cat=全部&offset=0&limit=9
// https://api.imjad.cn/cloudmusic/?type=playlist&id=987889040
// http://musicapi.duapp.com/api.php?type=url&id=519602902

    export default {
        name: 'picshow',
        data() {
            return {
                images:[],
            }
        },
        created() {
            this.$http.get('http://m.img')
            .then((res) => {
                console.log(res)
                this.images = res.data.img_list
            });
        },
        mounted() {
            this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=987889040')
            .then((res) => {
                console.log(res);
            })
        },
        methods: {
            returnBg(bg) {
                return 'http://placeimg.com/640/480/any?id=' + bg;
            }
        }
    }

</script>
<style lang="scss" scoped>
    $rem:1rem;
    @function beRem($num){
        @return ($num/37.5)*$rem;
    }
    .imgshow{
        background: {
            repeat:no-repeat;
            size:cover;
            position: center top;
        }
        height:beRem(179);
        margin:0 1px 1px 0;
        .pic-msg{
            background: rgba(0,0,0,0.4);
            height:beRem(69);
            color:#fff;
        }
    }
    .bigimg{
        height: beRem(359);
    }

</style>
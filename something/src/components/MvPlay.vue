<template>
    <div class="mv">
        <video controls="controls" :src="mvUrl" preload="" name="media" ref="myVideo"><source :src="mvUrl" type="video/mp4"></video>
    </div>
</template>

<script>
    export default {
        name:'mvplay',
        data() {
            return {
                mvUrl:0,
            }
        },
        created(){
        },
        mounted(){
            this.$nextTick(() => {
                console.log('s')
                this.getMv(this.$route.params.id)
            })
        },
        methods:{
            getMv(id){
                let that = this;
                that.$http.get('https://api.imjad.cn/cloudmusic/?type=mv&id=' + id)
                .then((res) => {
                    console.log(res);
                    that.mvUrl = res.data.data.brs['720'];
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.$refs.myVideo.play();
                        }, 200)
                         
                    })
                   
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mv{
        video{
            width:100%;
        }
    }
</style>

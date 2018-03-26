<template>
    <div class="detail">
        <div><h1>{{topicDetail.title}}</h1></div>
        <div v-html="topicDetail.content"></div>
        <div>
            <div>回复</div>
            <div>
                <ul>
                    <li v-for="(item,index) in replice">
                        <div class="" flex="dir:left box:first">
                            <div class="img"><img :src="item.author.avatar_url" alt="" /></div>
                            <div v-html="item.content" class="replies-txt"></div>
                        </div>
                        <div class="caozuo">
                            <i class="iconfont icon-fenxiang"></i>
                            <i class="iconfont icon-zan" :style="{'color': item.is_uped ? '#088de8' : '#2c3e50'}" @click="doUps(index,item.id)"> {{item.ups.length}}</i>
                        </div>
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    const myId = "595114840d52eaae214013f3"
    export default {
        name: 'detail',
        data() {
            return {
                topicDetail: {},
                replice: [],
            }
        },
        created() {
            this.getDetail(this.$route.params.id)
        },
        mounted() {
            console.log(this.$route.params)

        },
        methods: {
            getDetail(id) {
                this.$http.get('topic/'+id,{
                    params:{
                        accesstoken : '22aa46e5-a97b-4a3f-be4b-6ffc7fc5a36f'
                    }
                })
                .then((res) => {
                    console.log(res);
                    this.topicDetail = res.data.data;
                    this.replice = res.data.data.replies;
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            doUps(index,id) {
                const that = this;
                this.$http.post('reply/'+ id +'/ups',
                    {
                        accesstoken:'22aa46e5-a97b-4a3f-be4b-6ffc7fc5a36f'
                    }
                )
                .then((res) => {
                    console.log(res);
                    let response = res.data;
                    console.log(response)
                    that.replice[index].is_uped = !that.replice[index].is_uped
                    if(response.success && response.action == 'up'){
                        that.replice[index].ups.push('22aa46e5-a97b-4a3f-be4b-6ffc7fc5a36f');
                    }else{
                        that.replice[index].ups.pop();
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })

                
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../static/css/common.scss';
    .detail{
        text-align:left;
        padding:15px;
        font-size:14px;
        li{
            height:auto;
            padding:10px 0;
            border-bottom: 1px solid #e1e1e1;
            .caozuo{
                text-align:right;
                i{
                    display:inline-block;
                    padding:5px;
                }
            }
            .img{
                width:beRem(40);
                padding:5px;
            }
            .replies-txt{
                padding-top: 5px;
            }
        }
    }
    h1,h2,h3,h4,h5{
        font-weight:bold;
    }
    a{
        color:#088de8;
    }


</style>
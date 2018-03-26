<template>
    <div class="pixiv">
        <div>
            <ul>
                <li v-for="(item, index) in pixiv.response"><img v-lazy="item.image_urls.px_480mw" alt="" /></li>
            </ul>
        </div>
        <div class="btn-bar" flex="box:mean">
            <div :class="{hasno: !thisPrevious}" @click="getData(pixiv.pagination.previous)">上一页</div>
            <div @click="$router.go(-1)">返回搜索</div>
            <div :class="{hasno: !thisNext}" @click="getData(pixiv.pagination.next)">下一页</div>
        </div>
    </div>
</template>
<script type="text/javascript">
    // https://api.imjad.cn/pixiv/v1/?type=favorite&id=16361124

    export default {
        name: 'pixiv',
        data() {
            return {
                pixiv:{},
                thisPrevious:null,
                thisNext:2
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            getData(page) {
                this.$http.get('https://api.imjad.cn/pixiv/v1/?type=search&per_page=20&word='+this.$route.params.keyword +'&page=' + page)
                .then((res) => {
                    console.log(res);
                    this.pixiv = res.data;
                    this.thisPrevious = res.data.pagination.previous;
                    this.thisNext = res.data.pagination.next;
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../static/css/common.scss';
    .pixiv{
        padding-bottom: 40px;
    }
    .btn-bar{
        position: fixed;
        width:100%;
        height:40px;
        bottom:0;
        left:0;
        line-height: 40px;
        color:#fff;
        font-size:18px;
        background:#fff;
        div{
            background:#088de8;
        }
        .hasno{
            opacity:0.5;
        }
    }
</style>
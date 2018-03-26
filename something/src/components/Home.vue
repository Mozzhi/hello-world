<template>
    <div>
        <Tab v-on:msg="getChildType"></Tab>
        <ul class="list-box">
            <li v-for="topic in list">
                <router-link :to="'/detail/'+topic.id">
                    <div class="lists" flex="box:justify">
                        <div><img :src="topic.author.avatar_url" alt="" /></div>
                        <div class="text-show">
                            <span class="status" :class="{begood:topic.top || topic.good}">{{retStatus(topic.top,topic.good,topic.tab)}}</span>
                            <div class="title">{{topic.title}}</div>
                            <div>{{topic.reply_count}} / {{topic.visit_count}}</div>
                        </div>
                        <div>{{timeAgo(topic.last_reply_at)}}</div>
                    </div>
                </router-link>
            </li>
        </ul>        
    </div>
</template>

<script>
import ago from '../../static/js/ago.js'
import Tab from './Tab'

    export default {
        name: "home",
        components: {
            Tab
        },
        data () {
            return {
                list:[],
            }
        },
        created() {
            this.getList('');
        },
        mounted() {

        },
        methods: {
            getList(types) {
                this.$http.get('topics?tab='+types)
                .then((res) => {
                    console.log(res);
                    this.list = res.data.data;
                })
                .catch((err) => {
                    console.log()
                })
            },
            timeAgo(time) {
                return ago(time);
            },
            retStatus(top,good,tab) {
                if(top){
                    return '置顶'
                };
                if(good){
                    return '精华'
                };
                switch (tab) {
                    case 'ask':
                        return '问答';
                        break;
                    case 'job':
                        return '招聘';
                        break;
                    case 'share':
                        return '分享';
                        break;
                    case 'dev':
                        return '测试';
                        break;
                    default :
                        return '';
                }
            },
            getChildType(msg){
                console.log(msg);
                this.getList(msg);
            }
        }
    }



</script>

<style type="text/css" scoped lang="scss">
    @import '../../static/css/common.scss';
    $border:1px solid #e1e1e1;
    .list-box {
        background: #fff;
        li{
            border-bottom: $border;
            height:beRem(64);
            padding:10px 0 10px 10px;
        }
    }
    .lists{
        text-align:left;
        >div:first-child{
            width:beRem(40);
            img{
                width:beRem(30);
                margin:5px 0;
            }
        }
        >div:last-child{
            margin:0 10px;
            width:52px;
            text-align:right;
            padding-top: 22px;
        }
        .title{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size:14px;
            padding-top: 4px;
        }
        .text-show{
            position:relative;
            padding-left: 40px;
            .status{
                position:absolute;
                top:10px;
                left:0px;
                padding:3px 5px;
                border-radius:3px;
                background:#eee;
                color:#999;

            }
            .begood{
                background:#80BD04;
                color:#fff;
            }
        }
    }
</style>
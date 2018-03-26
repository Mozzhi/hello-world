<template>
    <div class="tab">
        <div flex="box:mean">
            <div 
            v-for="tab in tabs" 
            :class="{active:active == tab.types}" 
            @click="changeType(tab.types)">{{tab.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'tab',
        data() {
            return {
                tabs:[
                    {name:'全部',types:'all'},
                    {name:'精华',types:'good'},
                    {name:'分享',types:'share'},
                    {name:'问答',types:'ask'},
                    {name:'招聘',types:'job'},
                    {name:'测试',types:'dev'},
                ],
                active:'all'
            }
        },
        methods:{
            changeType(types) {
                this.active = types;
                this.$emit('msg',types);
            },

        }
    }
</script>

<style lang="scss" scoped>
@import '../../static/css/common.scss';
    .tab{
        line-height: beRem(40);
        height:beRem(40);
        .active{
            background:#80BD04;
            color:#fff;
        }
    }
</style>
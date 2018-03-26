<template>
    <div class="search-page">
        <div class="searchtop" flex="dir:left box:justify">
            <div class="icons" flex="main:center cross:center" @click="$router.go(-1)"><i class="iconfont icon-back"></i></div>
            <div class="seachbox">
                <input type="text" placeholder="歌名、歌手、专辑" v-model="keywords" @input="doSearch()" />
            </div>
            <div class="icons" flex="main:center cross:center" @click="keywords = ''"><i class="iconfont icon-clear"></i></div>
        </div>
        <div class="hot-song">
            
        </div>
        <div class="song-list">
            <ul>
                <li v-for="item in searchResult">
                    <router-link :to="item.mv !== 0 ? '/mvplay/'+item.mv : ''" flex="dir:left box:last">
                    <div>
                        <div class="song-name">{{item.name}}<i v-if="item.mv" class="iconfont icon-mv"></i></div>
                        <div>
                            <span v-for="(vo, index) in item.ar">{{vo.name}}<i v-if="index !== item.ar.length - 1">/</i></span> 
                            - {{item.al.name}}
                        </div>
                        <div>{{item.alia[0]}}</div>
                    </div>
                    <div class="more" flex="main:center cross:center"><i class="iconfont icon-gengduo1"></i></div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    
let debounce = null;

export default {
    name: 'search',
    data() {
        return {
            keywords:'',
            searchResult:[],
        }
    },
    methods:{
        doSearch(){
            let that = this;
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                that.$http.get('https://api.imjad.cn/cloudmusic/?type=search&s=' + that.keywords)
                .then((res) => {
                    console.log(res);
                    if(res.data.code == 200){
                        that.searchResult = res.data.result.songs;
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })
            }, 300)
            
        }
    }
}

</script>

<style lang="scss" scoped>
    @import '../../static/css/search.scss';

</style>

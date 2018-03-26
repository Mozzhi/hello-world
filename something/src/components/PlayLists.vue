<template>
    <div>
        <div class="list-introduce">
            <div class="blur-bg" v-lazy:background-image="playLists.coverImgUrl"></div>
            <div class="searchbar" flex="dir:left box:justify">
                <div class="icons" flex="main:center cross:center" @click="goback();"><i class="iconfont icon-back"></i></div>
                <div class="seachbox" flex="main:center cross:center"><div>歌单</div></div>
                <div class="icons" flex="main:center cross:center"><i class="iconfont icon-cf-c57"></i></div>
            </div>
            <div class="content" flex="dir:left box:first">
                <div class="list-img"><img :src="playLists.coverImgUrl" alt="" /></div>
                <div class="list-name">{{playLists.name}}</div>
            </div>
            <div class="msgbar" flex="dir:left box:mean">
                <div>
                    <i class="iconfont icon-tianjiawenjian"></i>
                    <div>{{playLists.subscribedCount}}</div>
                </div>
                <div>
                    <i class="iconfont icon-pinglun"></i>
                    <div>{{playLists.commentCount}}</div>
                </div>
                <div>
                    <i class="iconfont icon-fenxiang"></i>
                    <div>{{playLists.shareCount}}</div>
                </div>
                <div>
                    <i class="iconfont icon-xiazai"></i>
                    <div>下载</div>
                </div>
            </div>
        </div>
        <div>
            <audio :src="musicUrl" controls="controls" ref="myAudio" id="myAudio">
                <source :src="musicUrl" type="audio/mpeg" />
            </audio>
            <!-- <video controls="controls" name="media" ref="myAudio" :src="musicUrl"><source :src="musicUrl" type="audio/mpeg"></video> -->
        </div>
        <div class="lists">
            <div class="tuijianbar" flex="dir:right box:first">
                <div class="more"><i class="iconfont icon-cf-c57"></i></div>
                <div class=""><i class="iconfont icon-bofang"></i>播放全部<em>（共{{playLists.trackCount}}首）</em></div>
            </div>
            <ul>
                <li flex="dir:left box:justify" 
                v-for="(item, index) in playLists.tracks" 
                @click="getMusic(item)">
                    <div flex="main:center cross:center"><span>{{index + 1}}</span></div>
                    <div class="song">
                        <div class="song-name">{{item.name}}</div>
                        <div>{{item.ar[0].name}}-{{item.al.name}}</div>
                    </div>
                    <div flex="main:center cross:center"><i class="iconfont icon-gengduo1"></i></div>
                </li>
            </ul>
        </div>

        <div class="playbar">
            <div class="timebar" :style="{width: timebarWidth + '%'}"></div>
            <div flex="dir:left box:justify">
                <div class="singer" @click="playPageShow = true"><img :src="singer.pic" alt="" /></div>
                <div class="song-msg">
                    <div>{{singer.song_name}}</div>
                    <div>{{singer.name}}</div>
                </div>
                <div class="operate" flex="main:center cross:center">
                    <div>
                        <i v-show="play" class="iconfont icon-pause-20" @click="onPause()"></i>
                        <i v-show="!play" class="iconfont icon-bofang" @click="onPlay()"></i>
                        <i class="iconfont icon-cf-c57"></i>  
                    </div>
                </div>
            </div>
        </div>
        <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInRight"
        leave-active-class="animated bounceOutRight">
        <div class="playpage" v-show="playPageShow">
            <div class="blankbg" v-lazy:background-image="singer.pic"></div>
            <div class="disc" :class="{pause:!play}" flex="main:center cross:center">
                <div class="dic-pic" :class="{play:play}" v-lazy:background-image="singer.pic"></div>
            </div>
            <span class="goback" @click="playPageShow = !playPageShow"><i class="iconfont icon-back"></i></span>
            <div class="lyricbox">
                <div class="lyric">
                    <div class="lyric_run" :style="{top: lyricTop*(-24) +'px'}">
                        <ul>
                            <li v-for="(vo, index) in lyric.lyricA" :class="{active: index == (lyricTop + 1)}">
                                {{vo}}
                            </li>
                        </ul>
                        <div v-if="lyric == ''">找不到歌词</div>
                    </div>
                </div>
            </div>
            
            <div class="footbar">
                <i v-show="play" class="iconfont icon-pause-20" @click="onPause()"></i>
                <i v-show="!play" class="iconfont icon-bofang" @click="onPlay()"></i>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
let timer = null, timeGet = null, timeRxg = /[0-9:.]+/g;

function lyricArr(lyric){
    let lyricObj = {};
    lyricObj.lyricA = lyric.split(/\[[0-9:.]+\]/);
    lyricObj.lyricTime = lyric.match(/\[[0-9:.]+\]/g);
    return lyricObj;
}

function timeForLyric(str){
    let timeForLyric = 0;
    let splitTime = str.split(':');
    timeForLyric = splitTime[0]*60 + parseInt(Number(splitTime[1]));
    return timeForLyric;
}


export default {
    name: 'playlists',
    data() {
        return {
            blurBg:'',
            playLists:{},
            musicUrl: '',
            singer:{},
            timebarWidth:0,
            play: false,
            playsTime: 0,
            musicLong: 0,
            playPageShow: false,
            lyric:'',
            lyricTop:0,
        }
    },
    created() {
        this.$http.get('https://api.imjad.cn/cloudmusic/?type=playlist&id=' + this.$route.params.id)
        .then((res) => {
            console.log(res);
            this.playLists = res.data.playlist
        })
        .catch((err) => {
            console.log(err)
        })
    },
    mounted() {

    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        getMusic(obj) {
            let that = this;
            this.singer.name = obj.ar[0].name;
            this.singer.song_name = obj.name;
            this.singer.pic = obj.al.picUrl;
            that.timebarWidth = 0;
            this.$http.get('https://api.imjad.cn/cloudmusic/?type=song&id=' + obj.id)
            .then((res) => {
                console.log(res);
                this.musicUrl = res.data.data[0].url;
                this.$nextTick(() => {
                    timeGet = setInterval(() => {
                        let musicDuration = that.$refs.myAudio.duration;
                        that.musicLong = musicDuration;
                        console.log(musicDuration)
                        if(!isNaN(musicDuration)){
                            clearInterval(timeGet);
                            that.playPageShow = true;
                            that.changeWidth(musicDuration);
                            that.getLyric(obj.id)
                        }
                        
                    },200)
                    
                })
                // let audio = new Audio();
                // audio.src = res.data.data[0].url;
                // audio.play();
                // console.log(audio.duration);
            })
        },
        changeWidth(times, playedTime, runed){
            clearInterval(timer);
            let that = this,
            timess = parseInt(times),
            wholeTime = parseInt(times),
            preWidth = 100/timess;

            if(playedTime){
                timess = playedTime;
                that.$refs.myAudio.currentTime = that.musicLong - playedTime;
            }

            that.$refs.myAudio.play(); 
            that.play = true;  
            if(!runed){
                that.lyricTop = 0; 
            }
             

            timer = setInterval(() => {
                if(timess){
                    // console.log(timess)
                    that.timebarWidth = preWidth*(wholeTime - timess);
                    that.playsTime = timess;
                    if(that.lyric){
                        for(let i=0;i<that.lyric.lyricTime.length;i++){
                            let currentTimes = timeForLyric(that.lyric.lyricTime[i].match(timeRxg)[0]);
                            if(currentTimes == (wholeTime - timess)){
                                console.log(currentTimes);
                                that.lyricTop = i;
                            }
                        }
                    }
                    timess--;
                }else{
                    clearInterval(timer)
                    that.play = false; 
                }
            }, 1000)
        },
        getLyric(id) {
            let that = this;
            that.$http.get('https://api.imjad.cn/cloudmusic/?type=lyric&id=' + id)
            .then((res) => {
                console.log(res);
                if(res.data.lrc){
                    that.lyric = lyricArr(res.data.lrc.lyric)
                }
                
                console.log(that.lyric)
            })
            .catch((err) => {
                console.log(err);
            })
        },
        onPause(){
            this.$refs.myAudio.pause();
            this.play = false;
            clearInterval(timer);
        },
        onPlay(){
            let that = this;
            that.changeWidth(that.musicLong, that.playsTime, true) 
        }
    },
    destroyed(){
        console.log('des')
        clearInterval(timer);
    }
}

</script>

<style lang="scss" scoped>
    @import '../../static/css/playlist.scss';

</style>

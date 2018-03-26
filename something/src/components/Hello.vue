<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in data.team">
        <img :src="'http://placeimg.com/80/60/any?id=' + index" alt="" />
        <span>{{item.name}}</span>
        <span>{{item.age}}岁</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Outils from 'outils';


export default {
  name: 'hello',
  data () {
    return {
      msg: 'Make more time  to study hard !',
      data:{},
    }
  },
  created (){
    const that = this;
    this.$http.get('http://g.cn')
    .then((res) => {
      console.log(res);
      that.data = res.data
      // if(!res.data.success){
      //   alert(res.data.errmsg)
      // }
    })
    .catch((err) => {
      console.log(err)
    });
    this.$http.get('https://www.easy-mock.com/mock/5a29f98d2763647eeca684b9/mytest/demo_data')
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    });
  },
  mounted(){
    setInterval(()=>{
      this.msg = Outils.formatRemainTime(new Date('2020-01-01 15:52:30'))
    }, 1000)
    console.log(Outils.stringfyQueryString({name:'momo',age:25,sex:'man',work:'IT'}))
    console.log(Outils.parseQueryString('http://www.mozzhi.com?name=momo&age=25&sex=man&work=IT'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$red:red;
h1, h2 {
  font-weight: normal;
  color:$red;
}
ul{
  text-align:left;
}


</style>

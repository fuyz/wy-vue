<style>
  html, body {
    margin: 0;
    padding: 0;
    font-size: 13.33333vw;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  p {
    font-size: 0.3rem;
    margin: 0;
  }

  .sText {
    font-size: 0.2rem;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .clear {
    zoom: 1;
  }

  .clear:after {
    display: block;
    content: '';
    clear: both;
  }

  .gray {
    color: gray;
  }

  /*indicator*/
  .mint-indicator-wrapper {
    z-index: 10;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
    overflow-y: scroll;
  }

  /*导航*/
  #navBar {
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    box-shadow: 0 1px 5px -2px #aaa;
    z-index: 10;
    background: whitesmoke;
  }

  #navBar .mint-tab-item-label {
    width: 1rem;
  }

  /*tabBar*/
  #tabBar {
    box-shadow: 0 -1px 5px -2px #aaa;
    background: whitesmoke;
    z-index: 10;
    font-size: 0.3rem;
    background: white;
  }

  .tabBarItem {
    width: 3rem;
    text-decoration: none;
    color: #42b983;
    font-size: 0.5rem;
    display: inline-block;
  }

  .tabBarItem.router-link-exact-active {
    color: #26a2ff;
    font-weight: 700;
  }

  /*.navItem.active {*/
  /*color: #ee1a1a;*/
  /*}*/

  .slide-enter-active, .slide-leave-active {
    transform: translate(0vw, 0);
    transition: all .3s linear;
    opacity: 1;
  }

  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translate(100vw, 0);
  }

  .down-enter-active, .down-leave-active {
    transform: translate(0, -100vh);
    transition: all .3s linear;
  }

  .down-enter, .down-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    transform: translate(0, 0);
  }

  /*图标icon*/
  .icon {
    width: 0.55rem;
    height: 0.4rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    vertical-align: sub;
  }

  .laugh_icon {
    background-image: url("./assets/laugh.png");
  }

  .love_icon {
    background-image: url("./assets/love.png");
  }

  .bored_icon {
    background-image: url("./assets/bored.png");
  }

  .comment_icon {
    background-image: url("./assets/comment.png");
  }

  .laugh_icon {
    background-image: url("./assets/laugh.png");
  }

  .love_icon {
    background-image: url("./assets/love.png");
  }

  .bored_icon {
    background-image: url("./assets/bored.png");
  }

  .comment_icon {
    background-image: url("./assets/comment.png");
  }

  .zan_icon {
    background-image: url("assets/zan_icon.png");
  }

  .mint-swipe {
    width: 100%;
  }

  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }


</style>

<template>
  <div id="app">
    <transition name="slide">
      <router-view></router-view>
    </transition>

    <!--//tabBar-->
    <mt-tabbar id="tabBar" fixed="" v-model="selected">
      <router-link class="tabBarItem" to="/news/head/头条">
        <mt-tab-item id="tab1">
          <img slot="icon" src="./assets/index_icon.png">
          首页
        </mt-tab-item>
      </router-link>
      <router-link class="tabBarItem" to="/video/videoList/推荐">
        <mt-tab-item id="tab2">
          <img slot="icon" src="./assets/video_icon.png">
          视频
        </mt-tab-item>
      </router-link>
      <!--<router-link class="tabBarItem" to="/live">-->
        <!--<mt-tab-item id="tab3">-->
          <!--<img slot="icon" src="./assets/live_icon.png">-->
          <!--直播-->
        <!--</mt-tab-item>-->
      <!--</router-link>-->
      <router-link class="tabBarItem" to="/mine">
        <mt-tab-item id="tab4">
          <img slot="icon" src="./assets/mine_icon.png">
          我 
        </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>


</template>

<script>

  import store from '@/store/index'

  export default {
    name: 'App',
    store,
    data: function () {
      return {
        selected: 'tab1'
      }
    },
    methods: {}
  }
</script>




<style>
/*indicator*/
.mint-indicator-wrapper {
  z-index: 10;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

.tabBarItem.router-link-exact-active a {
  color: #26a2ff !important;
  background: rgba(1, 1, 1, 0.05);
  font-weight: 700;
}

/*.navItem.active {*/
/*color: #ee1a1a;*/
/*}*/

.slide-enter-active,
.slide-leave-active {
  transform: translate(0vw, 0);
  transition: all 0.3s linear;
  opacity: 1;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(100vw, 0);
}

.down-enter-active,
.down-leave-active {
  transform: translate(0, -100vh);
  transition: all 0.3s linear;
}

.down-enter, .down-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(0, 0);
}

image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>

<template>
  <div id="app">
    <keep-alive>
      <transition name="fade" appear>
        <router-view></router-view>
      </transition>
    </keep-alive>

    <mt-tabbar id="tabBar" fixed v-model="selected">
      <router-link class="tabBarItem" to="/news/head/头条">
        <mt-tab-item id="tab1">
          <i slot="icon" class="fa fa-home"></i>
          首页
        </mt-tab-item>
      </router-link>
      <router-link class="tabBarItem" to="/video/videoList/推荐">
        <mt-tab-item id="tab2">
          <i slot="icon" class="fa fa-play-circle"></i>
          视频
        </mt-tab-item>
      </router-link>
      <router-link class="tabBarItem" to="/live">
        <mt-tab-item id="tab3">
          <i slot="icon" class="fa fa-video"></i>
          直播
        </mt-tab-item>
      </router-link>
      <router-link class="tabBarItem" to="/mine">
        <mt-tab-item id="tab4">
          <!-- <img slot="icon" :src="mine_icon" /> -->
          <i slot="icon" class="fas fa-user"></i>
          我
        </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      selected: "tab1",
    };
  },
  methods: {},
  created() {
    // alert(123);
  },
};
</script>
<style lang="less">
@fontSize: 14px;
* {
  font-size: @fontSize;
}
</style>




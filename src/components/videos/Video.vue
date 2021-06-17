<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
}

.videoWrapper {
  height: calc(100vh - 100px);
  overflow: scroll;
  margin-top: 46px;
}
</style>

<template>
  <div class="videoWrapper">
    <VideoNav></VideoNav>

    <transition name="slide">
      <router-view name="VideoList"></router-view>
    </transition>

    <!--<router-view name="NewsList4"></router-view>-->
    <!--<transition name="slide">-->
    <router-view name="VideoDetail"></router-view>
    <!--</transition>-->
  </div>
</template>

<script>
import VideoNav from "@/components/videos/VideoNav";

export default {
  name: "Video",
  data() {
    return {};
  },
  components: {
    VideoNav: VideoNav,
  },
  created: function () {},
};
</script>


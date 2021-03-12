<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <!--navTab-->
  <mt-navbar id="navBar" v-model="navSelected" fixed>
    <mt-tab-item
      :id="item"
      v-for="(item, index) in navBarList"
      :key="index"
      :href="'#'+ item.link"
    >{{ item.title }}</mt-tab-item>
  </mt-navbar>
</template>

<script>
import URL_PARAMS from "@/util/urls-config";
import PARAMS from "../../../config/index";

export default {
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      navBarList: [
        //          {link: '/video/videoList/推荐', title: '推荐' },
        //          {link: '/video/videoList/榜单', title: '榜单' },
        //          {link: '/video/videoList/搞笑', title: '搞笑' },
        //          {link: '/video/videoList/影视', title: '影视' },
        //          {link: '/video/videoList/音乐', title: '音乐' },
        //          {link: '/video/videoList/小品', title: '小品' },
        //          {link: '/video/videoList/萌宠', title: '萌宠' },
        //          {link: '/video/videoList/涨姿势', title: '涨姿势' },
        //          {link: '/video/videoList/黑科技', title: '黑科技' },
        //          {link: '/video/videoList/二次元', title: '二次元' },
      ],
      navSelected: "推荐",
      videoNav_url: "http://c.m.163.com/recommend/video/tablist",
    };
  },
  created: function () {
    this.navSelected = this.$route.params.type
      ? this.$route.params.type
      : this.navSelected;

    this.$http
      .jsonp(this.host_port + "?key=wy&url=" + this.videoNav_url)
      .then((res) => {
        try {
          res = JSON.parse(JSON.parse(res.body));
          this.navBarList = [];
          res.forEach(
            function (e, i) {
              this.navBarList.push({
                link: "/video/videoList/" + e.cname,
                title: e.cname,
              });
              URL_PARAMS.videoUrl[e.cname] =
                "http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=" +
                e.ename +
                "&size=10&offset=0&fn=1";
            }.bind(this)
          );
          console.log([this.navBarList, URL_PARAMS]);
        } catch (err) {
        } finally {
        }
      });
  },
};
</script>


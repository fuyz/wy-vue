<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listWrap {
  font-size: 0.3rem;
}

.videoItem-wrap {
  overflow: hidden;
  padding-bottom: 10px;
}

.videoWrap {
  height: 200px;
  position: relative;
  /*overflow: hidden;*/
}

.videoWrap video {
  position: absolute;
  top: 0;
  z-index: 1;
}

.videoCover {
  width: 100%;
  height: 200px;
  position: relative;
  z-index: 2;
  /*background: rgba(1,1,1, 0.1);*/
}

.videoCover .title {
  position: absolute;
  top: 0;
  padding: 2px 10px;
  font-size: 0.3rem;
  margin-top: 5px;
  margin-bottom: 5px;
  color: white;
}

.videoCover .poster {
  width: 100%;
  height: 100%;
}

.avort {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: -10px;
}

.detial {
  line-height: 0.5rem;
  padding: 5px 10px;
}

.detial .span {
  background: #eee;
  border-radius: 15px;
  padding: 2px 10px;
  margin: 0 3px;
  font-size: 0.25rem;
}
</style>

<template>
  <mt-loadmore
    id="listWrap"
    :top-method="loadNew"
    :bottom-method="loadMore"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    :autoFill="false"
  >
    <div class="videoItem" v-for="(item, index) in dataList" :key="index">
      <!--文章新闻-->
      <div class="videoItem-wrap">
        <div class="videoWrap">
          <div class="videoCover" @click="playVideo(item)">
            <h3 class="title">{{ item.title }}</h3>
            <img class="poster" :src="item.cover" alt />
          </div>
          <video
            width="100%"
            height="200px"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="true"
            x5-video-player-fullscreen="false"
          >
            <source :src="item.mp4_url" />
          </video>
        </div>
        <div class="detial" @click="toDetail(item)">
          <img class="avort" :src="item.videoTopic.topic_icons" alt />
          <span class="span">{{ item.topicName }}</span>
          <span class="span">{{ item.videosource }}</span>
        </div>
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
import { Indicator } from "mint-ui";
import { URL as URL_PARAMS } from "../../urls-config";
import PARAMS from "../../../config/index";
export default {
  name: "myVideo",
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      dataList: [],
      title: "推荐",
      currentUrl: URL_PARAMS.videoUrl[this.title],
      allLoaded: false,
    };
  },
  created: function () {
    console.log(this.$route);

    if (this.dataList.length != 0) return;
    let title = this.$route.params.type ? this.$route.params.type : this.title;
    this.ajaxData({ title: title });
  },
  watch: {
    //监听路由变动情况
    $route: function (val, old) {
      this.title = val.params.type;
      this.ajaxData({ title: this.title });
    },
  },
  methods: {
    /*请求数据*/
    ajaxData: function (obj) {
      if (obj.loadMore) {
        this.currentUrl = this.transformUrl(this.currentUrl, "loadMore");
      } else if (obj.loadNew) {
        this.currentUrl = this.transformUrl(this.currentUrl, "loadNew");
      } else {
        this.currentUrl = URL_PARAMS.videoUrl[obj.title];
        if (this.$store.state.video_DATA[obj.title] != undefined) {
          this.dataList = this.$store.state.video_DATA[obj.title];
          return;
        }
      }

      Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      this.$http
        .jsonp(
          this.host_port + "?key=wy&url=" + encodeURIComponent(this.currentUrl)
        )
        .then(
          (res) => {
            Indicator.close();
            try {
              res = JSON.parse(JSON.parse(res.body));
              let dataArr = res["视频"];

              if (dataArr.length == 0) {
                this.allLoaded = true;
                return;
              }

              if (obj.loadMore) {
                this.dataList = this.dataList.concat(dataArr);
              } else if (obj.loadNew) {
                this.dataList = dataArr.concat(this.dataList);
              } else {
                this.dataList = dataArr;
              }

              /*更新state状态*/
              this.$store.commit("setData", {
                type: "video",
                title: obj.title,
                data: this.dataList,
              });

              console.log([obj.title, this.currentUrl, this.dataList]);
            } catch (err) {
              console.log(err);
            } finally {
              if (obj.loadMore) {
                //关闭loading状态
                this.$refs.loadmore.onBottomLoaded();
              } else if (obj.loadNew) {
                //关闭loading状态
                this.$refs.loadmore.onTopLoaded();
              }
            }
          },
          (res) => {
            console.log(res);
          }
        );
    },
    /*上拉加载更多*/
    loadMore: function () {
      this.ajaxData({ title: this.title, loadMore: true });
    },
    /*下拉刷新*/
    loadNew: function () {
      this.ajaxData({ title: this.title, loadNew: true });
    },
    /*跳转-》详情页*/
    toDetail: function (obj) {
      this.$router.push({
        name: "VideoDetail",
        query: {
          vid: obj.vid,
        },
      });
    },
    /*转换url*/
    transformUrl: function (url, key) {
      let arr1 = url.split("?");
      let str = arr1[1];
      let arr2 = str.split("&");
      for (var i = 0; i < arr2.length; i++) {
        let arr3 = arr2[i].split("=");
        if (key == "loadNew") {
          if (arr3[0] == "fn") {
            let num = Number(arr3[1]);
            num += 1;
            arr3[1] = num;
          }
        } else if (key == "loadMore") {
          if (arr3[0] == "offset") {
            let num = Number(arr3[1]);
            num += 10;
            arr3[1] = num;
          }
        }

        arr2[i] = arr3.join("=");
      }
      str = arr2.join("&");
      arr1[1] = str;
      let newUrl = arr1.join("?");
      this.currentUrl = newUrl;
      console.log(newUrl);
      return newUrl;
    },
    /*播放*/
    playVideo: function () {
      let event = event || window.event;
      event.currentTarget.style.display = "none";
      event.currentTarget.nextElementSibling.play();
    },
  },
};
</script>


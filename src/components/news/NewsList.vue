<!-- Add "scoped" attribute to limit CSS to this component only -->
<template>
  <mt-loadmore id="listWrap" :top-method="loadNew" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
    <div class="newsItem" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
      <template v-if="item.skipType !== 'live' && item.skipType != 'video'">
        <!--图片新闻-->
        <div class="newsItem-wrap" v-if="item.skipType == 'photoset'">
          <div class="left">
            <h3 class="title">{{ item.title }}</h3>
            <div class="detial">
              <span class="pubTime">{{ item.mtime.slice(0, -3) }}</span>
              <span class="reply">{{ item.replyCount }}跟帖</span>
            </div>
          </div>
          <div class="right">
            <img class="newsImg" :src="item.imgsrc" alt />
          </div>
        </div>
        <!--文章新闻-->
        <div class="newsItem-wrap" v-if="item.skipType == undefined">
          <mt-swipe :auto="4000" v-if="item.hasImg" style="height: 3rem">
            <mt-swipe-item>
              <img class="newsImg" v-lazy="item.imgsrc" alt />
            </mt-swipe-item>
            <!--<mt-swipe-item>3</mt-swipe-item>-->
          </mt-swipe>
          <div class="no-swipe">
            <div class="left" v-if="!item.hasImg">
              <h3 class="title">{{ item.title }}</h3>
              <div class="detial">
                <span class="source">{{ item.source }}</span>
                <span class="pubTime">{{ item.mtime.slice(5, -3) }}</span>
                <span class="reply">{{ item.replyCount }}跟帖</span>
              </div>
            </div>
            <div class="right" v-if="!item.hasImg">
              <img class="newsImg" :src="item.imgsrc" alt />
            </div>
          </div>
        </div>
        <!--专题新闻-->
        <div class="newsItem-wrap" v-if="item.skipType == 'special'">
          <div class="left">
            <h3 class="title">{{ item.title }}</h3>
            <div class="detial">
              <span class="special">专题</span>
              <span class="source">{{ item.source }}</span>
              <span class="reply">{{ item.replyCount }}跟帖</span>
            </div>
          </div>
          <div class="right">
            <img class="newsImg" :src="item.imgsrc" alt />
          </div>
        </div>
      </template>
    </div>
  </mt-loadmore>
</template>
<script lang="ts">
import Vue from "vue";
import URL_PARAMS from "@/util/urls-config";
import PARAMS from "@/../config/index";
import Dialog from "@/util/dialog";
import Service from "@/service/service";
export default Vue.extend({
  name: "NewsList",
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      dataList: [],
      title: "头条",
      currentUrl: "",
      allLoaded: false,
    };
  },
  created() {
    this.currentUrl = URL_PARAMS.urlArray[this.title];
    if (this.dataList.length != 0) return;
    this.title = this.$route.params.type || this.title;
    this.getNewsList();
  },
  mounted() {
    //详情页返回到新闻列表时回到原位置
    // let pageY = this.$store.state.Position[this.title];
    // document.getElementsByClassName('indexWrap')[0].scrollTop = pageY ? pageY.y : 0;
  },
  watch: {
    $route: function (val, old) {
      this.title = val.params.type;
      this.getNewsList();
    },
  },
  methods: {
    /*请求数据*/
    getNewsList(obj?) {
      if (!obj) {
        this.currentUrl = URL_PARAMS.urlArray[this.title];
        if (this.$store.state.news_DATA[this.title] != undefined) {
          //使用缓存数据
          this.dataList = this.$store.state.news_DATA[this.title];
          return;
        }
      } else if (obj.loadMore) {
        //加载更多
        this.currentUrl = this.transformUrl(this.currentUrl, "loadMore");
      } else if (obj.loadNew) {
        //加载更新
        this.currentUrl = this.transformUrl(this.currentUrl, "loadNew");
      }
      Dialog.showLoading(true);
      Service.getNewsList(this.currentUrl).then((res: any) => {
        Dialog.showLoading(false);
        try {
          res = JSON.parse(JSON.parse(res.body));

          let urlParamArr = this.currentUrl.split("/");
          let urlKey = urlParamArr[urlParamArr.length - 2];
          let dataArr = res[urlKey];

          if (dataArr.length == 0) {
            this.allLoaded = true;
            return;
          }
          if (!obj) {
            this.dataList = dataArr;
          } else if (obj.loadMore) {
            this.dataList = this.dataList.concat(dataArr);
          } else if (obj.loadNew) {
            this.dataList = dataArr.concat(this.dataList);
          }

          //缓存数据
          this.$store.commit("setData", {
            type: "news",
            title: this.title,
            data: this.dataList,
          });
          // $('img').hide();
          // console.log([obj.title, this.currentUrl, this.dataList]);
        } catch (err) {
          console.log(err);
          Dialog.confirm(
            {
              message: "网络错误，请刷新重试！",
              confirmButtonText: "刷新",
            },
            () => {
              this.getNewsList();
            }
          );
        } finally {
          let loadmore: any = this.$refs.loadmore;
          if (!obj || obj.loadNew) {
            loadmore.onTopLoaded();
          } else if (obj.loadMore) {
            loadmore.onBottomLoaded();
          }
        }
      });
    },
    /*上拉加载更多*/
    loadMore: function () {
      this.getNewsList({ loadMore: true });
    },
    /*下拉刷新*/
    loadNew: function () {
      this.getNewsList({ loadNew: true });
    },
    /*跳转-》详情页*/
    toDetail(obj) {
      if (obj.specialID) {
        this.$router.push({
          name: "special",
          query: {
            specialID: obj.specialID,
          },
        });
      } else {
        this.$router.push({
          name: "newsDetail",
          query: {
            postid: obj.postid,
            skipID: obj.skipID,
            docid: obj.docid,
            photosetID: obj.photosetID,
            setid: obj.setid,
            skipType: obj.skipType,
          },
        });
      }
    },
    /*转换url*/
    transformUrl: function (url, key) {
      let arr1 = url.split("/");
      let str = arr1[arr1.length - 1];
      let arr2 = str.split(".");
      let arr3 = arr2[0].split("-");
      if (key == "loadNew") {
        let startNum = Number(arr3[0]);
        startNum += 10;
        arr3[0] = startNum;
      } else if (key == "loadMore") {
        let endNum = Number(arr3[1]);
        endNum += 20;
        arr3[1] = endNum;
      }
      arr2[0] = arr3.join("-");
      str = arr2.join(".");
      arr1[arr1.length - 1] = str;
      let newUrl = arr1.join("/");
      return newUrl;
    },
  },
});
</script>
<style scoped>
.newsItem {
  min-height: 2rem;
  padding: 0.1rem 0.22rem;
  border-bottom: 1px solid #f5f7f9;
}

.newsItem-wrap {
  display: flex;
  /*height: 2rem;*/
}
.newsItem-wrap .no-swipe {
  height: 2rem;
  display: flex;
}

.left {
  width: 60%;
  padding: 0.1rem 0.1rem 0.1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  width: 40%;
  overflow: hidden;
  padding: 0.1rem 0.1rem 0.1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
  -webkit-line-clamp: 2; /*用来限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  margin-top: 0;
  margin-bottom: 5px;
}

.detial {
  line-height: 0.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.special,
.source,
.pubTime,
.reply {
  font-size: 0.2rem;
  color: #999;
  margin-right: 10px;
}

.special {
  color: red;
}

.newsImg {
  vertical-align: -webkit-baseline-middle;
  max-width: 100%;
  /*max-height: 100%;*/
}
</style>

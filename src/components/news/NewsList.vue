<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.pubTime {
  /*margin-right: 0.5rem;*/
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

<template>
  <mt-loadmore
    id="listWrap"
    :top-method="loadNew"
    :bottom-method="loadMore"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    :autoFill="false"
  >
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

<script>
import Vue from "vue";
import { Indicator, Lazyload, MessageBox } from "mint-ui";
import { URL as URL_PARAMS } from "@/urls-config";
import PARAMS from "@/../config/index";
import Common from "@/util/common.js";
console.log([PARAMS, Common]);
Vue.use(Lazyload);

export default {
  name: "myNews",
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      dataList: [],
      title: "头条",
      currentUrl: URL_PARAMS.urlArray[this.title],
      allLoaded: false,
    };
  },
  created: function () {
    if (this.dataList.length != 0) return;
    let title = this.$route.params.type ? this.$route.params.type : this.title;
    this.ajaxData({ title: title });
  },
  watch: {
    //监听路由变动情况
    $route: function (val, old) {
      this.title = val.params.type;
      //请求数据
      this.ajaxData({ title: this.title });
    },
  },
  mounted() {
    // Common.MessageBox.comfirm('删除')
    // Common.MessageBox.alert('hhhh')
     MessageBox({
              title: "提示",
              message: "网络错误，请刷新重试！",
              confirmButtonText: "刷新",
            }).then((action) => {
              this.ajaxData();
            });
    //详情页返回到新闻列表时回到原位置
    // let pageY = this.$store.state.Position[this.title];
    // document.getElementsByClassName('indexWrap')[0].scrollTop = pageY ? pageY.y : 0;
  },
  methods: {
    /*请求数据*/
    ajaxData: function (obj) {
      debugger
      if (obj.loadMore) {
        //加载更多
        this.currentUrl = this.transformUrl(this.currentUrl, "loadMore");
      } else if (obj.loadNew) {
        //加载更新
        this.currentUrl = this.transformUrl(this.currentUrl, "loadNew");
      } else {
        this.currentUrl = URL_PARAMS.urlArray[obj.title];
        if (this.$store.state.news_DATA[obj.title] != undefined) {
          //使用缓存数据
          this.dataList = this.$store.state.news_DATA[obj.title];
          return;
        }
      }

      Common.Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      this.$http.jsonp(this.host_port + "?key=wy&url=" + this.currentUrl).then(
        (res) => {
          Common.Indicator.close();

          try {
            res = JSON.parse(JSON.parse(res.body));

            let urlParamArr = this.currentUrl.split("/");
            let urlKey = urlParamArr[urlParamArr.length - 2];
            let dataArr = res[urlKey];

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

            //缓存数据
            this.$store.commit("setData", {
              type: "news",
              title: this.title,
              data: this.dataList,
            });

            // $('img').hide();

            console.log([obj.title, this.currentUrl, this.dataList]);
          } catch (err) {
            console.log(err);
            MessageBox({
              title: "提示",
              message: "网络错误，请刷新重试！",
              confirmButtonText: "刷新",
            }).then((action) => {
              this.ajaxData();
            });
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
};
</script>


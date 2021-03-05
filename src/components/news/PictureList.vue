<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.picItem {
  width: 96%;
  margin: 0 auto 0.2rem;
  border-bottom: 1px solid #f5f7f9;
  box-shadow: 0px 2px 2px 2px #ddd;
  display: block;
  color: #333;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.count {
  position: absolute;
  bottom: 0.7rem;
  right: 10px;
  color: white;
  background: rgba(1, 1, 1, 0.6);
  padding: 2px 4px;
  font-size: 13px;
  border-radius: 2px;
}

.imgCard {
  height: 4rem;
  overflow: hidden;
  display: flex;
  /*flex-direction: column;*/
  justify-content: space-between;
}

.imgCard img {
  width: 100%;
  height: 100%;
  /*width: fit-content;*/
  /*height: max-content;*/
}

.f {
  box-sizing: border-box;
  height: 4rem;
  overflow: hidden;
}

.top {
  height: 2rem;
  overflow: hidden;
  margin-bottom: 0.05rem;
}

.bottom {
  height: 2rem;
  overflow: hidden;
}

.footer {
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.2rem;
  line-height: 0.4rem;
}

.pTitle {
  width: 77%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reply {
  text-align: right;
  width: 20%;
  font-size: 0.25rem;
  color: #aaa;
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
    <div class="picItem" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
      <div class="newsItem-wrap">
        <b class="count">{{ item.imgsum + 'pics' }}</b>
        <div class="box1" v-if="index%4 == 0 || index%4 == 2 ">
          <div class="imgCard clear">
            <img :src="item.pics[0]" alt>
          </div>
          <div class="footer">
            <span class="pTitle">{{ item.setname }}</span>
            <span class="reply">{{ item.replynum + '跟贴' }}</span>
          </div>
        </div>
        <div class="box1" v-if=" index%4 == 1">
          <div class="imgCard clear">
            <div class="f fl" style="width: 70%;padding-right: 0.05rem;">
              <img :src="item.pics[0]" alt>
            </div>
            <div class="f fr" style="width: 30%;">
              <div class="top">
                <img :src="item.pics[1]" alt>
              </div>
              <div class="bottom">
                <img :src="item.pics[2]" alt>
              </div>
            </div>
          </div>
          <div class="footer">
            <span class="pTitle">{{ item.setname }}</span>
            <span class="reply">{{ item.replynum + '跟贴' }}</span>
          </div>
        </div>
        <div class="box1" v-if="index%4 == 3">
          <div class="imgCard clear">
            <div class="f fl" style="width: 30%;padding-right: 0.05rem;">
              <div class="top">
                <img :src="item.pics[1]" alt>
              </div>
              <div class="bottom">
                <img :src="item.pics[2]" alt>
              </div>
            </div>
            <div class="f fr" style="width: 70%">
              <img :src="item.pics[0]" alt>
            </div>
          </div>
          <div class="footer">
            <span class="pTitle">{{ item.setname }}</span>
            <span class="reply">{{ item.replynum + '跟贴' }}</span>
          </div>
        </div>
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
import { Indicator } from "mint-ui";
import { URL as URL_PARAMS } from "@/urls-config";
import PARAMS from "@/../config/index";

export default {
  // name: 'Picture',
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      title: "图片",
      dataList: [],
      currentUrl: URL_PARAMS.urlArray["图片"],
      allLoaded: false,

      newList:
        "http://c.m.163.com/photo/api/morelist/0096/54GI0096/128012.json",
      moreList:
        "http://c.m.163.com/photo/api/morelist/0096/54GI0096/128022.json"
    };
  },
  created: function() {
    //      console.log(this.$route);
    if (this.dataList.length != 0) return;
    let title = this.$route.params.type ? this.$route.params.type : this.title;
    this.ajaxData({ title: title });
    setTimeout(function() {
      // document.getElementsByClassName('indexWrap')[0].scrollTop = 0;
    });
  },
  watch: {},
  methods: {
    /*请求数据*/
    ajaxData: function(obj) {
      if (obj.loadMore) {
        this.currentUrl = this.transformUrl(this.moreList, "loadMore");
      } else if (obj.loadNew) {
        this.currentUrl = this.transformUrl(this.newList, "loadNew");
      } else {
        this.currentUrl = URL_PARAMS.urlArray[obj.title];
        if (this.$store.state.news_DATA[obj.title] != undefined) {
          this.dataList = this.$store.state.news_DATA[obj.title];
          return;
        }
      }

      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      });
      this.$http.jsonp(this.host_port + "?key=wy&url=" + this.currentUrl).then(
        res => {
          Indicator.close();

          res = JSON.parse(JSON.parse(res.body));

          if (obj.loadMore) {
            //关闭loading状态
            this.$refs.loadmore.onBottomLoaded();
            if (res.length == 0) {
              this.allLoaded = true;
              return;
            }
          } else if (obj.loadNew) {
            //关闭loading状态
            this.$refs.loadmore.onTopLoaded();
          }

          if (obj.loadMore) {
            this.dataList = this.dataList.concat(res);
            this.moreList = this.currentUrl;
          } else if (obj.loadNew) {
            this.dataList = res.concat(this.dataList);
            this.newList = this.currentUrl;
          } else {
            this.dataList = res;
          }

          /*更新state状态*/
          this.$store.commit("setData", {
            type: "news",
            title: obj.title,
            data: this.dataList
          });

          console.log([obj.title, this.currentUrl, this.dataList]);
        },
        res => {
          console.log(res);
        }
      );
    },
    /*上拉加载更多*/
    loadMore: function() {
      this.ajaxData({ title: this.title, loadMore: true });
    },
    /*下拉刷新*/
    loadNew: function() {
      this.ajaxData({ title: this.title, loadNew: true });
    },
    /*跳转-》详情页*/
    toDetail: function(obj) {
      this.$router.push({
        name: "newsDetail",
        query: {
          postid: obj.postid,
          skipID: obj.skipID,
          docid: obj.docid,
          photosetID: obj.photosetID,
          setid: obj.setid
        }
      });
    },
    /*转换url*/
    transformUrl: function(url, key) {
      let arr1 = url.split("/");
      let str = arr1[arr1.length - 1];
      let arr2 = str.split(".");
      let num = Number(arr2[0]);
      if (key == "loadNew") {
        num += 10;
      } else if (key == "loadMore") {
        num -= 10;
      }
      arr2[0] = num;
      str = arr2.join(".");
      arr1[arr1.length - 1] = str;
      let newUrl = arr1.join("/");
      console.log(newUrl);
      return newUrl;
    }
  }
};
</script>


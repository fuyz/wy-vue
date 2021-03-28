<style>
#commentDetailWrap {
  height: calc(100vh - 95px);
  position: relative;
  z-index: 20;
  overflow-y: scroll;
  margin-top: 40px;
}

.commentList {
  /*position: relative;*/
  /*top: 40px;*/
  /*margin-top: 40px;*/
  /*z-index: 2;*/
  background: white;
  min-height: calc(100vh - 95px);
  /*overflow-y: scroll;*/
  box-sizing: border-box;
}

.commentItem {
  padding: 0.2rem 0.2rem;
}

.user {
  line-height: 0.4rem;
}

.avatarWrap {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  vertical-align: 5px;
}

.avatar {
  width: 100%;
}

.userInfo {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 35px);
}

.name {
  color: rgb(48, 131, 251);
  font-size: 0.25rem;
}

.other span {
  margin-right: 5px;
  color: #999;
}

.content {
  font-size: 0.3rem;
  /*padding-left: 40px;*/
  color: #222;
}

#commentDetailWrap .commentWrap {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  line-height: 35px;
  font-size: 0.3rem;
  background: #fff;
  color: #ccc;
  padding: 0 5px;
  box-sizing: border-box;
}

#commentDetailWrap .comment-input {
  width: 95vw;
  display: inline-block;
  margin: 15px auto;
  outline: none;
  border-radius: 10px;
  background: transparent;
  border: 1px solid #ccc;
  padding: 3px 10px;
  box-sizing: border-box;
  color: #111;
}
</style><!-- Add "scoped" attribute to limit CSS to this component only -->

<template>
  <transition name="slide">
    <div id="commentDetailWrap">
      <mt-header fixed style="z-index: 5">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
      </mt-header>

      <mt-loadmore style="font-size: 0.3rem;" :bottom-method="loadMore" :bottom-all-loaded="allLoaded" ref="loadmore"
        :autoFill=false>
        <div class="commentList" v-html="html_structure">

        </div>
      </mt-loadmore>

      <div class="commentWrap">
        <input class="comment-input" type="text" placeholder="写跟帖">
      </div>

    </div>
  </transition>
</template>

<script>
import { Indicator } from "mint-ui";
import URL_PARAMS from "@/utils/urls-config";
import PARAMS from "../../../config/index";

export default {
  name: "comment",
  data() {
    return {
      host_port: "http://" + PARAMS.dev.host + ":" + PARAMS.dev.servePort,
      currentUrl: "",
      html_structure: "",
      allLoaded: false,
    };
  },
  created: function () {
    //      console.log(this.$route);
    let docid = this.$route.query.docid;
    let postid = this.$route.query.postid;
    let key = docid ? docid : postid;
    this.currentUrl =
      "http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/" +
      key +
      "/app/comments/hotList?offset=0&limit=10";
    this.ajaxData({});
  },
  mounted: function () {
    setTimeout(function () {
      document.getElementById("commentDetailWrap").scrollTop = 0;
    }, 1000);
  },
  watch: {},
  methods: {
    ajaxData: function (obj) {
      if (obj.loadMore) {
        this.currentUrl = this.transformUrl(this.currentUrl, "loadMore");
      } else if (obj.loadNew) {
        this.currentUrl = this.transformUrl(this.currentUrl, "loadNew");
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
              let commentIds = res.commentIds;
              let comments = res.comments;
              let commentArr = [];

              for (let i = 0; i < commentIds.length; i++) {
                let ids = commentIds[i].split(",");
                if (ids.length > 1) {
                  //如果有回复
                  let obj1, obj2;
                  for (let j = 0; j < ids.length; j++) {
                    if (j + 1 < ids.length) {
                      //如果当前元素不是最后一个
                      obj1 = JSON.parse(JSON.stringify(comments[ids[j]]));
                      obj2 = JSON.parse(JSON.stringify(comments[ids[j + 1]]));
                      obj2.otherComment = obj1;
                    } else {
                      //如果当前元素是最后一个
                      commentArr.push(obj2);
                    }
                  }
                } else {
                  //如果无回复
                  commentArr.push(comments[ids[0]]);
                }
              }
              let str = "";
              for (let i = 0; i < commentArr.length; i++) {
                if (!commentArr[i]) {
                  continue;
                }
                if (commentArr[i].otherComment == undefined) {
                  getDom(commentArr[i], false);
                } else {
                  getDom(commentArr[i], true);
                }

                function getDom(obj, reply) {
                  obj.user.avatar = obj.user.avatar
                    ? obj.user.avatar
                    : "http://img1.cache.netease.com/t/img/default80.png";
                  if (!reply) {
                    str += `
                     <div class="commentItem" style="border-bottom: 2px solid #eee;">
                      <div class="user">
                        <div class="avatarWrap">
                          <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                          <p class="name">${
                            obj.user.nickname ? obj.user.nickname : "***"
                          } <span class="sText fr gray" >${
                      obj.vote
                    }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${obj.user.location}</span>
                            <span>${obj.deviceInfo.deviceName}</span>
                            <span>${obj.createTime.slice(0, -3)}</span>
                          </p>
                        </div>
                      </div>
                      <p class="content">${obj.content}</p>
                    </div>`;
                  } else if (obj.otherComment != undefined && reply) {
                    let otherCommentStr = getDom(obj.otherComment, true);
                    str += `
                     <div class="commentItem" style="border-bottom: 2px solid #eee;">
                      <div class="user">
                        <div class="avatarWrap">
                          <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                          <p class="name">${
                            obj.user.nickname ? obj.user.nickname : "***"
                          }<span class="sText fr gray" >${
                      obj.vote
                    }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${obj.user.location}</span>
                            <span>${obj.deviceInfo.deviceName}</span>
                            <span>${obj.createTime.slice(0, -3)}</span>
                          </p>
                        </div>
                      </div>
                      <div class="content">
                        <p>${obj.content}</p>
                         <div class="box" style="border: 1px solid #eee">${otherCommentStr}</div>
                      </div>
                    </div>`;
                  } else if (obj.otherComment == undefined && reply) {
                    let string = `
                     <div class="commentItem" >
                      <div class="user">
                        <div class="avatarWrap">
                          <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                          <p class="name">${
                            obj.user.nickname ? obj.user.nickname : "***"
                          }<span class="sText fr gray" >${
                      obj.vote
                    }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${obj.user.location}</span>
                            <span>${obj.deviceInfo.deviceName}</span>
                            <span>${obj.createTime.slice(0, -3)}</span>
                          </p>
                        </div>
                      </div>
                      <p class="content">${obj.content}</p>
                    </div>`;

                    return string;
                  }
                }
              }
              console.log([this.currentUrl, commentArr]);
              this.html_structure = str;
            } catch (err) {
              console.log(err);
            } finally {
              //关闭loading状态
              this.$refs.loadmore.onBottomLoaded();
              if (res.code == 42212) {
                this.allLoaded = true;
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
      this.ajaxData({ loadMore: true });
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
          if (arr3[0] == "limit") {
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
      return newUrl;
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
};
</script>



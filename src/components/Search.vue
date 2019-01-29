<style>
  #searchWrap {
    height: calc(100vh - 45px);
    position: relative;
    z-index: 20;
    background: white ;
    overflow-y: scroll;
    padding-top: 52px;
  }

  .searchHead {
    width: 100%;
    height: 52px;
    position: fixed;
    top: 0;
    z-index: 20;
    font-size: 0.25rem;
  }

  .mint-loadmore {
    /*height: calc(100vh - 35px);*/
  }

  .searchList {
    /*position: relative;*/
    /*top: 40px;*/
    /*margin-top: 40px;*/
    /*z-index: 2;*/
    background: white;
    min-height: calc(100vh - 55px);
    /*overflow-y: scroll;*/
    box-sizing: border-box;
  }

  .speachItem {
    height: 2rem;
    padding: .24rem .22rem 0;
    border-bottom: 1px solid #f5f7f9;
  }

  .speachItem-wrap {
    display: flex;
    height: 100%;
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

  .special, .source, .pubTime, .reply {
    font-size: 0.2rem;
    color: #999;
    margin-right: 10px;
  }

  .special {
    color: red;
  }

  .newsImg {
    vertical-align: -webkit-baseline-middle;
    width: 100%;
    max-height: 100%;
  }

</style><!-- Add "scoped" attribute to limit CSS to this component only -->

<template>
  <transition name="slide">
    <div id="searchWrap">
      <mt-search class="searchHead"
                 cancel-text="取消"
                 placeholder="搜索">
      </mt-search>

      <mt-loadmore
        id="listWrap"
        style="font-size: 0.3rem;"
        :bottom-method="loadMore"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :autoFill=false
      >
        <!--文章新闻-->
        <div class="searchItem" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
          <div class="searchItem-wrap" v-if="item.skipType == undefined">
            <mt-swipe :auto="4000" v-if="item.hasImg">
              <mt-swipe-item>
                <img class="newsImg" :src="item.imgsrc" alt="">
              </mt-swipe-item>
              <!--<mt-swipe-item>3</mt-swipe-item>-->
            </mt-swipe>
            <div class="left" v-if="!item.hasImg">
              <h3 class="title">{{ item.title }}</h3>
              <div class="detial">
                <span class="source">{{ item.source }}</span>
                <span class="pubTime">{{ item.mtime.slice(5, -3) }}</span>
                <span class="reply">{{ item.replyCount }}跟帖</span>
              </div>
            </div>
            <div class="right" v-if="!item.hasImg">
              <img class="newsImg" :src="item.imgsrc" alt="">
            </div>
          </div>
        </div>

      </mt-loadmore>


    </div>
  </transition>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Header} from 'mint-ui';
  import { URL as URL_PARAMS } from '../urls-config';
  import PARAMS from '../../config/index';

  export default {
    name: 'comment',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        currentUrl: '',
        dataList: [],
        allLoaded: false,
      }
    },
    created: function () {
      console.log(this.$route);
      let docid = this.$route.query.docid;
      let postid = this.$route.query.postid;
      let key = docid ? docid : postid;
      this.currentUrl = 'http://c.m.163.com/search/comp2/Kg%3D%3D/20/6buE5rW35rOi.html?deviceId=uxGr11o3NAPfZGlyCllTkHr2kKvBJ%2Fpli9SInyoBygw%2FSoTJgjnVV7%2Ft0WxZ27gS&version=newsclient.37.2.android&channel=VDEzNDg2NDc5MDkxMDc%3D&canal=b3Bwb19zdG9yZTIwMTRfbmV3cw%3D%3D&dtype=0&tabname=zonghe&qId=MTYyMDA4NjIyMjQzMjUx&position=5pCc57Si5Y6G5Y%2By&ts=1529044030&lat=X%2Fnl%2BNAym6VpiFBmfD0QKQ%3D%3D&lon=NLt2AapSR2nOrohszqrfdg%3D%3D&sign=s%2FmCxjkFMQtF5JsD407FmZBDIGArZFbXmbjPk5Q%2FBtF48ErR02zJ6%2FKXOnxX046I&spever=FALSE&open=scheme_%E9%BB%98%E8%AE%A4&openpath=/doc/DKBLBTJ70517JVUJ';
      this.ajaxData({});

    },
    mounted: function () {

      setTimeout(function () {
//        document.getElementById('commentDetailWrap').scrollTop = 0
      }, 1000);

    },
    watch: {},
    methods: {
      ajaxData: function (obj) {

        if (obj.loadMore) {
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadMore');
        } else if (obj.loadNew) {
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadNew');
        }
        console.log(this.currentUrl);

        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });

        this.$http.jsonp(this.host_port + '?key=wy&url=' + encodeURIComponent(this.currentUrl)).then((res) => {
          Indicator.close();

          try {

            res = JSON.parse(JSON.parse(res.body));
            let commentIds = res.commentIds;
            let comments = res.comments;
            let commentArr = [];

            for (let i = 0; i < commentIds.length; i++) {
              let ids = commentIds[i].split(',');
              if (ids.length > 1) {//如果有回复
                let obj1, obj2;
                for (let j = 0; j < ids.length; j++) {
                  if (j + 1 < ids.length) {//如果当前元素不是最后一个
                    obj1 = JSON.parse(JSON.stringify(comments[ids[j]]));
                    obj2 = JSON.parse(JSON.stringify(comments[ids[j + 1]]));
                    obj2.otherComment = obj1;
                  } else {//如果当前元素是最后一个
                    commentArr.push(obj2);
                  }
                }
              } else {//如果无回复
                commentArr.push(comments[ids[0]]);
              }
            }
            let str = '';
            for (let i = 0; i < commentArr.length; i++) {

              if (commentArr[i].otherComment == undefined) {
                getDom(commentArr[i], false);
              } else {
                getDom(commentArr[i], true);
              }

              function getDom(obj, reply) {
                obj.user.avatar = obj.user.avatar ? obj.user.avatar : 'http://img1.cache.netease.com/t/img/default80.png';
                if (!reply) {
                  str += `
                     <div class="commentItem" style="border-bottom: 2px solid #eee;">
                      <div class="user">
                        <div class="avatarWrap">
                          <img class="avatar" src="${obj.user.avatar}" alt="">
                        </div>
                        <div class="userInfo">
                          <p class="name">${ obj.user.nickname ? obj.user.nickname : '***' } <span class="sText fr gray" >${ obj.vote }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${ obj.user.location }</span>
                            <span>${ obj.deviceInfo.deviceName }</span>
                            <span>${ obj.createTime.slice(0, -3) }</span>
                          </p>
                        </div>
                      </div>
                      <p class="content">${ obj.content }</p>
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
                          <p class="name">${ obj.user.nickname ? obj.user.nickname : '***' }<span class="sText fr gray" >${ obj.vote }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${ obj.user.location }</span>
                            <span>${ obj.deviceInfo.deviceName }</span>
                            <span>${ obj.createTime.slice(0, -3) }</span>
                          </p>
                        </div>
                      </div>
                      <div class="content">
                        <p>${ obj.content }</p>
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
                          <p class="name">${ obj.user.nickname ? obj.user.nickname : '***' }<span class="sText fr gray" >${ obj.vote }<i class="icon zan_icon"></i></span></p>
                          <p class="other sText">
                            <span>${ obj.user.location }</span>
                            <span>${ obj.deviceInfo.deviceName }</span>
                            <span>${ obj.createTime.slice(0, -3) }</span>
                          </p>
                        </div>
                      </div>
                      <p class="content">${ obj.content }</p>
                    </div>`;

                  return string;
                }

              }

            }
            console.log(commentArr);
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

        }, (res) => {
          console.log(res)
        });

      },
      /*上拉加载更多*/
      loadMore: function () {
        this.ajaxData({loadMore: true});
      },
      toDetail: function (obj) {
        if( obj.specialID ){
          this.$router.push({
            name: 'special',
            query: {
              specialID: obj.specialID
            }
          })


        }else {
          this.$router.push({
            name: 'newsDetail',
            query: {
              postid: obj.postid,
              skipID: obj.skipID,
              docid: obj.docid,
              photosetID: obj.photosetID,
              setid: obj.setid,
              skipType: obj.skipType,
            }
          })
        }
      },
      /*转换url*/
      transformUrl: function (url, key) {
        let arr1 = url.split('?');
        let str = arr1[1];
        let arr2 = str.split('&');
        for (var i = 0; i < arr2.length; i++) {
          let arr3 = arr2[i].split('=');
          if (key == 'loadNew') {
            if (arr3[0] == 'fn') {
              let num = Number(arr3[1]);
              num += 1;
              arr3[1] = num;
            }
          } else if (key == 'loadMore') {
            if (arr3[0] == 'limit') {
              let num = Number(arr3[1]);
              num += 10;
              arr3[1] = num;
            }
          }

          arr2[i] = arr3.join('=');
        }
        str = arr2.join('&');
        arr1[1] = str;
        let newUrl = arr1.join('?');
        this.currentUrl = newUrl;
        return newUrl;

      },
      goBack: function () {
        this.$router.go(-1)
      }
    }

  }
</script>



<style src="@/css/newsDetail.css" scoped=""></style>
<template>
  <transition name="slide">
    <div id="newsDetailWrap">
      <mt-header fixed style="z-index: 5">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <mt-button slot="right" v-if="data.replyCount">
          <div @click="toComment(data)">{{ data.replyCount + '跟帖'}}</div>
        </mt-button>
      </mt-header>

      <!--文章新闻-->
      <div id="newsDetailContent" v-if=" key == 'article'">
        <h1 class="title">{{ data.title }}</h1>
        <div id="secHeadWrap">
          <span id="source" class="sText">{{ data.source }}</span>
          <span id="ptime" class="sText">{{ data.ptime.slice(0, -3) }}</span>
        </div>
        <div v-html="html_structure"></div>
        <p id='ec' class="sText">{{ '责任编辑：' + data.ec }}</p>
        <div class="searchKwList">
          <span class="searchKw" v-for="(item, i) in data.searchKw" :key="i" @click="toSearch(item)">{{ item.keyword }}</span>
        </div>
      </div>
      <!--图片新闻1-->
      <div class="imgContent swiper-container" v-if="key == 'picture'">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item , index) in pictureArr" :key="index">
            <img :src="item.imgurl" alt="">
            <div class="pic-des">
              <span class="currentNum">{{ index + 1 }}</span><span class="countNum">/ {{ pictureArr.length }}</span>
              <p class="pic-title">{{ data.setname }}</p>
              <p class="pic-note sText">
                {{ item.imgtitle }}
                {{ item.note }}
              </p>
            </div>
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <!--<div class="swiper-button-prev swiper-button-white"></div>-->
        <!--<div class="swiper-button-next swiper-button-white"></div>-->

      </div>
      <!--图片新闻2-->
      <div class="imgContent swiper-container" v-if="key == 'pic'">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item , index) in pictureArr" :key="index">
            <img :src="item.imgurl" alt="">
            <div class="pic-des">
              <span class="currentNum">{{ index + 1 }}</span><span class="countNum">/ {{ pictureArr.length }}</span>
              <p class="pic-title">{{ data.setname }}</p>
              <p class="pic-note sText">
                {{ item.imgtitle }}
                {{ item.note }}
              </p>
            </div>
          </div>
        </div>

      </div>
      <!--段子-->
      <div id="dzContent" v-if="key == 'dz'">
        <p class="title">{{ data.title }}</p>
        <!--<div id="secHeadWrap">-->
        <!--<span id="source" class="sText">{{ data.source }}</span>-->
        <!--<span id="ptime" class="sText">{{ data.ptime.slice(0, -3) }}</span>-->
        <!--</div>-->
        <div v-html="html_structure"></div>
        <div class="footer">
          <span class="sText"><i class="icon laugh_icon"></i>{{ data.laughWeight }}</span>
          <span class="sText"><i class="icon love_icon"></i>{{ data.enjoyWeight }}</span>
          <span class="sText"><i class="icon bored_icon"></i>{{ data.boredWeight }}</span>
        </div>
      </div>

      <div class="commentWrap">
        <input class="comment-input" type="text" placeholder="写跟帖">
        <div class="icon comment" @click="toComment(data)">{{ data.replyCount }}</div>
        <span class="icon favorite"></span>
        <span class="icon share"></span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { Indicator, Header} from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  import URL_PARAMS from '../../urls-config';
  import PARAMS from '../../../config/index';

  export default {
    name: 'detail',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        currentUrl: '',
        data: {
          replyCount: '',
          ptime: ''
        },
        html_structure: '',
        pictureArr: null,
        key: 'article'

      }
    },
    created: function () {
      let postid = this.$route.query.postid;
      let skipID = this.$route.query.skipID;
      let photosetID = this.$route.query.photosetID;
      let docid = this.$route.query.docid;
      let setid = this.$route.query.setid;
      let skipType = this.$route.query.skipType;
      if (setid != undefined) {
        //图片详情
        this.currentUrl = 'http://c.m.163.com/photo/api/set/0096/' + setid + '.json';
        this.key = 'pic';
      } else if (photosetID != undefined) {
        //图片新闻
        let ID = '';
        ID = photosetID.slice(4);
        ID = ID.replace(/\|/, '/');
        this.currentUrl = 'http://c.3g.163.com/photo/api/set/' + ID + '.json';
        this.key = 'picture';
      } else if (docid != undefined) {
        //文章新闻、段子详情
        this.currentUrl = 'http://c.m.163.com/nc/article/' + docid + '/full.html';
        if (skipType == 'dz') {
          this.key = 'dz';
        } else {
          this.key = 'article';
        }
      }
      getData.bind(this)();
//    请求新闻详情信息
      function getData() {
        Indicator.open({
          text: '加载中123...',
          spinnerType: 'snake'
        });
        this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then((res) => {
          Indicator.close();
          try {
            res = JSON.parse(JSON.parse(res.body));
            if (setid != undefined) {
              this.data = res;
              this.pictureArr = res.photos;
            } else if (skipID == undefined || skipID.indexOf('|') == -1) {
              let urlParamArr = this.currentUrl.split('/');
              let urlKey = urlParamArr[urlParamArr.length - 2];
              this.data = res[urlKey];
            } else {
              this.data = res;
              this.pictureArr = res.photos;
            }
            console.log([this.currentUrl, this.data]);
          } catch (err) {
            console.log(err);
            MessageBox({
              title: '提示',
              message: '网络错误，请刷新重试！',
              confirmButtonText: '刷新'
            }).then(action => {
              getData.bind(this)();
            });
          } finally {

          }


        }, (res) => {
          console.log(res)
        });
      }

//      请求评论数据
      /* this.$http.jsonp(this.host_port + '?key=wy&url=' + 'http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=10&offset=0&fn=1').then((res) => {
         Indicator.close();
         try {
           debugger
           let json = JSON.parse(res.body);
           res = Boolean(json) ? JSON.parse(json) : '';
         } catch (err) {
           debugger
           console.log(err);
           MessageBox({
             title: '提示',
             message: '网络错误，请刷新重试！',
             confirmButtonText: '刷新'
           }).then(action => {
             window.location.reload();
           });
         } finally {

         }


       }, (res) => {
         console.log(res)
       }).then(function () {

       });*/

    },
    updated: function () {
      this.pictureNews();
      this.articleNews();
    },
    watch: {},
    methods: {
      /*返回*/
      goBack: function () {
        this.$router.go(-1)
      },
      /*跳转-》详情页*/
      toComment: function (obj) {
        this.$router.push({
          name: 'comment',
          query: {
            docid: obj.docid,
            postid: obj.postid
          }
        })
      },
      /*去搜索页*/
      toSearch: function (obj) {
        this.$router.push({
          name: 'search',
          query: {
            keyword: obj.keyword,
          }
        })
      },
      /*渲染图片文章*/
      pictureNews: function () {
        if(document.getElementsByClassName('swiper-container').length == 0)return;
        var mySwiper = new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          // 如果需要前进后退按钮
          navigation: {
//              nextEl: '.swiper-button-next',
//              prevEl: '.swiper-button-prev s',
          },
        })

      },
      /*渲染文本文章*/
      articleNews: function () {
        let body = this.data.body;
        if(typeof body == 'undefined')return;
        let video = this.data.video == undefined ? [] : this.data.video;
        let img = this.data.img == undefined ? [] : this.data.img;
        //转换video标签
        if (video.length != 0) {
          for (let i = 0; i < video.length; i++) {
            body = body.replace(video[i].ref, '<video src="' + video[i].mp4_url + '"></video>')
          }
        }
        //转换img标签
        if (img.length != 0) {
          for (let i = 0; i < img.length; i++) {
            let width = img[i].pixel.split('*')[0];
            let height = img[i].pixel.split('*')[1];
            body = body.replace(img[i].ref, '<img src="' + img[i].src + '" title="' + img[i].alt + '" style="max-width: 100%;display: block;margin: 0.1rem auto"><p style="color: #888;font-size: 0.2rem;line-height: 0.2rem;margin: 0.2rem 0 0.2rem">"' + img[i].alt + '</p>')
          }
        }
        this.html_structure = body;
      }
    }

  }
</script>

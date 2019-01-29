<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #videoDetailWrap {
    height: calc(100vh - 40px);
    overflow-y: scroll;
    position: relative;
    top: 40px;
    z-index: 20;
    background: white;
  }
  .videoDetailMain{
    margin-top: 200px;
  }
  .videoWrap {
    width: 100%;
    height: 200px;
    position: fixed;
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
  .videoCover .poster {
    width: 100%;
    height: 100%;
  }
  .infoWrap{
    padding: 10px 0;
    font-size: 0;
  }
  .infoWrap .title{
    padding: 0 10px;
  }
  .videoTagList {
    /*margin-top: 0px;*/
    margin: 10px 0;
  }
  .videoTag{
    display: inline-block;
    background: #eee;
    padding: 0.08rem 0.25rem;
    border-radius: 15px;
    margin: 0 10px;
    font-size: 0.28rem;
  }

  .videoTopic{
    font-size: 0;
    padding: 8px 10px;
    background: #eee;
  }
  .videoTopic_icon{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    vertical-align: -0.25rem;
    margin-right: 10px;
  }
  .videoTopic_title{
    font-size: 0.25rem;
  }
  .subscibe{
    float: right;
    border-radius: 15px;
    background: #aaa;
    outline: none;
    padding: 0.1rem 0.3rem;
    display: inline-block;
    color: white;
    margin: 0.03rem 0;
    border: 0;
  }

</style>

<template>

  <transition name="slide">
    <div id="videoDetailWrap" v-if="data">
      <mt-header fixed style="z-index: 5">
        <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        <!--<mt-button slot="right" v-if="data.replyCount">-->
        <!--<div @click="toComment(data)">{{ data.replyCount + '跟帖'}}</div>-->
        <!--</mt-button>-->
      </mt-header>
      <div class="videoWrap">
        <div class="videoCover" @click="playVideo">
          <img class="poster" :src="data.cover" alt="">
        </div>
        <video width="100%" height="200px"
               webkit-playsinline="true" playsinline="true"
               x-webkit-airplay="true"
               x5-video-player-fullscreen="false">
          <source :src="data.mp4_url" >
        </video>
      </div>
      <div class="videoDetailMain">
        <div class="infoWrap">
          <p class="title">{{ data.title }}</p>
          <div class="videoTagList">
            <span class="videoTag" v-for="(item, index) in data.videoTag" v-if="index < 3">{{ item }}</span>
          </div>
        </div>
        <div class="videoTopic">
          <img class="videoTopic_icon" :src="data.videoTopic.topic_icons" alt="">
          <span class="videoTopic_title">{{data.videoTopic.alias}}</span>
          <button class="subscibe">+订阅</button>
        </div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
        <div>h2</div>
      </div>
    </div>
  </transition>

</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Header} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import URL_PARAMS from '../urls-config';
  import PARAMS from '../../config/index';

  export default {
//    name: 'myNews',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        currentUrl: '',
        data: null
      }
    },
    created: function () {
      console.log(this.$route);
      let vid = this.$route.query.vid;
      this.currentUrl = 'http://c.m.163.com/nc/video/detail/' + vid + '.html';
      this.ajaxData({});

    },
    watch: {},
    methods: {
      goBack: function () {
        this.$router.go(-1)
      },
      /*请求数据*/
      ajaxData: function (obj) {

        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then((res) => {
          Indicator.close();
          try {
            res = JSON.parse(JSON.parse(res.body));
            this.data = res;

            /*更新state状态*/
//            this.$store.commit('setData', {
//              type: 'news',
//              title: obj.title,
//              data: this.dataList
//            });

            console.log([this.currentUrl, this.data]);

          }
          catch (err) {
            console.log(err);
            MessageBox({
              title: '提示',
              message: '网络错误，请刷新重试！',
              confirmButtonText: '刷新'
            }).then(action => {
              this.ajaxData();
            });
          }
          finally {

          }

        }, (res) => {
          console.log(res)
        });

      },
      /*播放*/
      playVideo: function () {
        let event = event || window.event;
        event.currentTarget.style.display = 'none';
        event.currentTarget.nextElementSibling.play();
      }
    }

  }
</script>


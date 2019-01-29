<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*新闻列表样式*/
  #specialWrap {
    position: relative;
    z-index: 15;
    font-size: 0.3rem;
    margin-top: 40px;
    background: white;
    /*height: calc(100vh - 101px);*/
    /*overflow-y: scroll;*/
  }

  .newsItem {
    height: 2rem;
    padding: .24rem .22rem 0;
    border-bottom: 1px solid #efefef;
    width: 100%;
    display: flex;
    box-sizing: border-box
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

  .cellWrap{

  }
  .cell {
    border-radius: 15px;
    display: inline-block;
    border: 1px solid #bbb;
    text-align: center;
    padding: 0.05rem 0.1rem;
    font-size: 0.25rem;
    width: 1.4rem;
    margin: 0.1rem;
    color: #222;
  }
  .banner{
    width: 100%;
  }
  .newsItem-title{
    background: #ddd;
    font-size: 0.25rem;
    padding: 5px 10px;
  }
</style>

<template>

  <div id="specialWrap">
    <mt-header fixed style="z-index: 5">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
    </mt-header>
    <header>
      <img class="banner" :src="dataList.banner" alt="">
      <div class="cellWrap">
        <div @click="fyz(index)" class="cell" v-for="(item, index) in dataList.topics" :key="index">{{ item.shortname }}</div>
      </div>

    </header>

    <div class="" v-for="(item, index) in dataList.topics">
      <div class="newsItem-title" :id="index">{{ ++index +'/'+ dataList.topics.length }} {{ item.tname }}</div>
      <div class="newsItem" v-for="(e, i) in item.docs"  @click="toDetail(e)">
        <div class="left">
          <h3 class="title">{{ e.title }}</h3>
          <div class="detial">
            <span class="source">{{ e.source }}</span>
            <span class="pubTime">{{ e.ptime.slice(5, -3) }}</span>
            <span class="reply">{{ e.replyCount }}跟帖</span>
          </div>
        </div>
        <div class="right" >
          <img class="newsImg" :src="e.imgsrc" alt="">
        </div>
      </div>


    </div>

  </div>


</template>

<script>
  import {Indicator} from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  import { URL as URL_PARAMS } from '../urls-config';
  import PARAMS from '../../config/index';

  export default {
//    name: 'myNews',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        dataList: [],
        currentUrl: URL_PARAMS.urlArray[this.title],
        allLoaded: false,

      }
    },
    created: function () {
      console.log(this.$route);
      let specialID = this.$route.query.specialID;
      this.currentUrl = 'http://c.m.163.com/nc/special/' + specialID + '.html';
      console.log(this.currentUrl);

      getData.bind(this)();
      function getData() {
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then((res) => {
          Indicator.close();
          try {
            res = JSON.parse(JSON.parse(res.body));
            this.dataList = res[specialID];
            console.log(this.dataList);
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


    },
    watch: {
      //监听路由变动情况
      $route: function (val, old) {
        this.title = val.params.type;
        this.ajaxData({title: this.title});
      }
    },
    methods: {
      goBack: function () {
        this.$router.go(-1)
      },
      /*跳转-》详情页*/
      toDetail: function (obj) {
        if (obj.specialID) {
          this.$router.push({
            name: 'special',
            query: {
              specialID: obj.specialID
            }
          })

        } else {
          this.$router.push({
            name: 'newsDetail',
            query: {
              postid: obj.postid,
              skipID: obj.skipID,
              docid: obj.docid,
              photosetID: obj.photosetID,
              setid: obj.setid,
            }
          })
        }
      },
      fyz: function (index) {
        let scrollTop = document.getElementById(index).offsetTop;
        document.getElementById('app').scrollTop = scrollTop;
      }

    }

  }
</script>


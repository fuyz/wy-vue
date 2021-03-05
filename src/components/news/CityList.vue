<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*新闻列表样式*/

  .newsItem {
    height: 2rem;
    padding: .24rem .22rem 0;
    border-bottom: 1px solid #f5f7f9;
  }

  .newsItem-wrap{
    display: flex;
  }

  /*.left {*/
    /*width: 60%;*/
    /*padding: 0.1rem 0.1rem 0.1rem 0;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: space-between;*/

  /*}*/

  /*.right {*/
    /*width: 40%;*/
  /*}*/

  /*.title {*/
    /*font-size: 0.3rem;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box; !*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*!*/
    /*-webkit-line-clamp: 2; !*用来限制在一个块元素显示的文本的行数*!*/
    /*-webkit-box-orient: vertical;*/
    /*margin-top: 0;*/
    /*margin-bottom: 5px;*/
  /*}*/

  /*.detial {*/
    /*line-height: 0.5rem;*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
  /*}*/

  /*.pubTime {*/
    /*!*margin-right: 0.5rem;*!*/
  /*}*/

  /*.special, .source, .pubTime, .reply {*/
    /*font-size: 0.2rem;*/
    /*color: #999;*/
    /*margin-right: 10px;*/
  /*}*/
  /*.special{*/
    /*color: red;*/
  /*}*/

  /*.newsImg {*/
    /*vertical-align: -webkit-baseline-middle;*/
    /*width: 100%;*/
    /*max-height: 100%;*/
  /*}*/
</style>

<template>

  <mt-loadmore id="listWrap"
               :top-method="loadNew"
               :bottom-method="loadMore"
               :bottom-all-loaded="allLoaded"
               ref="loadmore"
               :autoFill=false
  >

    <div class="newsItem" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
      <!--图片新闻-->
      <div class="newsItem-wrap">
        <div class="left">
          <h3 class="title">{{ item.title }}</h3>
          <div class="detial">
            <span class="pubTime">{{ item.mtime.slice(0, -3) }}</span>
            <span class="reply">{{ item.replyCount }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img class="newsImg" :src="item.imgsrc" alt="">
        </div>
      </div>
      <!--文章新闻-->
      <div class="newsItem-wrap" >
        <div class="left">
          <h3 class="title">{{ item.title }}</h3>
          <div class="detial">
            <span class="source">{{ item.source }}</span>
            <span class="pubTime">{{ item.mtime.slice(5, -3) }}</span>
            <span class="reply">{{ item.replyCount }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img class="newsImg" :src="item.imgsrc" alt="">
        </div>
      </div>
      <!--专题新闻-->
      <div class="newsItem-wrap" >
        <div class="left">
          <h3 class="title">{{ item.title }}</h3>
          <div class="detial">
            <span class="special">专题</span>
            <span class="source">{{ item.source }}</span>
            <span class="reply">{{ item.replyCount }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img class="newsImg" :src="item.imgsrc" alt="">
        </div>
      </div>
    </div>

  </mt-loadmore>

</template>

<script>
  import {Indicator} from 'mint-ui';
  import { URL as URL_PARAMS } from '../../urls-config';
  import PARAMS from '../../../config/index';

  export default {
    name: 'myNews',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        dataList: [],
        title: '深圳',
        currentUrl: URL_PARAMS.urlArray[this.title],
        allLoaded: false,

      }
    },
    created: function () {

      if (this.dataList.length != 0) return;
      let title = this.$route.params.type ? this.$route.params.type : this.title;
      this.ajaxData({title: title});

    },
    watch: {
      //监听路由变动情况
      $route: function (val, old) {
        this.title = val.params.type;
        this.ajaxData({title: this.title});
      }
    },
    methods: {
      /*请求数据*/
      ajaxData: function (obj) {

        if(obj.loadMore){
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadMore');
        }else if(obj.loadNew){
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadNew');
        }else {
          this.currentUrl = URL_PARAMS.urlArray[obj.title];
        }

        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then((res) => {
          Indicator.close();
          res = JSON.parse(JSON.parse(res.body));

          let dataArr = res[this.title];

          if(obj.loadMore){
            //关闭loading状态
            this.$refs.loadmore.onBottomLoaded();
            if (dataArr.length == 0) {
              this.allLoaded = true;
              return;
            }
          }else if(obj.loadNew){
            //关闭loading状态
            this.$refs.loadmore.onTopLoaded();
          }
          this.dataList = dataArr;

          console.log([obj.title,this.currentUrl, this.dataList ]);

        }, (res) => {
          console.log(res)
        });

      },
      /*上拉加载更多*/
      loadMore: function () {
        this.ajaxData({title: this.title,loadMore: true});
      },
      /*下拉刷新*/
      loadNew: function () {
        this.ajaxData({title: this.title,loadNew: true});
      },
      /*跳转-》详情页*/
      toDetail: function (obj) {
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
      },
      /*转换url*/
      transformUrl: function (url, key) {
        let arr1 = url.split('/');
        let str = arr1[arr1.length - 1];
        let arr2 = str.split('.');
        let arr3 = arr2[0].split('-');
        if (key == 'loadNew') {
          let startNum = Number(arr3[0]);
          startNum += 10;
          arr3[0] = startNum;
        } else if (key == 'loadMore') {
          let endNum = Number(arr3[1]);
          endNum += 20;
          arr3[1] = endNum;
        }
        arr2[0] = arr3.join('-');
        str = arr2.join('.');
        arr1[arr1.length - 1] = str;
        let newUrl = arr1.join('/');
        return newUrl;

      }
    }

  }
</script>


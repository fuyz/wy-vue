<style scoped>

  #listWrap {
    background: #eee;
  }

  .textItem {
    color: #333;
    background: white;
    display: block;
    margin-bottom: 5px;
    padding: 0.2rem 0.1rem;
  }

  .stitle {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .des {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
    -webkit-line-clamp: 10; /*用来限制在一个块元素显示的文本的行数*/
    -webkit-box-orient: vertical;
    text-indent: 2em;
  }

  .imgWrap {
    margin: 0.1rem 0;
  }

  .imgWrap img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    max-height: 5rem;
  }

  .comment{
    background: #eee;
    padding: 0.2rem;
    margin: 0.2rem 0;
    font-size: 0.25rem;
  }
  .nickname{
    font-weight: 700;
    color: #444;
  }

  .footer {
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-around;
  }

</style>

<template>

  <mt-loadmore id="listWrap"
               :top-method="loadNew"
               :bottom-method="loadMore"
               :bottom-all-loaded="allLoaded"
               ref="loadmore"
               :autoFill=false
  >
    <div class="textItem" v-for="(item, index) in dataList" :key="index" @click="toDetail(item)">
      <div class="content">
        <!--<p class="stitle">{{ item.title }}</p>-->
        <div class="imgWrap">
          <img :src="item.imgsrc" alt="">
        </div>
        <p class="des">{{ item.digest }}</p>
      </div>
      <div class="comment" v-if="item.commentInfo">
        <span class="nickname">{{ item.commentInfo.user ? '"'+ item.commentInfo.user.nickname +'：' : '***' }}</span>
        <span>{{ item.commentInfo.content }}</span>
      </div>
      <div class="footer">
        <span class="sText"><i class="icon laugh_icon"></i>{{ item.laughweight }}</span>
        <span class="sText"><i class="icon love_icon"></i>{{ item.enjoyweight }}</span>
        <span class="sText"><i class="icon bored_icon"></i>{{ item.boredweight }}</span>
        <span class="sText"><i class="icon comment_icon"></i>{{ item.replyCount }}</span>
      </div>
    </div>

  </mt-loadmore>

</template>

<script>
  import {Indicator} from 'mint-ui';
  import URL_PARAMS from '@/util/urls-config';

  import PARAMS from '../../../config/index';

  export default {
//    name: 'myNews',
    data() {
      return {
        host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
        dataList: [],
        title: '段子',
        currentUrl: URL_PARAMS.urlArray[this.title],
        allLoaded: false,

      }
    },
    created: function () {
      if (this.dataList.length != 0) return;
      let title = this.$route.params.type ? this.$route.params.type : this.title;
      this.ajaxData({title: title});

      setTimeout(function () {
        document.getElementsByClassName('indexWrap')[0].scrollTop = 0;
      })

    },
    watch: {},
    methods: {
      /*请求数据*/
      ajaxData: function (obj) {
        if (obj.loadMore) {
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadMore');
        } else if (obj.loadNew) {
          this.currentUrl = this.transformUrl(this.currentUrl, 'loadNew');
        } else {
          this.currentUrl = URL_PARAMS.urlArray[obj.title];
          if( this.$store.state.news_DATA[obj.title] != undefined){
            this.dataList = this.$store.state.news_DATA[obj.title];
            return;
          }
        }

        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        });
        this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then((res) => {
          Indicator.close();
          res = JSON.parse(JSON.parse(res.body));
          let dataArr = res[this.title];

          if (obj.loadMore) {
            //关闭loading状态
            this.$refs.loadmore.onBottomLoaded();
            if (dataArr.length == 0) {
              this.allLoaded = true;
              return;
            }
          } else if (obj.loadNew) {
            //关闭loading状态
            this.$refs.loadmore.onTopLoaded();
          }

          if (obj.loadMore) {
            this.dataList = this.dataList.concat(dataArr);
          } else if (obj.loadNew) {
            this.dataList = dataArr.concat(this.dataList);
          } else {
            this.dataList = dataArr;
          }

          /*更新state状态*/
          this.$store.commit('setData',{
            type: 'news',
            title: obj.title,
            data: this.dataList
          });

          console.log([obj.title, this.currentUrl, this.dataList]);

        }, (res) => {
          console.log(res)
        });

      },
      /*上拉加载更多*/
      loadMore: function () {
        this.ajaxData({title: this.title, loadMore: true});
      },
      /*下拉刷新*/
      loadNew: function () {
        this.ajaxData({title: this.title, loadNew: true});
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
            skipType: 'dz'
          }
        })
      },
      /*转换url*/
      transformUrl: function (url, key) {
//        http://c.m.163.com/recommend/getComRecNews/T1419316284722?size=10&offset=0&fn=1
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
            if (arr3[0] == 'offset') {
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
        console.log(newUrl);
        return newUrl;

      }
    }

  }
</script>


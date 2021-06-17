<style scoped>
/*新闻列表样式*/
#specialWrap {
  position: relative;
  z-index: 15;
  font-size: 0.3rem;
  margin-top: 40px;
  background: white;
}

.newsItem {
  height: 2rem;
  padding: 0.24rem 0.22rem 0;
  border-bottom: 1px solid #efefef;
  width: 100%;
  display: flex;
  box-sizing: border-box;
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
  width: 100%;
  max-height: 100%;
}

.cell {
  border-radius: 15px;
  display: inline-block;
  border: 1px solid #bbb;
  text-align: center;
  padding: 0.1rem 0.15rem;
  font-size: 12px;
  /* width: 1.4rem; */
  margin: 0.1rem;
  color: #222;
}
.banner {
  width: 100%;
}
.newsItem-title {
  background: #ddd;
  font-size: 0.25rem;
  padding: 5px 10px;
}
</style>

<template>
  <div id="specialWrap">
    <mt-header fixed style="z-index: 5">
      <mt-button slot="left" icon="back" @click="goBack">
        返回
      </mt-button>
    </mt-header>
    <header>
      <img v-if="dataList.banner" class="banner" :src="dataList.banner" alt="banner图片">
      <div class="cellWrap">
        <div v-for="(item, index) in dataList.topics" :key="index" class="cell" @click="toAnchor(index)">
          {{ item.shortname || item.tname }}
        </div>
      </div>
    </header>

    <div v-for="(item, index) in dataList.topics" :key="index" class="">
      <div :id="index" class="newsItem-title">
        {{ ++index +'/'+ dataList.topics.length }} {{ item.tname }}
      </div>
      <div v-for="(e, i) in item.docs" :key="i" class="newsItem" @click="toDetail(e)">
        <div class="left">
          <h3 class="title">
            {{ e.title }}
          </h3>
          <div class="detial">
            <span class="source">{{ e.source }}</span>
            <span class="pubTime">{{ e.ptime.slice(5, -3) }}</span>
            <span class="reply">{{ e.replyCount }}跟帖</span>
          </div>
        </div>
        <div class="right">
          <img class="newsImg" :data-src="e.imgsrc" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MessageBox, Indicator } from 'mint-ui'
// import URL_PARAMS from '@/utils/urls-config'
import PARAMS from '../../../config/index'
import { debounce } from '@/utils'

export default Vue.extend({
  name: 'Special',
  data() {
    return {
      title: '',
      specialID: '',
      host_port: 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort,
      dataList: [],
      currentUrl: '',
      allLoaded: false,
    }
  },
  watch: {},
  created() {
    const query: any = this.$route.query
    this.specialID = query.specialID
    this.currentUrl =
      'http://c.m.163.com/nc/special/' + this.specialID + '.html'
    this.getData()
  },
  mounted() {
    const warpEle: any = document.getElementById('app')
    warpEle && (warpEle.onscroll = debounce(this.loadImg, 300))
    this.$nextTick(() => {
      this.loadImg()
    })
  },
  updated() {
    this.loadImg()
  },
  methods: {
    getData() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake',
      })
      this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then(
        (res: any) => {
          Indicator.close()
          try {
            const body: any = JSON.parse(JSON.parse(res.body))
            this.dataList = body[this.specialID]
            console.log(['专题数据', this.currentUrl, this.dataList])
          } catch (err) {
            console.log(err)
            MessageBox({
              title: '提示',
              message: '网络错误，请刷新重试！',
              confirmButtonText: '刷新',
            }).then(() => {
              this.getData()
            })
          }
        },
        (err) => {
          console.log(err)
        }
      )
    },
    /*跳转-》详情页*/
    toDetail: function (obj) {
      if (obj.specialID) {
        this.$router.push({
          name: 'special',
          query: {
            specialID: obj.specialID,
          },
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
          },
        })
      }
    },
    toAnchor(index) {
      const ele: any = document.getElementById(index)
      const scrollTop: any = ele.offsetTop
      const app: any = document.getElementById('app')
      app.scrollTop = scrollTop
    },
    loadImg() {
      const warpEle: any = document.getElementById('app')
      if (!warpEle) return
      const imgEleArr: any = document.querySelectorAll('#specialWrap img')
      const scrollTop = warpEle.scrollTop
      const clientH = document.documentElement.clientHeight
      for (let i = 0; i < imgEleArr.length; i++) {
        const offsetTop = imgEleArr[i].offsetTop
        if (scrollTop + clientH > offsetTop - 200) {
          if (imgEleArr[i].src) continue
          const src = imgEleArr[i].getAttribute('data-src')
          src && (imgEleArr[i].src = src)
        }
      }
    },
  },
})
</script>


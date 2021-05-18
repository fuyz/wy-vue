<style src="../../assets/css/newsDetail.css" scoped=""></style>

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
        <p id="ec" class="sText" v-if="data.ec">{{ '责任编辑：' + data.ec }}</p>
        <div class="searchKwList">
          <span class="searchKw" v-for="(item, i) in data.searchKw" :key="i" @click="toSearch(item)">{{ item.keyword }}</span>
        </div>
      </div>
      <!--图片新闻1-->
      <div class="imgContent swiper-container" v-if="key == 'picture'">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item , index) in pictureArr" :key="index">
            <img :src="item.imgurl" alt />
            <div class="pic-des">
              <span class="currentNum">{{ index + 1 }}</span>
              <span class="countNum">/ {{ pictureArr.length }}</span>
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
            <img :src="item.imgurl" alt />
            <div class="pic-des">
              <span class="currentNum">{{ index + 1 }}</span>
              <span class="countNum">/ {{ pictureArr.length }}</span>
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
          <span class="sText">
            <i class="icon laugh_icon"></i>
            {{ data.laughWeight }}
          </span>
          <span class="sText">
            <i class="icon love_icon"></i>
            {{ data.enjoyWeight }}
          </span>
          <span class="sText">
            <i class="icon bored_icon"></i>
            {{ data.boredWeight }}
          </span>
        </div>
      </div>

      <div class="commentWrap">
        <input class="comment-input" type="text" placeholder="写跟帖" />
        <div class="icon comment" @click="toComment(data)">{{ data.replyCount }}</div>
        <span class="icon favorite"></span>
        <span class="icon share"></span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
// vue-class-component：强化 Vue 组件，使用 TypeScript/装饰器 增强 Vue 组件
// vue-property-decorator：在 vue-class-component 上增强更多的结合 Vue 特性的装饰器
import { Vue, Component } from 'vue-property-decorator'
import Dialog from '@/utils/dialog'
import Swiper from 'swiper'
import PARAMS from '@/../config/index'
// import Service from '@/service/service'
import 'swiper/dist/css/swiper.css'
import { debounce } from '@/utils'

@Component({})
export default class NewsDetail extends Vue {
  host_port = 'http://' + PARAMS.dev.host + ':' + PARAMS.dev.servePort
  currentUrl = ''
  skipID: string | (string | null)[] = ''
  setid: string | (string | null)[] = ''
  data: any = {
    replyCount: '',
    ptime: '',
  }
  html_structure = ''
  pictureArr = null
  key = 'article'
  created() {
    // const postid = this.$route.query.postid
    this.skipID = this.$route.query.skipID
    const photosetID = this.$route.query.photosetID
    const docid = this.$route.query.docid
    this.setid = this.$route.query.setid
    const skipType = this.$route.query.skipType
    if (this.setid) {
      //图片详情
      this.currentUrl =
        'http://c.m.163.com/photo/api/set/0096/' + this.setid + '.json'
      this.key = 'pic'
    } else if (photosetID) {
      //图片新闻
      let ID: any = ''
      ID = photosetID.slice(4)
      ID = ID.replace(/\|/, '/')
      this.currentUrl = 'http://c.3g.163.com/photo/api/set/' + ID + '.json'
      this.key = 'picture'
    } else if (docid) {
      //文章新闻、段子详情
      this.currentUrl = 'http://c.m.163.com/nc/article/' + docid + '/full.html'
      if (skipType === 'dz') {
        this.key = 'dz'
      } else {
        this.key = 'article'
      }
    }

    this.getData()
  }
  mounted() {
    const warpEle: any = document.getElementById('newsDetailContent')
    warpEle && (warpEle.onscroll = debounce(this.loadImg, 300))
    this.$nextTick(() => {
      this.loadImg()
    })
  }
  updated() {
    this.pictureNews()
    this.articleNews()
    this.loadImg()
  }
  // 请求新闻详情信息
  getData() {
    Dialog.showLoading(true)
    this.$http.jsonp(this.host_port + '?key=wy&url=' + this.currentUrl).then(
      (res: any) => {
        Dialog.showLoading(false)
        try {
          res = JSON.parse(JSON.parse(res.body))
          if (this.setid) {
            this.data = res
            this.pictureArr = res.photos
          } else if (!this.skipID || !this.skipID.includes('|')) {
            const urlParamArr = this.currentUrl.split('/')
            const urlKey = urlParamArr[urlParamArr.length - 2]
            this.data = res[urlKey]
          } else {
            this.data = res
            this.pictureArr = res.photos
          }
          console.log(['详情', this.currentUrl, this.data])
        } catch (err) {
          console.log(err)
          Dialog.confirm(
            {
              text: '网络错误，请刷新重试！',
            },
            () => {
              this.getData()
            }
          )
        }
      },
      (res) => {
        console.log(res)
      }
    )
  }
  /*跳转-》详情页*/
  toComment(obj: any) {
    this.$router.push({
      name: 'comment',
      query: {
        docid: obj.docid,
        postid: obj.postid,
      },
    })
  }
  /*去搜索页*/
  toSearch(obj: any) {
    this.$router.push({
      name: 'search',
      query: {
        keyword: obj.keyword,
      },
    })
  }
  /*渲染图片文章*/
  pictureNews() {
    if (!document.getElementsByClassName('swiper-container').length) return
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      // 如果需要前进后退按钮
      navigation: {
        // nextEl: '.swiper-button-next',
        // prevEl: '.swiper-button-prev s',
      },
    })
  }
  /*渲染文本文章*/
  articleNews() {
    let body = this.data.body
    if (typeof body === 'undefined') return
    const video = !this.data.video ? [] : this.data.video
    const img = !this.data.img ? [] : this.data.img
    //转换video标签
    for (let i = 0; i < video.length; i++) {
      body = body.replace(
        video[i].ref,
        `<video src="${video[i].mp4_url}'"></video>`
      )
    }
    //转换img标签
    for (let i = 0; i < img.length; i++) {
      // let [width, height] = [640, 320]
      const pixel = img[i].pixel
      if (pixel) {
        // width = img[i].pixel.split('*')[0]
        // height = img[i].pixel.split('*')[1]
      }
      body = body.replace(
        img[i].ref,
        `<img data-src="${img[i].src}" title="${img[i].alt}" style="max-width: 100%;display: block;margin: 0.1rem auto"><p style="color: #888;font-size: 0.2rem;line-height: 0.2rem;margin: 0.2rem 0 0.2rem">"${img[i].alt}"</p>`
      )
    }
    this.html_structure = body
  }
  loadImg() {
    const warpEle: any = document.getElementById('newsDetailContent')
    if (!warpEle) return
    const imgEleArr: any = document.querySelectorAll('#newsDetailContent img')
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
  }
}
</script>

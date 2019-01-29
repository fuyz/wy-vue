<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
    <!--navTab-->
    <mt-navbar id="navBar" v-model="navSelected" fixed>
        <mt-tab-item :id="item.title" v-for="(item, index) in navBarList" :key="index" :href="'#'+ item.link" >
          {{ item.title }}
        </mt-tab-item>
    </mt-navbar>
</template>

<script>
  export default {
    data() {
      return {
        navBarList:[
          {link: '/news/head/头条', title: '头条' },
          {link: '/news/head/体育', title: '体育' },
          {link: '/news/head/娱乐', title: '娱乐' },
          {link: '/news/head/漫画', title: '漫画' },
          {link: '/news/head/汽车', title: '汽车' },
          {link: '/news/picture/图片', title: '图片' },
          {link: '/news/text/段子', title: '段子' },
          {link: '/news/city', title: '深圳' },
          {link: '/news/more', title: '更多' },

        ],
        navSelected: '头条'
//        navBarList: ['头条', '娱乐', '体育', '漫画', '平顶山', '军事', '购物', '视频', '图片', '段子', '更多'],

      }
    },
    created: function () {
      this.navSelected = this.$route.params.type ? this.$route.params.type : this.navSelected;
//      http://c.m.163.com/recommend/video/tablist

    }
  }
</script>


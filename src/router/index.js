import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

import News from '@/components/news/News'
import NewsList from '@/components/news/NewsList'
import CityList from '@/components/news/CityList'
import PictureList from '@/components/news/PictureList'
import TextList from '@/components/news/TextList'
import NewsList4 from '@/components/news/NewsList4'

import NewsDetail from '@/components/NewsDetail'
import Special from '@/components/Special'
import CommentDetail from '@/components/CommentDetail'
import Search from '@/components/Search'

import Video from '@/components/Video'
import VideoList from '@/components/VideoList'
import VideoDetail from '@/components/VideoDetail'

import Live from '@/components/Live'
import Mine from '@/components/Mine'

Vue.use(Mint);
Vue.use(Router);
Vue.use(Resource);


export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/news/head/头条'
    },
    {
      path: '/news',
      name: 'myNews',
      component: News,
      children: [
        {
          path: 'head/:type',
          components: {
            NewsList: NewsList,
          },
          // props: (route) => ({ query: route.query.key })
        },
        {
          path: 'city',
          name: 'myNews-city',
          components: {
            CityList: CityList,
          }
        },
        {
          path: 'picture/:type',
          name: 'myNews-picture',
          components: {
            PictureList: PictureList,
          }
        },
        {
          path: 'text/:type',
          name: 'myNews-dz',
          components: {
            TextList: TextList,
          }
        },
        {
          path: 'more',
          components: {
            NewsList4: NewsList4,
          }
        }

      ]
    },
    {
      path: '/video/',
      name: 'myVideo',
      component: Video,
      children: [
        {
          path: 'videoList/:type',
          components: {
            VideoList: VideoList,
          },
        }

      ]
    },
    {
      path: '/live/',
      name: 'myLive',
      component: Live
    },
    {
      path: '/mine/',
      name: 'myHome',
      component: Mine
    },
    {
      path: '/detail',
      name: 'newsDetail',
      component: NewsDetail
    },
    {
      path: '/special',
      name: 'special',
      component: Special
    },
    {
      path: '/comment',
      name: 'comment',
      component: CommentDetail
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/videoDetail',
      name: 'VideoDetail',
      component: VideoDetail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // form.meta.y = document.getElementsByClassName('indexWrap')[0].scrollTop
    // console.log(arguments);
    // return {x: 0, y: 100};
    // return { x: 0, y: 0 }
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: 0 }
    // }
  }
});



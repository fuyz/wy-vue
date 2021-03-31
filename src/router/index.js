import Vue from 'vue'
import Router from 'vue-router'

import News from '@/components/news/News'
import NewsList from '@/components/news/NewsList'
import CityList from '@/components/news/CityList'
import PictureList from '@/components/news/PictureList'
import TextList from '@/components/news/TextList'
import NewsList4 from '@/components/news/NewsList4'
import Special from '@/components/news/Special'
import CommentDetail from '@/components/news/CommentDetail'
import Search from '@/components/news/Search'
import NewsDetail from '@/components/news/NewsDetail'

import Video from '@/components/videos/Video'
import VideoList from '@/components/videos/VideoList'
import VideoDetail from '@/components/videos/VideoDetail'

import Live from '@/components/live/Live'
import Mine from '@/components/mine/Mine'

Vue.use(Router);


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
            NewsListView: NewsList,
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
  scrollBehavior(to, from, savedPosition) {
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



import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

// import News from '@/components/news/News'
// import NewsList from '@/components/news/NewsList'
// import CityList from '@/components/news/CityList'
// import PictureList from '@/components/news/PictureList'
// import TextList from '@/components/news/TextList'
// import NewsList4 from '@/components/news/NewsList4'
// import Special from '@/components/news/Special'
// import CommentDetail from '@/components/news/CommentDetail'
// import Search from '@/components/news/Search'
// import NewsDetail from '@/components/news/NewsDetail'

// import Video from '@/components/videos/Video'
// import VideoList from '@/components/videos/VideoList'
// import VideoDetail from '@/components/videos/VideoDetail'

// import Live from '@/components/live/Live'
// import Mine from '@/components/mine/Mine'

const routerArr = [
  {
    path: '/',
    redirect: '/news/head/头条'
  },
  {
    path: '/news',
    name: 'myNews',
    component: () => import('@/components/news/News'),
    children: [
      {
        path: 'head/:type',
        components: {
          NewsListView: () => import('@/components/news/NewsList'),
        },
        // props: (route) => ({ query: route.query.key })
      },
      {
        path: 'city',
        name: 'myNews-city',
        components: {
          CityList: () => import('@/components/news/CityList'),
        }
      },
      {
        path: 'picture/:type',
        name: 'myNews-picture',
        components: {
          PictureList: () => import('@/components/news/PictureList'),
        }
      },
      {
        path: 'text/:type',
        name: 'myNews-dz',
        components: {
          TextList: () => import('@/components/news/TextList'),
        }
      },
      {
        path: 'more',
        components: {
          NewsList4: () => import('@/components/news/NewsList4'),
        }
      }

    ]
  },
  {
    path: '/video/',
    name: 'myVideo',
    component: () => import('@/components/videos/Video'),
    children: [
      {
        path: 'videoList/:type',
        components: {
          VideoList: () => import('@/components/videos/VideoList'),
        },
      }

    ]
  },
  {
    path: '/live/',
    name: 'myLive',
    component: () => import('@/components/live/Live')
  },
  {
    path: '/mine/',
    name: 'myHome',
    component: () => import('@/components/mine/Mine')
  },
  {
    path: '/detail',
    name: 'newsDetail',
    component: () => import('@/components/news/NewsDetail')
  },
  {
    path: '/special',
    name: 'special',
    component: () => import('@/components/news/Special')
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/components/news/CommentDetail')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/news/Search')
  },
  {
    path: '/videoDetail',
    name: 'VideoDetail',
    component: () => import('@/components/videos/VideoDetail')
  }
]
export default new Router({
  // mode:'history',
  routes: routerArr,
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



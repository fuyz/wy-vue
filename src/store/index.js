/**
 *
 * @author 付颖志
 * @create 2018-08-08 下午3:40
 **/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    news_DATA: {},
    newsDetail_DATA: {},
    video_DATA: {},
    Position:{}
  },
  mutations: {
    setData(state, obj) {
      if (obj.type == 'news') {
        state.news_DATA[obj.title] = obj.data;
        // state.Position[obj.title] = obj.position;
      } else if (obj.type == 'video') {
        state.video_DATA[obj.title] = obj.data;
      } else if (obj.type == 'newsDetail') {
        state.newsDetail_DATA[obj.title] = obj.data;
      }

      // if(obj.type == 'position'){
      //   state.Position[obj.title] = obj.position;
      // }
      console.log(state);
    }
  }
});

export default store

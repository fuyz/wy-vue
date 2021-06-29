import Vue from "vue"
import PARAMS from "../../config/index";
// import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '@/util/request'

const _vue: any = new Vue()
const host_port = PARAMS.dev.host + ":" + PARAMS.dev.servePort

export default {
  getNewsList(currentUrl: string) {
    return _vue.$http.jsonp(host_port + "?key=wy&url=" + currentUrl)
  }
}

  //      请求评论数据
/* this.$http.jsonp(this.host_port + '?key=wy&url=' + 'http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=10&offset=0&fn=1').then((res) => {
     try {
       debugger
       let json = JSON.parse(res.body);
       res = Boolean(json) ? JSON.parse(json) : '';
     } catch (err) {
       debugger
       console.log(err);
       MessageBox({
         title: '提示',
         message: '网络错误，请刷新重试！',
         confirmButtonText: '刷新'
       }).then(action => {
         window.location.reload();
       });
     } finally {

     }


   }, (res) => {
     console.log(res)
   }).then(function () {

   });*/
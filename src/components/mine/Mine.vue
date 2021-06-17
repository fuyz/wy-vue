<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.iframeWrap {
  margin: 0;
  width: 100%;
  height: calc(100vh - 55px);
  iframe {
    width: 100%;
    min-height: 100%;
  }
}
</style>

<template>
  <div class="iframeWrap">
    <iframe src="https://cloud.tencent.com/developer/doc/1273" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      urlArray: {
        head: "http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html", // 头条
        recommend:
          "http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html", // 精选
        entertainment:
          "http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html", // 娱乐
        car: "http://c.m.163.com/nc/auto/list/5bmz6aG25bGx/0-20.html", // 汽车
        sports: "http://c.3g.163.com/nc/article/list/T1348649079062/0-20.html", //  //运动
        pds: "http://c.3g.163.com/nc/article/local/5bmz6aG25bGx/0-20.html", // 平顶山
        cartoon: "http://c.m.163.com/nc/article/list/T1444270454635/0-20.html", // 漫画
        more: "http://c.m.163.com/nc/article/list/T1444270454635/20-20.html", //  更多
      },
      list: [],
    };
  },
  created: function () {
    return;

    var vm = this;
    this.$http
      .jsonp("http://localhost:9999?key=wy&url=" + this.urlArray.head)
      .then(
        (res) => {
          var data = JSON.parse(JSON.parse(res.body));
          vm.list = data["T1348647853363"];
          console.log(vm.list);
        },
        (res) => {
          console.log(res);
        }
      );
    //      this.$http.jsonp(this.urlArray.head).then((res) => {
    //        console.log(res)
    //      })
  },
};
</script>


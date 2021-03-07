<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.videoWrap {
  margin-top: 46px;
}
.newsItem {
  display: flex;
  height: 2rem;
  padding: 0.24rem 0.22rem 0;
  border-bottom: 1px solid #f5f7f9;
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
}
.pubTime,
.reply {
  font-size: 0.2rem;
  color: #b4b4b4;
}
.newsImg {
  vertical-align: -webkit-baseline-middle;
  width: 100%;
}
</style>

<template>
  <div class="videoWrap">直播</div>
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


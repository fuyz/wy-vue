<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  #navBar {
    overflow-x: scroll;
    width: 100%;
  }

  #navBar .mint-tab-item-label {
    width: 1rem;
  }

  #loadMore {
    font-size: 0.3rem;
    /*height: calc(100vh - 101px);*/
    /*overflow-y: scroll;*/
  }

  .newsItem {
    display: flex;
    height: 2rem;
    padding: .24rem .22rem 0;
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

  .pubTime, .reply {
    font-size: 0.2rem;
    color: #b4b4b4;
  }

  .newsImg {
    vertical-align: -webkit-baseline-middle;
    width: 100%;
    max-height: 100%;
  }
</style>

<template>

  <div>
    <h1>模板三</h1>
    <h1>模板三</h1>
    <h1>模板三</h1>
  </div>

</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    name: 'myNews',
    data() {
      return {}
    },
    created: function () {
      debugger
      console.log(this.$route);

    },
    watch: {
      //监听路由变动情况
      $route: function (val, old) {
        debugger
        this.title = val.params.type;
        this.ajaxData({title: this.title});
      }
    },
    methods: {}

  }
</script>


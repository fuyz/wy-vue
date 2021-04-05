<template>
  <div class="indexWrap">
    <Nav></Nav>
    <transition name="slide">
      <router-view name="NewsListView"></router-view>
    </transition>
    <transition name="slide" mode="out-in">
      <router-view name="PictureList"></router-view>
    </transition>
    <transition name="slide" mode="out-in">
      <router-view name="TextList"></router-view>
    </transition>
    <transition name="slide">
      <router-view name="CityList"></router-view>
    </transition>
    <transition name="slide">
      <router-view name="NewsList4"></router-view>
    </transition>

    <!--<router-view name="NewsList4"></router-view>-->
    <!--<transition name="down">-->
    <!--<router-view name="NewsDetail"></router-view>-->
    <!--</transition>-->
  </div>
</template>

<script>
import Nav from "@/components/widgets/Nav";

export default {
  name: "myNews",
  data() {
    return {};
  },
  components: {
    Nav,
  },
  created: function () {},
  watch: {
    //      navSelected: function (val, oldVal) {
    //        return
    //        for (var i = 0; i < this.dataArr.length; i++) {
    //          if (this.dataArr[i].title == val) {
    //            this.list = this.dataArr[i].dataList;
    //            break;
    //          }
    //          if (i == this.dataArr.length - 1) {
    //            var vm = this;
    //            var url = vm.urlArray[val];
    //            this.currentUrl = url;
    //
    //            Indicator.close();
    //            Indicator.open({
    //              text: 'Loading...',
    //              spinnerType: 'fading-circle'
    //            });
    //            vm.$http.jsonp(this.host_port +'?key=wy&url=' + url).then((res) => {
    //              Indicator.close();
    //              var data = JSON.parse(JSON.parse(res.body));
    //              var urlParamArr = url.split('/');
    //              vm.list = data[urlParamArr[urlParamArr.length - 2]];
    //              vm.dataArr.push({
    //                title: val,
    //                dataList: vm.list
    //              });
    //
    //              console.log(vm.list)
    //            }, (res) => {
    //              console.log(res)
    //            })
    //          }
    //        }
    //
    //      }
  },
  methods: {},
};
</script>
<style>
.indexWrap {
  margin-top: 46px;
  height: calc(100vh - 101px);
  overflow-y: scroll;
}

#listWrap {
  font-size: 0.3rem;
  /*height: calc(100vh - 101px);*/
  /*overflow-y: scroll;*/
}
</style>
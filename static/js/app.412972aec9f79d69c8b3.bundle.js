!function(t){function e(e){for(var a,i,r=e[0],l=e[1],c=e[2],d=0,p=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);for(u&&u(e);p.length;)p.shift()();return o.push.apply(o,c||[]),s()}function s(){for(var t,e=0;e<o.length;e++){for(var s=o[e],a=!0,i=1;i<s.length;i++){var l=s[i];0!==n[l]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=s[0]))}return t}var a={},i={0:0},n={0:0},o=[];function r(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.e=function(t){var e=[];i[t]?e.push(i[t]):0!==i[t]&&{2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1}[t]&&e.push(i[t]=new Promise((function(e,s){for(var a="static/css/"+({}[t]||t)+"."+{2:"ba735780204327fa119a",3:"f0ff5e41205de21bc269",4:"00bfef7839d44f1514d0",5:"2177da8cbded7f090dab",6:"a99d0f69dceae1f3c689",7:"e46ad2502a742c7d7a2d",8:"b7dd1f5b5618536d8d65",9:"556490a2923898545ad0",10:"9c63a1c272405fd6b2e5",11:"051767db51abf7750370",12:"46793e2cdc712187733b",13:"8a714379464c3d60f61b",14:"37da53ce942df16629d8"}[t]+".css",n=r.p+a,o=document.getElementsByTagName("link"),l=0;l<o.length;l++){var c=(u=o[l]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(c===a||c===n))return e()}var d=document.getElementsByTagName("style");for(l=0;l<d.length;l++){var u;if((c=(u=d[l]).getAttribute("data-href"))===a||c===n)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var a=e&&e.target&&e.target.src||n,o=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete i[t],p.parentNode.removeChild(p),s(o)},p.href=n,document.getElementsByTagName("head")[0].appendChild(p)})).then((function(){i[t]=0})));var s=n[t];if(0!==s)if(s)e.push(s[2]);else{var a=new Promise((function(e,a){s=n[t]=[e,a]}));e.push(s[2]=a);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=function(t){return r.p+"static/js/"+({}[t]||t)+"."+{2:"ba735780204327fa119a",3:"f0ff5e41205de21bc269",4:"00bfef7839d44f1514d0",5:"2177da8cbded7f090dab",6:"a99d0f69dceae1f3c689",7:"e46ad2502a742c7d7a2d",8:"b7dd1f5b5618536d8d65",9:"556490a2923898545ad0",10:"9c63a1c272405fd6b2e5",11:"051767db51abf7750370",12:"46793e2cdc712187733b",13:"8a714379464c3d60f61b",14:"37da53ce942df16629d8"}[t]+".bundle.js"}(t);var c=new Error;o=function(e){l.onerror=l.onload=null,clearTimeout(d);var s=n[t];if(0!==s){if(s){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,s[1](c)}n[t]=void 0}};var d=setTimeout((function(){o({type:"timeout",target:l})}),12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(e)},r.m=t,r.c=a,r.d=function(t,e,s){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(s,a,function(e){return t[e]}.bind(null,a));return s},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="./",r.oe=function(t){throw console.error(t),t};var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var u=c;o.push([37,1]),s()}([function(t,e){t.exports=Vue},,,function(t,e,s){"use strict";(function(e){const a=s(28);t.exports={devServer:{proxy:{"/app":{target:"https://fuyz.github.io/wy-vue/app/",pathRewrite:{"^/api":""},changeOrigin:!0,secure:!1}}},dev:{assetsSubDirectory:"static",assetsPublicPath:"/",proxyTable:{},host:"www.fuyingzhi.com",port:8088,servePort:9999,autoOpenBrowser:!0,errorOverlay:!0,notifyOnErrors:!0,poll:!1,devtool:"cheap-module-eval-source-map",cacheBusting:!0,cssSourceMap:!0},build:{index:a.resolve(e,"../dist/index.html"),assetsRoot:a.resolve(e,"../dist"),assetsSubDirectory:"static",assetsPublicPath:"./",productionSourceMap:!1,devtool:"source-map",productionGzip:!1,productionGzipExtensions:["js","css"],bundleAnalyzerReport:Object({NODE_ENV:"production"}).npm_config_report}}}).call(this,"/")},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={urlArray:{"头条":"http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html","体育":"http://c.3g.163.com/nc/article/list/T1348649079062/0-20.html","娱乐":"http://c.3g.163.com/nc/article/list/T1348648517839/0-20.html","汽车":"http://c.3g.163.com/nc/article/list/T1348654060988/0-20.html","图片":"http://c.m.163.com/photo/api/list/0096/54GI0096.json","漫画":"http://c.m.163.com/nc/article/list/T1444270454635/0-20.html","深圳":"http://c.3g.163.com/nc/article/local/%E6%B7%B1%E5%9C%B3/0-20.html","段子":"http://c.m.163.com/recommend/getComRecNews/T1419316284722?size=10&offset=0&fn=1","更多":"http://c.m.163.com/nc/article/list/T1444270454635/20-20.html"},videoUrl:{"推荐":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Recom&size=10&offset=0&fn=1","榜单":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Rank&size=10&offset=0&fn=1","搞笑":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Funny&size=10&offset=0&fn=1","影视":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Movies&size=10&offset=0&fn=1","音乐":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Music&size=10&offset=0&fn=1","小品":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Opusculum&size=10&offset=0&fn=1","萌宠":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Adorable&size=10&offset=0&fn=1","涨姿势":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Knowledge&size=10&offset=0&fn=1","二次元":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Comic&size=10&offset=0&fn=1","黑科技":"http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Technology&size=10&offset=0&fn=1"}}},function(t,e,s){"use strict";var a=s(6),i=s.n(a);e.default=i.a},function(t,e,s){"use strict";var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=a(s(0)),n=a(s(4)),o=a(s(10)),r=a(s(27)),l=s(20);e.default=i.default.extend({name:"NewsList",data:function(){return{dataList:[],title:"头条",currentUrl:"",allLoaded:!1}},created:function(){console.log("created"),this.currentUrl=n.default.urlArray[this.title],this.dataList.length||(this.title=this.$route.params.type||this.title,this.getNewsList())},mounted:function(){var t=this;console.log("mounted"),document.getElementsByClassName("indexWrap")[0].onscroll=(0,l.debounce)(this.loadImg,300),this.$nextTick((function(){t.loadImg()}))},updated:function(){console.log("up"),this.loadImg()},watch:{$route:function(t){this.title=t.params.type,this.getNewsList()}},methods:{loadImg:function(){for(var t=document.getElementsByClassName("indexWrap")[0],e=document.querySelectorAll(".indexWrap img"),s=t.scrollTop,a=document.documentElement.clientHeight,i=0;i<e.length;i++){var n=e[i];if(s+a>n.offsetTop-200){var o=n.getAttribute("data-src");o&&(n.src=o)}}},getNewsList:function(t){var e=this;if(t)t.loadMore?this.currentUrl=this.transformUrl(this.currentUrl,"loadMore"):t.loadNew&&(this.currentUrl=this.transformUrl(this.currentUrl,"loadNew"));else{this.currentUrl=n.default.urlArray[this.title];var s=this.$store.state.news_DATA;if(s[this.title])return void(this.dataList=s[this.title]);this.dataList=[]}o.default.showLoading(!0),r.default.getNewsList(this.currentUrl).then((function(s){try{s=JSON.parse(JSON.parse(s.body));var a=e.currentUrl.split("/"),i=s[a[a.length-2]];if(!i.length)return void(e.allLoaded=!0);t?t.loadMore?e.dataList=i:t.loadNew&&(e.dataList=i.concat(e.dataList)):e.dataList=i,e.$store.commit("setData",{type:"news",title:e.title,data:e.dataList}),console.log(["新闻列表",e.currentUrl,e.dataList])}catch(t){console.log(t),o.default.confirm({message:"网络错误，请刷新重试！",confirmButtonText:"刷新"},(function(){e.getNewsList()}))}finally{var n=e.$refs.loadmore;!t||t.loadNew?n.onTopLoaded():t.loadMore&&n.onBottomLoaded()}})).finally((function(){o.default.showLoading(!1)}))},loadMore:function(){this.getNewsList({loadMore:!0})},loadNew:function(){this.getNewsList({loadNew:!0})},toDetail:function(t){t.specialID?this.$router.push({name:"special",query:{specialID:t.specialID}}):this.$router.push({name:"newsDetail",query:{postid:t.postid,skipID:t.skipID,docid:t.docid,photosetID:t.photosetID,setid:t.setid,skipType:t.skipType}})},transformUrl:function(t,e){var s=t.split("/"),a=s[s.length-1],i=a.split("."),n=i[0].split("-"),o=n[0],r=n[1];"loadNew"===e?o=Number(o)+20:"loadMore"===e&&(r=Number(r)+20),i[0]=o+"-"+r,a=i.join("."),s[s.length-1]=a;var l=s.join("/");return console.log(l),l}}})},,,function(t,e,s){"use strict";s.d(e,"a",(function(){return a})),s.d(e,"b",(function(){return i}));var a=function(){var t=this,e=t._self._c;t._self._setupProxy;return e("mt-loadmore",{ref:"loadmore",staticClass:"listWrap",attrs:{"top-method":t.loadNew,"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,autoFill:!1}},[t.dataList.length?t._l(t.dataList,(function(s,a){return e("div",{key:a,staticClass:"newsItem",on:{click:function(e){return t.toDetail(s)}}},["live"!==s.skipType&&"video"!=s.skipType?["photoset"==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"pubTime"},[t._v(t._s(s.mtime.slice(0,-3)))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{"data-src":s.imgsrc,alt:""}})])]):t._e(),t._v(" "),null==s.skipType?e("div",{staticClass:"newsItem-wrap"},[s.hasImg?e("mt-swipe",{staticStyle:{height:"3rem"},attrs:{auto:4e3}},[e("mt-swipe-item",[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.imgsrc,expression:"item.imgsrc"}],staticClass:"newsImg",attrs:{alt:""}})])],1):t._e(),t._v(" "),e("div",{staticClass:"no-swipe"},[s.hasImg?t._e():e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"source"},[t._v(t._s(s.source))]),t._v(" "),e("span",{staticClass:"pubTime"},[t._v(t._s(s.mtime?s.mtime.slice(5,-3):s.ptime.slice(5,-3)))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),s.hasImg?t._e():e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{"data-src":s.imgsrc,alt:""}})])])],1):t._e(),t._v(" "),"special"==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"special"},[t._v("专题")]),t._v(" "),e("span",{staticClass:"source"},[t._v(t._s(s.source))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{"data-src":s.imgsrc,alt:""}})])]):t._e(),t._v(" "),"video"==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"pubTime"},[t._v(t._s(s.mtime.slice(0,-3)))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{"data-src":s.imgsrc,alt:""}})])]):t._e()]:t._e()],2)})):e("div",{staticClass:"noData"},[t._v("暂无数据")])],2)},i=[];a._withStripped=!0},function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(2);e.default={showError:function(t,e){a.MessageBox.alert(t,e)},confirm:function(t,e,s){var i={title:"提示",message:"",confirmButtonText:"确定",showCancelButton:!0,showCobfirmButton:!0};t.message&&(i=Object.assign(i,t)),(0,a.MessageBox)(i).then(e,s)},showLoading:function(t,e){if(void 0===e&&(e={}),t){var s={text:"加载中...",spinnerType:"fading-circle"};e.text&&(s=Object.assign(s,e)),a.Indicator.open(s)}else a.Indicator.close()}}},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";var a=s(9),i=s(5),n=(s(30),s(1)),o=Object(n.a)(i.default,a.a,a.b,!1,null,"18251274",null);e.default=o.exports},,function(t,e,s){"use strict";var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=a(s(10));e.default={methods:{$formValidateMx:function(t,e){void 0===e&&(e=!1);var s=this.$refs[t];return new Promise((function(t,a){s.validate((function(s,n){if(s)t(s);else{var o=Object.keys(n),r=n[o[0]][0].message;e&&o.length&&n[o[0]]&&i.default.showError(r),a(new Error(r))}}))}))},goBack:function(){window.history.back()},goPage:function(t){this.$router.push(t)}}}},,function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.debounce=void 0,e.debounce=function(t,e){var s="";return function(){for(var a=[],i=0;i<arguments.length;i++)a[i]=arguments[i];var n=this;s&&clearTimeout(s),s=setTimeout((function(){t.apply(n,a)}),e)}}},function(t,e,s){"use strict";s(11)},function(t,e,s){"use strict";s(12)},function(t,e,s){"use strict";s(13)},,,,function(t,e,s){"use strict";var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=a(s(0)),n=a(s(3)),o=new i.default,r=n.default.dev.host+":"+n.default.dev.servePort;e.default={getNewsList:function(t){return o.$http.jsonp(r+"?key=wy&url="+t)}}},,,function(t,e,s){"use strict";s(14)},function(t,e,s){"use strict";s(15)},function(t,e){},,function(t,e,s){},function(t,e,s){},,function(t,e,s){"use strict";s.r(e);var a=s(0),i=s.n(a),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("keep-alive",[e("transition",{attrs:{name:"slide",appear:""}},[e("router-view")],1)],1),t._v(" "),e("mt-tabbar",{attrs:{id:"tabBar",fixed:""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}},[e("router-link",{staticClass:"tabBarItem",attrs:{to:"/news/head/头条"}},[e("mt-tab-item",{attrs:{id:"tab1"}},[e("i",{staticClass:"fa fa-home",attrs:{slot:"icon"},slot:"icon"}),t._v("\n        首页\n      ")])],1),t._v(" "),e("router-link",{staticClass:"tabBarItem",attrs:{to:"/video/videoList/推荐"}},[e("mt-tab-item",{attrs:{id:"tab2"}},[e("i",{staticClass:"fa fa-play-circle",attrs:{slot:"icon"},slot:"icon"}),t._v("\n        视频\n      ")])],1),t._v(" "),e("router-link",{staticClass:"tabBarItem",attrs:{to:"/live"}},[e("mt-tab-item",{attrs:{id:"tab3"}},[e("i",{staticClass:"fa fa-video",attrs:{slot:"icon"},slot:"icon"}),t._v("\n        直播\n      ")])],1),t._v(" "),e("router-link",{staticClass:"tabBarItem",attrs:{to:"/mine"}},[e("mt-tab-item",{attrs:{id:"tab4"}},[e("i",{staticClass:"fas fa-user",attrs:{slot:"icon"},slot:"icon"}),t._v("\n        我\n      ")])],1)],1)],1)};n._withStripped=!0;var o={name:"App",data:function(){return{selected:"tab1"}},methods:{},created(){}},r=(s(21),s(22),s(1)),l=Object(r.a)(o,n,[],!1,null,null,null).exports,c=s(7),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"indexWrap"},[e("Nav"),t._v(" "),e("transition",{attrs:{name:"slide"}},[e("router-view",{attrs:{name:"NewsListView"}})],1),t._v(" "),e("transition",{attrs:{name:"slide",mode:"out-in"}},[e("router-view",{attrs:{name:"PictureList"}})],1),t._v(" "),e("transition",{attrs:{name:"slide",mode:"out-in"}},[e("router-view",{attrs:{name:"TextList"}})],1),t._v(" "),e("transition",{attrs:{name:"slide"}},[e("router-view",{attrs:{name:"CityList"}})],1),t._v(" "),e("transition",{attrs:{name:"slide"}},[e("router-view",{attrs:{name:"NewsList4"}})],1)],1)};d._withStripped=!0;var u=function(){var t=this,e=t._self._c;return e("mt-navbar",{attrs:{id:"navBar",fixed:""},model:{value:t.navSelected,callback:function(e){t.navSelected=e},expression:"navSelected"}},t._l(t.navBarList,(function(s,a){return e("mt-tab-item",{key:a,attrs:{id:s.title,href:"#"+s.link}},[t._v("\n      "+t._s(s.title)+"\n    ")])})),1)};u._withStripped=!0;var p={data:()=>({navBarList:[{link:"/news/head/头条",title:"头条"},{link:"/news/head/体育",title:"体育"},{link:"/news/head/娱乐",title:"娱乐"},{link:"/news/head/漫画",title:"漫画"},{link:"/news/head/汽车",title:"汽车"},{link:"/news/picture/图片",title:"图片"},{link:"/news/text/段子",title:"段子"},{link:"/news/city",title:"深圳"},{link:"/news/more",title:"更多"}],navSelected:"头条"}),created:function(){this.navSelected=this.$route.params.type?this.$route.params.type:this.navSelected}},m={name:"myNews",data:()=>({}),components:{Nav:Object(r.a)(p,u,[],!1,null,"15835506",null).exports},created:function(){},watch:{},methods:{}},h=(s(23),Object(r.a)(m,d,[],!1,null,null,null).exports),f=s(16),v=function(){var t=this,e=t._self._c;return e("mt-loadmore",{ref:"loadmore",attrs:{id:"listWrap","top-method":t.loadNew,"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,autoFill:!1}},t._l(t.dataList,(function(s,a){return e("div",{key:a,staticClass:"newsItem",on:{click:function(e){return t.toDetail(s)}}},["photoset"==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"pubTime"},[t._v(t._s(s.mtime?s.mtime.slice(5,-3):s.ptime.slice(5,-3)))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{src:s.imgsrc,alt:""}})])]):t._e(),t._v(" "),null==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"source"},[t._v(t._s(s.source))]),t._v(" "),e("span",{staticClass:"pubTime"},[t._v(t._s(s.mtime?s.mtime.slice(5,-3):s.ptime.slice(5,-3)))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{src:s.imgsrc,alt:""}})])]):t._e(),t._v(" "),"special"==s.skipType?e("div",{staticClass:"newsItem-wrap"},[e("div",{staticClass:"left"},[e("h3",{staticClass:"title"},[t._v(t._s(s.title))]),t._v(" "),e("div",{staticClass:"detial"},[e("span",{staticClass:"special"},[t._v("专题")]),t._v(" "),e("span",{staticClass:"source"},[t._v(t._s(s.source))]),t._v(" "),e("span",{staticClass:"reply"},[t._v(t._s(s.replyCount)+"跟帖")])])]),t._v(" "),e("div",{staticClass:"right"},[e("img",{staticClass:"newsImg",attrs:{src:s.imgsrc,alt:""}})])]):t._e()])})),0)};v._withStripped=!0;var _=s(2),w=s.n(_),b=s(4),g=s.n(b),y=s(3),C=s.n(y),L={name:"myNews",data:()=>({host_port:C.a.dev.host+":"+C.a.dev.servePort,dataList:[],title:"深圳",allLoaded:!1,currentUrl:""}),created:function(){if(this.currentUrl=g.a.urlArray[this.title],0!=this.dataList.length)return;let t=this.$route.params.type?this.$route.params.type:this.title;this.ajaxData({title:t})},watch:{$route:function(t,e){this.title=t.params.type,this.ajaxData({title:this.title})}},methods:{ajaxData:function(t){t.loadMore?this.currentUrl=this.transformUrl(this.currentUrl,"loadMore"):t.loadNew?this.currentUrl=this.transformUrl(this.currentUrl,"loadNew"):this.currentUrl=g.a.urlArray[t.title],_.Indicator.open({text:"加载中...",spinnerType:"snake"}),this.$http.jsonp(this.host_port+"?key=wy&url="+this.currentUrl).then((e=>{_.Indicator.close();let s=(e=JSON.parse(JSON.parse(e.body)))[this.title];if(t.loadMore){if(this.$refs.loadmore.onBottomLoaded(),0==s.length)return void(this.allLoaded=!0)}else t.loadNew&&this.$refs.loadmore.onTopLoaded();this.dataList=s,console.log([t.title,this.currentUrl,this.dataList])}),(t=>{console.log(t)}))},loadMore:function(){this.ajaxData({title:this.title,loadMore:!0})},loadNew:function(){this.ajaxData({title:this.title,loadNew:!0})},toDetail:function(t){this.$router.push({name:"newsDetail",query:{postid:t.postid,skipID:t.skipID,docid:t.docid,photosetID:t.photosetID,setid:t.setid}})},transformUrl:function(t,e){let s=t.split("/"),a=s[s.length-1],i=a.split("."),n=i[0].split("-");if("loadNew"==e){let t=Number(n[0]);t+=10,n[0]=t}else if("loadMore"==e){let t=Number(n[1]);t+=20,n[1]=t}return i[0]=n.join("-"),a=i.join("."),s[s.length-1]=a,s.join("/")}}},N=(s(31),Object(r.a)(L,v,[],!1,null,"21ac1fa6",null).exports);i.a.use(c.a);const T=[{path:"/",redirect:"/news/head/头条"},{path:"/news",name:"myNews",component:h,children:[{path:"head/:type",components:{NewsListView:f.default}},{path:"city",name:"myNews-city",components:{CityList:N}},{path:"picture/:type",name:"myNews-picture",components:{PictureList:()=>s.e(9).then(s.bind(null,76))}},{path:"text/:type",name:"myNews-dz",components:{TextList:()=>s.e(11).then(s.bind(null,77))}},{path:"more",components:{NewsList4:()=>s.e(8).then(s.bind(null,78))}}]},{path:"/video/",name:"myVideo",component:()=>s.e(12).then(s.bind(null,75)),children:[{path:"videoList/:type",components:{VideoList:()=>s.e(14).then(s.bind(null,79))}}]},{path:"/live/",name:"myLive",component:()=>s.e(6).then(s.bind(null,80))},{path:"/mine/",name:"myHome",component:()=>s.e(7).then(s.bind(null,81))},{path:"/detail",name:"newsDetail",component:()=>Promise.all([s.e(5),s.e(2)]).then(s.bind(null,73))},{path:"/special",name:"special",component:()=>s.e(3).then(s.bind(null,74))},{path:"/comment",name:"comment",component:()=>s.e(4).then(s.bind(null,82))},{path:"/search",name:"search",component:()=>s.e(10).then(s.bind(null,83))},{path:"/videoDetail",name:"VideoDetail",component:()=>s.e(13).then(s.bind(null,84))}];var k=new c.a({routes:T,scrollBehavior(t,e,s){}}),x=s(17),D=(s(33),s(34),s(35),s(8));i.a.use(D.a);var I=new D.a.Store({state:{news_DATA:{},newsDetail_DATA:{},video_DATA:{},Position:{}},mutations:{setData(t,e){console.log(["存储数据",e]),"news"==e.type?t.news_DATA[e.title]=e.data:"video"==e.type?t.video_DATA[e.title]=e.data:"newsDetail"==e.type&&(t.newsDetail_DATA[e.title]=e.data)}}}),j=s(18),O=s.n(j),M=s(19);s.n(M).a.consoleHello(),i.a.config.productionTip=!1,i.a.use(w.a),i.a.use(x.a),i.a.mixin(O.a),new i.a({el:"#app",router:k,store:I,components:{App:l},template:"<App/>"})}]);
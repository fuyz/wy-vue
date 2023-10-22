/**
 * Created by qingyun on 16/10/8.
 */

var http = require('http');
var url = require('url');
//查询参数对象， 可以处理查询参数
var qs = require('querystring');

var server = http.createServer(function (req, res) {

    // console.log(url.parse(req.url));

    var query = url.parse(req.url).query;//对请求对象的URl进行解析，拿到？后面的查询参数字符串
    console.log(query);
    //把查询参数字符串转化为对象，方便取值
    var queryObj = qs.parse(query);
    console.log(queryObj);
    if (queryObj.url == 'undefined') {
        console.log('url:' + queryObj.url);
        return;
    };
    var URL = '';
    var callback = '';
    if (queryObj.key == 'wy') {   // 请求网易时添加了一个随机数参数
        //1.解析网易数据  的方法：
        URL = decodeURIComponent(queryObj.url);
        callback = queryObj.callback
    } else if (queryObj.key == 'xm') {
        //2.解析喜马拉雅 数据的方法：
        var dataArr = query.split('&');
        callback = dataArr.pop().split('=')[1];
        URL = dataArr.join('&');
        URL = URL.slice(6);
    }



    // console.log([queryObj.myUrl, queryObj.callback]);
    console.log([URL, callback]);

    //服务器 可以直接访问  服务器
    var resultData = "";
    //通过此方法请求queryObj.myUrl对应的服务器的数据
    // http.get(queryObj.myUrl, function(request){     //  解析网易数据
    http.get(URL, function (request) {    //解析喜马拉雅 数据
        //设置编码格式
        request.setEncoding('utf8');
        //检测到有数据返回，就会调用第二个参数(函数)，result为返回数据
        request.on('data', function (result) {
            // console.info();  //打印空白行
            // console.log(result);
            //由于数据不是全部接收完毕，该方法会调用很多次，需要把数据拼接到resultData中去；
            // console.log(result)
            resultData += result;
        });
        //数据全部接收完毕以后执行的操作
        request.on('end', function () {
            //把所有的数据包括到 回调函数中，返回到前端
            // var str = queryObj.callback + '('+ JSON.stringify(resultData) + ')';
            var str = callback + '(' + JSON.stringify(resultData) + ')';

            //请求数据结束，响应数据（把数据发给请求者）
            res.end(str);
        })

    }).on('error', function (e) {
        //当请求失败时把错误信息返回给请求者
        res.end(e.message);
    });


});
var port = 9998;
server.listen(port);
console.log("Server runing at port:" + port);

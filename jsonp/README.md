# jsonp的基本概念与使用

## jsonp的目的就是为了进行跨域，之所以jsonp能实现跨域的目的，也是因为script标签可以加载来源于不同域下的资源。

## 基本使用

* 首先在进行jsonp请求之前定义一个回调函数。
* 加一个script标签，src写上需要跨域的地址，并将回调函数写进参数中，或者由后台指定回掉参数名字。
* server.js是用nodejs来实现一个简单的对jsonp请求的处理。
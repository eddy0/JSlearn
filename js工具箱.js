

//1. 字符串和div添加工具
/*
element 是一个标签
html 是一段 html 字符串
把 html 作为子元素插入到 element 的末尾 html可以用模板字符串来写
模板字符串又可以写成一个用${a}来显示参数的function
*/

var appendHtml = function() {
    element.insertAdjacentHTML('beforeend','html')
}

//批量添加

/*
selector 是一个 string, 选择器, 有如下三种取值
    1, 标签选择器, 如 'div'
    2, class 选择器, 如 '.red'
    3, id 选择器, 如 '#id-input-name'
html 是一段 html 字符串
把 html 作为子元素插入到 selector 选中的所有元素的末尾
*/
var append = function(selector, html) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.insertAdjacentHTML('beforeend', html)
    }
}



//2. 绑定事件函数

/*
element 是一个标签
如果只有elementClass 是标签的class
var element = document.querySelector('.elementClass')

eventName 是一个 string, 表示事件的名字
callback 是一个函数

bindEvent(button, 'click', function(){} )
*/

var bindEvent = function(element, eventName, callback) {
    element.addEventListener('eventName', callback )

}

//3. 绑定一个委托事件,用于之前不存在的内容, 向父标签委托产生

/*
element 是一个标签，element一般是父元素, 要响应的class所在标签的父标签
eventName 是一个 string, 表示事件的名字
callback 是一个函数
responseClass 是一个字符串

在 element 上绑定一个事件委托
只会响应拥有 responseClass 类的元素
*/


var bindEventDelegate = function(element, eventName, callback, responseClass) {
    element.addEventListener(eventName, function(event){
        var target = target.event
        if (target.classList.contains(responseClass)) {
            callback(event)
        }
    })
}


//终极套路
/*
selector 是一个 string, 选择器, 有如下三种取值
    1, 标签选择器, 如 'div'
    2, class 选择器, 如 '.red'
    3, id 选择器, 如 '#id-input-name'
eventName 是一个 string, 表示事件的名字
callback 是一个函数
responseClass 是一个字符串, 这个参数可以为空

给 selector 选中的所有元素绑定 eventName 事件
当 responseClass 给出的时候, callback 只会响应拥有 responseClass 类的元素
当 responseClass 没有给的时候, callback 直接响应

*/

var elements = document.querySelectorAll(selector)
for (var i = 0; i < elements.length; i++) {
    var e = elements[i]
    e.addEventListener(eventName, function(event){
        var target = event.target
        if(target.classList.contains(responseClass)) {
            callback(event)
        }
    })
}
}



// AJAX

///*实现 ajaxGet 函数, 用 GET 方法请求一个 URL
// url 是一个 URL
// callback 是一个函数, 在接受服务器响应后调用并传递参数给它
// 创建 AJAX 对象


var ajaxGet = function(url, callback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open('GET', url, true)
    // 注册响应函数
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            // console.log(r)  查看请求情况
            callback(r.response)
        }
    }
    // 发送请求
    r.send()
}


//以下为实例
var url = 'https://vip.cocode.cc/uploads/tags.json'
ajaxGet(url, function(data){
    console.log(data)
    var tags = JSON.parse(data)
    console.log(tags)
})


var pinsUrl = 'https://vip.cocode.cc/uploads/pins.json'
ajaxGet(pinsUrl, function(data){
    var pins = JSON.parse(data)
    //把pins作为全局变量
    window.pins = pins

})

//得到每个数据
var keys = function() {
    var l = []
    for (var i = 0; i < pins.length; i++) {
        var p = pins[i]
        var key = p.file.key
        l.push(key)
    }
    //得到所有的key
    return l
}

var addImgByKeys = function(keys) {
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        var url = 'http://img.hb.aicdn.com/'+ k
        var tag = `<img src = ${url}>`
        var div = document.insertAdjacentHTML('beforeend', tag)
    }
}





//创建ajax包括post
/*
request 是一个 object, 有如下属性
method, 请求的方法, string (POST / GET)
url, 请求的路径, string
data, 请求发送的数据, 如果是 GET 方法则没这个值, string
callback, 响应回调, function
*/
var ajax = function(request) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(request.method, request.url, true)
    // 设置发送的数据的格式
    if (request.ContentType !== undefined) {
        r.setRequestHeader('Content-Type', request.ContentType)
    }
    // 注册响应函数
    r.onreadystatechange = function() {
        //readyState=4表示成功
        if (r.readyState === 4) {
            console.log(r)
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else{
        r.send(request.data)
    }
}

// 设置object，data需要json反序列化
var account = {
    'username':'username',
    'password':'pwd'
}
var data = JSON.stringify(account)
var r = {
    method: 'POST',
    url: 'http://',
    //data需要是json格式，看网页要求
    data: data,
    ContentType: 'application/json',
    callback: function(response) {
        console.log('响应', response)
        var res = JSON.parse(response)
        if (res.sucess) {
            //登录成功回到主页
            window.location.href = '/'
        } else {
            alert('failed')
        }
    }
}

//把这个函数放到登录按钮就可以登录设置了
ajax(r)


// 时间标准库
/*
常用用法如下
var d = new Date()
d.getFullYear()
年份, 2016
d.getMonth()
月份, 0-11
d.getDate()
日期, 1-31
d.getHours()
小时, 0-23
d.getMinutes()
分钟, 0-59
d.getSeconds()
秒数, 0-59
d.getMilliseconds()
毫秒, 0-999
d.getDay()
星期几, 0-6
*/

//当前时间工具
var currentTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hour = d.getHours() + 1
    var minute = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${year}/${month}/${date} ${hour}:${minute}:${seconds}`
    return timeString
}



//套路3， 序列号和反序列化
// 在 js 中, 序列化使用 JSON 格式

var s = JSON.stringify([1, 2, 3, 4])
log('序列化后的字符串', typeof s, s)
var a = JSON.parse(s)
log('反序列化后的数组', typeof a, a)

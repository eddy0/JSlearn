


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

//当前时间
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

//高阶函数可以当成参数传递,

//process 先将 array 用processor 函数处理，再运行到新的函数中进行二次处理
// array必须能在参数processor的函数中成功调用
//processor必须是一个函数，不能有括号，有括号的意思是得到返回值


//重点套路

//套路1 array处理 ---- ！！！等价于内置的map 函数，以下有介绍！！！
//将array中的每个元素通过processor这个函数处理返回一个新的array
var process = function(array, processor) {
    var l = []
    for (var i = 0; i < array.length; i++) {
        var element = processor(array[i])
        l.push(element)
    }
    return l
}


process(array, function(n){
    //n + 1 为array每个元素的操作返回值
    return n * 2
})


//套路2  过滤
// 设置一个filter函数，实现条件过滤，则得到符合条件的array

var filter = function (array, processor) {
    var l = []
    for (var i = 0; i < array.length; i++) {
        var a = array[i]
        var condition = processor(a)
        //processor 必须能成功调用
        if (condition) {
            l.push(a)
        }
    }
    return l
}


filter(array, function(n){
    // n 为一个参数 函数返回值为要过滤的条件
    //condition = n < 3
    //return condition
    return n < 3
})


//求和基本套路
var sum = function (array) {
    var a = 0
    for (var i = 0; i < array.length; i++) {
        a += array[i]
        }
    return a
}

// 内置函数 map 提供相同处理操作

// 基本格式
array.map(processor)

array.map(function(n){
    //对array进行处理
    return n
})


array.map(String)
array.map(Number)

array.map(function(n){
    //对array * 2
    return n * 2
})




//以下为使用情况
//processor 可以是内置函数，有可以自定义一个函数

// 1. 转化字符串
var array = [1.1, 1.2, 1.3]
process (array, String)

// 2. 转化成数字
var array = ['1.1', '1.2', '1.3']
process(array, Number)

// 3. 向下取整
var array = [1.1, 1.2, 1.3]
process (array, Math.floor)



//如何处理一次数据取决于你怎么写, 自定义一个函数或者一下的匿名函数
//这个之前看不懂是因为里面有一个匿名函数，先定义一个process函数（套路），
//然后通过匿名函数来自定义如何对数据进行处理

process(array, function(n) {
	return n + 1
})


//4. 设置一个filter函数，实现条件过滤，则得到符合条件的array
var filter = function (array, processor) {
    var l = []
    for (var i = 0; i < array.length; i++) {
        var a = array[i]
        var condition = processor(a)
        //processor 必须能成功调用
        if (condition) {
            l.push(a)
        }
    }
    return l
}


filter([20, 30, 10, -10, 0], function(n){
    return n < 0
})


//求array中的奇数和
var numbers = ['1', '3', '5', '23', '100']

// f = process(numbers, Number)
//
// f1 = filter(f, function(n){
//       return n % 2 == 1
// })

//整理得到,求奇数
var f = filter(process(numbers, Number), function(n){
    return n % 2 == 1
})

//求和
var sum = function (array) {
    var a = 0
    for (var i = 0; i < array.length; i++) {
        a += array[i]
        }
    return a
}

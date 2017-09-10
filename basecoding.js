
// 作业 7
//

/*
s 是一个 string
返回 s 的 base64 编码

Base64是一种基于 64 个可打印字符来表示数据的方法
它用每6个比特为一个单元，对应某个可打印字符
ASCII 码一个字符是 8 比特, 也就是一字节
3 个字节就有 24 个比特, 对应了 4 个 base64 单元

如下所示
原始信息        M        a        n
ASCII         77       7        110
二进制         01001101 01100001 01101110
4 个单元       010011 010110 000101 101110
每个单元转换后  19  22  5  46
转换后每个 base64 单元都是一个 0-63 的数字
因为 6 比特表示的范围就是这么大
然后数字到字符串的转换是下面这段字符串取下标所得
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
那么 Base64 编码结果就是    T   W   F  u
所以 base64Encode('Man') 返回 'TWFu'
既然 3 个字节转换为 4 个 base64 单元
那么 1 个字节怎么办呢?
答案是用 0 补出 3 字节, 如下所示
werang
原始信息    M
ASCII     77       0        0
二进制     01001101 00000000 00000000
4 个单元   010011 010000 000000 000000

          24-len
单元转换后  19 16 0 0

因为末尾是强行补上的, 所以给他用 '=' 凑出字符(这是一个例外)
所以 base64Encode('M') 返回 'TQ=='
*/





var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

//一个十进制转化为二进制
var binary = function(n) {
    var char = ''
    while(n !== 0) {
        char =  n % 2  + char
        n = Math.floor( n / 2)
    }
    var len = char.length
    for (var i = 0; i < (8 - len); i++) {
        char =  '0' + char
    }
    return char
}

//多个十进制转换为二进制串
var binaryStream = function(s) {
    var n = ''
    for (var i = 0; i < s.length; i++) {
        // log(s[i])
        var a = s[i].charCodeAt(0)
        var b = binary(a)
        // log(b)
        n = n + b
    }
    return n
}

//把二进制转换为十进制的函数
var int1 = function(bin) {
    var char = 0
    for (var i = 0; i < bin.length; i++) {
        var j = bin.length - 1 - i
        var n = bin[j] * Math.pow(2, i)
        char += n
    }
    return char
}

//把二进制转换为bs64
var bs64 = function(b){
    var letter = ''
    //把这个bytes分段找字母
    var len64 = b.length / 6
    for (var i = 0; i < len64; i++) {
        //对每一段的6个bytes进行处理
        var a = b.slice(i * 6, (i + 1) * 6)
        log('a---', a)
        if (a == '000000') {
            letter = letter + '='
        } else{
            //把二进制转化为10进制之后到字母表去找下标
            var index = int1(a)
            letter = letter + upper[index]
        }
        // log('letter--', letter)

    }
    return letter
}


//ascii转64的二进制
var base64Encode = function(s) {
    var b = binaryStream(s)
    //给字节加0，不能被6整除则加一个字节，最多加3次就可以被6整除
    for (var i = 0; i < 3; i++) {
        var len = b.length
        if(len % 6 !== 0 ){
            b = b + '00000000'
            len = b.length
        }
    }
    //函数进行处理转换问题
    log('b, len---',b, len)
    return bs64(b)
}




// 作业 8
//
/*
s 是一个 base64 编码后的字符串
解码 s 并返回
例如 base64Decode('TWFu') 返回 'Man'
*/

/*
如下所示
原始信息        M        a        n
ASCII         77       7        110
二进制         01001101 01100001 01101110
4 个单元       010011 010110 000101 101110
每个单元转换后  19  22  5  46
转换后每个 base64 单元都是一个 0-63 的数字
因为 6 比特表示的范围就是这么大
然后数字到字符串的转换是下面这段字符串取下标所得
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
那么 Base64 编码结果就是    T   W   F  u
所以 base64Encode('Man') 返回 'TWFu'
既然 3 个字节转换为 4 个 base64 单元
那么 1 个字节怎么办呢?
答案是用 0 补出 3 字节, 如下所示
werang
原始信息    M
ASCII     77       0        0
二进制     01001101 00000000 00000000
4 个单元   010011 010000 000000 000000

单元转换后  19 16 0 0

因为末尾是强行补上的, 所以给他用 '=' 凑出字符(这是一个例外)
所以 base64Encode('M') 返回 'TQ=='



TWFU---010101 --man

// twfu--0000 --- 010101 能被8整除的bins--二进制变为十进制
//string返回6个bytes的bins

*/



// 17--010101
var binary64 = function(n) {
    var char = ''
    while(n !== 0) {
        char =  n % 2  + char
        var n = Math.floor( n / 2)
    }
    var len = char.length
    for (var i = 0; i < (6 - len); i++) {
        char =  '0' + char
    }
    return char
}

var indexOfLetter = function(s){
    for (var i = 0; i < upper.length; i++) {
        if(upper.includes(s)){
            if(upper[i] == s) {
                return i
            }
        }
    }
}

//找到base64的bytes
var binaryStream64 = function(s) {
    var n = ''
    for (var i = 0; i < s.length; i++) {
        // 得到下标, 就可以得到01010101
        if (s[i] == '=' ){
            n = n
        } else {
        var index = indexOfLetter(s[i])
        var bin = binary64(index)
        n = n + bin
        }
    }
    return n
}

//把8bytes二进制转换为十进制的函数
var int8 = function(bin) {
    var char = 0
    for (var i = 0; i < bin.length; i++) {
        var j = bin.length - 1 - i
        var n = bin[j] * Math.pow(2, i)
        char += n
    }
    return char
}

//十进制找到ASCII的字母
var stringFromBinary = function(bins) {
    var string = ''
    for (var i = 0; i < bins.length / 8; i++) {
        var bin = bins.slice( 8 * i, (i+1) * 8)
        log('bin---', bin)
        if (bin == '00000000') {
            string = string
        } else {
            var t = int8(bin)
            var s = String.fromCharCode(t)
            string = string + s
        }
    }
    return string

}

//把6位bytes转化为8位bytes
var base64String = function(s){
    var bins = binaryStream64(s)
    log('bins', bins)
    for (var i = 0; i < 4; i++) {
        len = bins.length
        if(len % 8 !== 0) {
            bins = bins + '000000'
            len = bins.length
        }
    }
    log('finnal bins---', bins)
    return bins
}

var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var base64Decode = function(s) {
    var a = base64String(s)
    return  stringFromBinary(a)
}

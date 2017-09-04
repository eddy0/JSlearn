
//响应事件通过改变css实现， js只是改变元素的class让其拥有不同的css

//事件响应基本套路 1. 找到选择器， 2. 访问事件， 3. 绑定事件,设置函数改变class从而改变css


//套路1 鼠标经过事件
var a = document.querySelector('#id-a-click')


a.addEventListener('mouseover', function(){
    var tip = document.querySelector('.tip')
    tip.classList.add('i-hide')
})

a.addEventListener('mouseover', function(){
    var tip = document.querySelector('.tip')
    tip.classList.remove('i-hide')
})


//套路2， 开关灯事件，实际为css图层问题，遮罩最前面div以外屏幕部分,注意css设置z-index


var light = document.querySelector('#id-button-light')

var kaiguan = function() {
    log('开关灯')
    var mask = document.querySelector('.mask')
    toggle(mask, 'mask-active')
}

light.addEventListener('click', kaiguan())



//套路3 图片切换
//思路，有一个函数处理切换下一张图片， 所以可以先定义一个空函数，之后再处理，
//函数要实现找到显示不同图片的位置和css增减，图片的定位即css的定位，一共多少图片，用 i[0], i[1] 可以解决


var currentIndex = 0
var numberOfImages = 3

var next = function(){
    currentIndex = (currentIndex + 1) % numberOfImages
    var slider = document.querySelector('.slider')
    var image = document.querySelector('.slider-active')

    //把所有图片隐藏再显示下一张图片
    image.classList.remove('slider-active')
    var active = document.querySelectorAll('.slider-img')[currentIndex]
    active.classList.add('slider-active')
}

var nextButton = document.querySelector('#id-button-next')
nextButton.addEventListener('click', function(){
    next()
})





//以下为例子参考
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>practive</title>
        <style>
            .i-hide {
                display: none;
            }
            .slider {
                position: relative;
                width: 100px;
                height: 100px;
                background: lightyellow;
            }
            .slider-img {
                display: none;
            }
            .slider-active {
                display: inline-block;
            }
            #id-button-next {
                position: absolute;
                right: 0px;
                height: 100%;
                width: 30px;
                background: transparent;
                border: none;
            }
            span {
                display: block;
                background: rgba(0, 0, 0, 0.5);
                width: 100%;
                color: white;
            }
        </style>
    </head>
    <body>
        <a id='id-a-click' href="#">click</a>
        <div class="tip gua-hide">
            Hide you want to see
        </div>
        <div class="slider">
            <img class='slider-img slider-active' src="1.gif" alt="" />
            <img class='slider-img' src="2.jpg" alt="" />
            <img class='slider-img' src="3.jpg" alt="" />
            <button id='id-button-next' type="button" name="button"><span>&gt;</span></button>
        </div>
        <script src='words.js'></script>
        <script src='code.js'></script>
        <script>
            var a = document.querySelector('#id-a-click')
            a.addEventListener('mouseover', function(){
                var tip = document.querySelector('.tip')
                tip.classList.remove('i-hide')
            })
            a.addEventListener('mouseout', function(){
                var tip = document.querySelector('.tip')
                tip.classList.add('gua-hide')
            })

            var currentIndex = 0
            var numberOfImages = 3
            var next = function(){
                currentIndex = (currentIndex + 1) % numberOfImages
                var slider = document.querySelector('.slider')
                var image = document.querySelector('.slider-active')
                image.classList.remove('slider-active')
                //
                var active = document.querySelectorAll('.slider-img')[currentIndex]
                active.classList.add('slider-active')
            }

            var nextButton = document.querySelector('#id-button-next')
            nextButton.addEventListener('click', function(){
                next()
            })
        </script>
    </body>
</html>

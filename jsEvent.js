
//响应事件通过改变css实现， js只是改变元素的class让其拥有不同的css

//事件响应基本套路 1. 找到选择器， 2. 访问事件， 3. 绑定事件,设置函数改变class从而改变css


//套路1 鼠标经过事件
//鼠标经过出现一段tip
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


//经典套路4 在页面中添加东西的框

// 给 add button 绑定添加 todo 事件
var addButton = document.querySelector('#id-button-add')

addButton.addEventListener('click', function(){
    // 获得 input.value
    var todoInput = document.querySelector('#id-input-todo')
    var todo = todoInput.value
    // 添加到 container 中
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
})

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <span contenteditable='true'>${todo}</span>
        </div>
    `
    return t
}



//终极套路，绑定一系列事件，制作一个清单

// 自己定义一个 log 函数
var log = function() {
    console.log.apply(console, arguments)
}

// 给 add button 绑定添加 todo 事件
var bindEventAdd = function() {
    log('bind add button')
    var addButton = document.querySelector('#id-button-add')
    log('add button', addButton)
    addButton.addEventListener('click', function(){
        log('click add')
        // 获得 input.value
        var todoInput = document.querySelector('#id-input-todo')
        var task = todoInput.value
        // 生成 todo 对象
        var todo = {
            'task': task,
            'time': currentTime()
        }
        todoList.push(todo)
        saveTodos()
        insertTodo(todo)
    })
}

var bindEventEnter = function() {
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('keydown', function(event){
        log('container keydown', event, event.target)
        var target = event.target
        if(event.key === 'Enter') {
            log('按了回车')
            // 失去焦点
            target.blur()
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            log('update index',  index)
            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML
            // todoList.splice(index, 1)
            saveTodos()

        }
    })
}

var bindEventButton = function() {
    // 通过 event.target 的 class 来检查点击的是什么
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener('click', function(event){
        log('container click', event, event.target)
        var target = event.target
        if(target.classList.contains('todo-done')) {
            log('done')
            // 给 todo div 开关一个状态 class
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
        } else if (target.classList.contains('todo-delete')) {
            log('delete')
            var todoDiv = target.parentElement
            var index = indexOfElement(target.parentElement)
            log('delete index',  index)
            todoDiv.remove()
            // 把元素从 todoList 中 remove 掉
            // delete todoList[index]
            todoList.splice(index, 1)
            saveTodos()
        } else if (target.classList.contains('todo-edit')) {
            log('edit')
            var cell = target.parentElement
            var span = cell.children[3]
            log('span is ', span)
            span.setAttribute('contenteditable', 'true')
            // span.contentEditable = true
            span.focus()
        }
    })
}

var GuaEventType = {
    blur: 'blur',
    click: 'click',
}
// EventType.blur
// EventType.click

var bindEventBlur = function() {
    log('bind event blur function')
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.addEventListener(GuaEventType.blur, function(event){
        log('container blur', event, event.target)
        var target = event.target
        if (target.classList.contains('todo-label')) {
            log('update and save')
            // 让 span 不可编辑
            target.setAttribute('contenteditable', 'false')
            // 更新 todo
            var index = indexOfElement(target.parentElement)
            log('update index',  index)
            // 把元素在 todoList 中更新
            todoList[index].task = target.innerHTML
            // todoList.splice(index, 1)
            saveTodos()
        }
    }, true)
}

var bindEvents = function() {
    // 添加 todo
    bindEventAdd()
    // 文本框输入 todo 按回车保存
    bindEventEnter()
    // 完成按钮和删除按钮
    bindEventButton()
    // 文本框失去焦点后保存 todo
    bindEventBlur()
}


var insertTodo = function(todo) {
    // 添加到 container 中
    var todoContainer = document.querySelector('#id-div-container')
    var t = templateTodo(todo)
    // 这个方法用来添加元素更加方便, 不需要 createElement
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
            <button class='todo-edit'>编辑</button>
            <span class='todo-label' contenteditable='false'>${todo.task}</span>
            <span>${todo.time}</span>
        </div>
    `
    return t
}

// 保存 todoList
var saveTodos = function() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

var loadTodos = function() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

// 返回自己在父元素中的下标
var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            return i
        }
    }
}

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}


var initTodos = function() {
    todoList = loadTodos()
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i]
        insertTodo(todo)
    }
}


var todoList = []

var __main = function() {
    // 绑定事件
    bindEvents()

    // 程序加载后, 加载 todoList 并且添加到页面中
    initTodos()
}

__main()




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

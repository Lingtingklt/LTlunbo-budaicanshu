//将整体封装成一个自运行函数
(function ($) {
    //本函数每次调用只负责一个轮播图的功能
    //也就是说只会产生一个轮播，这个函数的作用域只分给一个轮播图
    //所以在调用本函数的时候务必将当前轮播图的标签传递过来

    var slide = function (ele) {
        var $ele = $(ele);
        //默认的设置选项
        var setting = {
            //控制刚刚炸开的时间
            delay: 1000,
            //控制time的时间(轮播速度)
            speed: 2000
        };
        //轮播样式

        //规定好每张图片的位置和状态
        var states = [
            {ZIndex: 1, width: 120,height: 150,top: 69,left: 134,opac: 0.2},
            {ZIndex: 2, width: 130,height: 170,top: 59,left: 0,opac: 0.5},
            {ZIndex: 3, width: 170,height: 218,top: 36,left: 110,opac: 0.7},
            {ZIndex: 4, width: 224,height: 288,top: 0,left: 263,opac: 1},
            {ZIndex: 3, width: 170,height: 218,top: 36,left: 470,opac: 0.7},
            {ZIndex: 2, width: 130,height: 170,top: 59,left: 620,opac: 0.5},
            {ZIndex: 1, width: 120,height: 150,top: 69,left: 500,opac: 0.2}
        ];
        //将状态和位置赋给li
        var lis = $(ele).find(' li');

        function move() {
            lis.each(function (index, ele) {
                var state = states[index];
               
                //初始效果
                $(ele).css('z-index', state.ZIndex).finish().animate(state, setting.delay).find('img').css('opacity', state.opac);
            })
        }
        //初始调用
        move();
        //下一张
        function next() {
            //原理：把数组中的最后一个元素移动到第一个元素位置
            states.unshift(states.pop());
            move();
        }
        $(ele).find('.slide-next').click(function () {
            next();

        })
        //上一张
        function prev() {
            //原理：把数组中的第一个元素移动到最后一个元素位置
            states.push(states.shift());
            move();
        }
        $(ele).find('.slide-prev').click(function () {
            prev();

        })

        //自动轮播
        var time = null;

        function autoPlay() {
            time = setInterval(function () {
                next()
            }, setting.speed)
        }
        autoPlay();

        //停止轮播
        $(ele).find('section').add(lis).hover(function () {
            clearInterval(time);
        }, function () {
            autoPlay();
        })
    }
    $.fn.WSQSlide=function () {
        $(this).each(function (i,ele) {
            slide(ele)
        })
        // 支持链式调用
        return this;
    }  
})(jQuery)








//封装为插件，能够重复使用，会产生什么效果？
//1、插件中最好不要使用id，原因：id具有唯一性，插件是为了重复使用的，会造成页面冲突
//2、变量命名和方法命名：states、time、move()、用户在使用这个插件的时候，可能还会引入自己的创建的文件，这样会产生冲突
//3、标签class值的问题：prev、next。这些class名太大众化，大多数会被重复
//4、插件的文件命名问题：index.js  index.css

//变量的作用域的问题：
// 1、全局域[window] 2、函数域[function]
//全局域：从页面打开到关闭之前都是存在的
// 函数域：在函数被调用的一瞬间，(也不一定，要考虑到闭包)


//用jQuery封装插件的几种方法
//插件类写法:
// $.fn.customFun=function () {
    // 自定义插件代码
// }
//用法：
// $('div').customFun()


//工具类的写法  $.ajax()
// $.customFun=function () {
//     //自定义工具类的代码
// }


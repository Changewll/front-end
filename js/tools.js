var timeout;
//创建一个可以执行简单动画功能的函数move()
/* 参数：obj移动目标 target移动位置限制 speed移动速度 */
//bug1:一按左移就直接跳回原位置，非移动
function move(obj, target, speed) {

    clearInterval(obj.timeout);
    timeout = setInterval(() => {
        var oldValue = parseInt(getComputedStyle(obj, null)["left"]);
        //speed>0为向右移，speed<0为向左移对用户不友好
        //统一规定speed>0，如何区分移动方向？
        //当位置小于stopmin时应向右移，大于stopmax时向左移
        //oldValue<target,speed>0 oldValue>target,speed<0
        //重点bug1：因为在第二次循环的时候本身speed为负值，这里取反又变回正值了
        //导致下面执行newValue=target
        //故加上&& speed > 0
        if (oldValue > target && speed > 0) {
            speed = -speed;
        }
        var newValue = oldValue + speed;
        if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
            newValue = target;
        }
        obj.style.left = newValue + "px";
    }, 300);
}
// 4.定义一个函数，在原来基础上添加指定的class属性值
// 参数：obj 要添加class属性的元素，对象
//       cn 要添加的class值，字符串
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }

}
// 5.定义一个函数，判断一个元素是否含有指定的class属性值
//返回值：true表示有，false表示无
function hasClass(obj, cn) {
    //6.创建一个正则表达式，但出现b212连字无效，故添加\b单词边界
    // var reg = /\bb2\b/;
    // if(reg.test(obj.className)){
    //     return true;
    // }else{
    //     return false;
    // }
    //7.另一种创建正则表达式的方法
    var reg = new RegExp("\\b" + cn + "\\b");
    // alert(reg);
    return reg.test(obj.className);
}
// 8.定义一个函数，移除指定的class属性值
function removeClass(obj, cn) {
    //创建一个正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

//9.定义函数toggleClass可以用来切换一个类
//10.定义的函数都可以在classList中找到
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}
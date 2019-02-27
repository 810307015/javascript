// 封装一些公共的方法

/*
对于动画的封装
*/
// 常见的缓动算法,所有的方法接受四个参数
// 第一个参数，动画已经消耗的时间
// 第二个参数，小球的原始位置
// 第三个参数，小球目标位置
// 第四个参数，动画持续的总时间
let tween = {
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t + 1) + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
};

let Animate = function(dom) {
    this.dom = dom; //进行运动的节点
    this.startTime = 0; // 动画开始时间
    this.startPos = 0; // 动画开始时，dom节点的位置，初始位置
    this.endPos = 0; // 动画结束时，dom节点的位置，目标位置
    this.propertyName = null; // dom节点需要改变的css属性名
    this.easing = null; // 缓动算法
    this.duration = null; // 动画持续时间
}
Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date; // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom节点初始位置
    this.propertyName = propertyName; // dom节点需要改变的css属性名
    this.endPos = endPos; // dom节点目标位置
    this.duration = duration; // 动画持续时间
    this.easing = tween[easing]; // 缓动算法
    let self = this;
    let timeId = setInterval(function() {
        if (self.step() === false) {
            clearInterval(timeId);
        }
    }, 19);
}
Animate.prototype.step = function() {
    let t = +new Date;
    if (t >= (this.startTime + this.duration)) {
        this.update(this.endPos);
        return false;
    }
    let pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
}
Animate.prototype.update = function(pos) {
    this.dom.style[this.propertyName] = pos + 'px';
}

/*
使用示例
let ball = document.getElementById('ball');
let animate1 = new Animate(ball);
animate1.start('left', 800, 1000, 'linear');
*/


/*
表单校验
*/
// 将校验规则封装成策略对象
let startegies = {
    isNotEmpty: function(value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    minLength: function(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    maxLength: function(value, length, errorMsg) {
        if (value.length > length) {
            return errorMsg;
        }
    },
    isMobile: function(value, errorMsg) {
        if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
            return errorMsg;
        }
    },
    isIntNumber: function(value, errorMsg) {
        if (Object.is(+value, NaN) || value.indexOf('.') !== -1) {
            return errorMsg;
        }
    }
};
// Context对象Validator
let Validator = function() {
    this.cache = [];
}
Validator.prototype.add = function(dom, rule, errorMsg) {
    let arg = rule.split(':');
    this.cache.push(function() {
        let strategy = arg.shift();
        arg.unshift(dom.value);
        arg.push(errorMsg);
        return startegies[strategy].apply(dom, arg);
    });
}
Validator.prototype.start = function() {
    for (let i = 0; i < this.cache.length; i++) {
        let msg = this.cache[i]();
        if (msg) {
            return msg;
        }
    }
}
/*
使用示例
let myForm = document.getElementById('myForm');
let validateFunc = function() {
    let validator = new Validator();
    validator.add(myForm.username, 'isNotEmpty', '用户名不能为空');
    validator.add(myForm.username, 'minLength:6', '用户名最少为6位');
    validator.add(myForm.username, 'maxLength:16', '用户名最多为16位');
    validator.add(myForm.username, 'isIntNumber', '用户名只能为纯数字');
    let errorMsg = validator.start();
    return errorMsg;
}

myForm.onsubmit = function() {
    let errorMsg = validateFunc();
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}*/

/*
函数的反柯里化，将一些方法提取出来变成公共的方法
*/
// 将apply，call借用Array的方法提取出来
Function.prototype.uncurrying = function () {
    let self = this;

    return function () {
        let obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
/*
使用示例
let push = Array.prototype.push.uncurrying();
let obj = {};
push(obj, 1);
push(obj, 2);
*/


/*
对象数组的排序
*/
// prop: 需要使用哪个属性进行排序
// flag: true按照升序排序，false按照降序排序,默认为降序
Array.prototype.arraySort = function (prop, flag) {
    flag = flag !== undefined ? flag : true;
    if (flag) {
        this.sort((o1, o2) => (o1[prop] - o2[prop]));
    } else {
        this.sort((o1, o2) => (o2[prop] - o1[prop]));
    }
}
/*
使用示例
let arr = [
    {a: 1},
    {a: 3},
    {a: 5},
    {a: 7},
    {a: 9},
    {a: 2},
    {a: 4},
    {a: 6},
    {a: 8},
];
arr.arraySort('a');
console.log(arr);
*/

/* 动态生成菜单 */
/* 
  menu = [
    {
        id: 1,
        name: 'menu1',
        children: [...]
    },{
        id: 2,
        name: 'menu2',
        children: [...]
    }
  ]
 */
var generateMenu = function (menu, rank) {
    var res = "";
    for (var i = 0;i < menu.length; i++) {
        res += "<div id='" + menu[i].id + "' class='menu-" + rank + "'>" + menu[i].name + (menu[i].children ? generateMenu(menu[i].children, rank+1) : '') + "</div>";
    }
    return res;
};

var menu = [
    {
        id: 1,
        name: 'menu-1',
        children: [
            {
                id: 10,
                name: 'menu-10'
            },
            {
                id: 11,
                name: 'menu-11'
            }
        ]
    },{
        id: 2,
        name: 'menu-2',
        children: [
            {
                id: 12,
                name: 'menu-12'
            },
            {
                id: 13,
                name: 'menu-13'
            }
        ]
    }
];

console.log(generateMenu(menu, 1));
// 观察者模式，又叫发布-订阅模式。实现对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
// 浏览器中的各种dom事件的绑定就是观察者模式，如click，change等等。
// webscoket的消息传递模式也能算是发布-订阅模式。

// 自定义模拟一个观察者模式

// 定义一个发布者对象
let Poster = function() {
    // 存放订阅者的回调函数和名称对应关系的列表
    this.receiverList = [];
    // 存放订阅者名称的列表
    this.receiverNames = [];
    // 存放需要发送的消息主体
    this.data = null;
    // 是否允许二次订阅，默认允许
    this.flag = true;
    // 加一个缓存区,当目前没有用户连接时，可以将当前数据存进缓存区，等到有订阅者订阅后再直接给它返回消息
    this.cache = null;
};
// 设置需要发布的消息
Poster.prototype.setData = function(data) {
    this.data = data || null;
}

// 设置是否可以覆盖
Poster.prototype.setFlag = function (flag) {
	this.flag = flag === undefined ? true : flag;
}

// 主动设置缓存区的内容
Poster.prototype.setCache = function (cache) {
	cache = cache === undefined ? null : cache;
	this.cache = cache;
}

// 每当订阅者订阅时，就将其回调方法存入列表中
// 接受一个消息名称，用来标识唯一订阅者，和一个回调函数
Poster.prototype.subscribe = function(objName, fn) {
    // 当没有传数据的时候或者少传数据的时候进行处理
    if (arguments.length === 1) {
        if (typeof arguments[0] === 'function') {
            fn = arguments[0];
            objName = undefined;
        } else {
            objName = arguments[0];
            fn = undefined;
        }
    }
    objName = objName === undefined ? +new Date : objName;
    fn = fn === undefined || typeof fn !== 'function' ? () => {} : fn;

    // 当改订阅消息已经订阅过后，可以决定是否覆盖或者订阅多次
    if (this.receiverNames.includes(objName) && !this.flag) {
        this.receiverList.forEach(receiver => {
            if (receiver.name === objName) {
                receiver.callback = fn;
            }
        })
    } else {
        this.receiverNames.push(objName);
        this.receiverList.push({
            name: objName,
            callback: fn
        });
    }

    // 订阅完毕后当缓存区不为空的时候，将缓存区的数据推送给订阅者
    if (this.cache !== null) {
    	this.data = this.cache;
    	this.trigger();
    }
}
// 发布者动修改状态,可以决定是单独发送某个订阅者还是多个订阅者
// 接受一个消息名称的数组，将消息传递给这些对象
// 其余的为一个剩余参数
Poster.prototype.trigger = function(objNames) {
    // 当没有传数据的时候进行处理
    objNames = objNames === undefined || objNames.length === 0 ? this.receiverNames : objNames;
    let receiverList = this.receiverList.filter(receiver => objNames.find(objName => objName === receiver.name));
    let self = this;
    if (receiverList.length === 0) {
    	this.cache = this.data;
    } else {
    	receiverList.map(receiver => receiver.callback(self.data));
    }
}

// 取消订阅
// 传递一个消息名称数组，空数组或不传时，移除所有订阅者
Poster.prototype.removeReceiver = function(objNames) {
    // 当没有传数据的时候进行处理
    objNames = objNames === undefined || objNames.length === 0 ? this.receiverNames : objNames;
    this.receiverList = this.receiverList.filter(receiver => !objNames.find(objName => objName === receiver.name));
}

let obj_a = {
    name: 'a'
};
let obj_b = {
    name: 'b'
};
let obj_c = {
    name: 'c'
};
let obj_d = {
    name: 'd'
};

// 先发布，后订阅
let poster = new Poster();
poster.setData('12345');
poster.trigger();

poster.subscribe('a', function (data) {
	console.log(data);
});

// 先订阅， 后发布
// poster.subscribe('a', (data) => {
//     obj_a.data = data;
// });
// poster.subscribe('b', (data) => {
//     obj_b.data = data;
// });
// poster.subscribe('c', (data) => {
//     obj_c.data = data;
// });
// poster.subscribe('d', (data) => {
//     obj_d.data = data;
// });

// poster.trigger(['a', 'b', 'c'], 'Hello', 'World', '你好', '世界');
// console.log(obj_a);
// console.log(obj_b);
// console.log(obj_c);
// console.log(obj_d);


// console.log('---------')
// poster.removeReceiver(['a']);
// poster.setData('Hello');
// poster.trigger(['b', 'c']);
// console.log(obj_a);
// console.log(obj_b);
// console.log(obj_c);
// console.log(obj_d);

// poster.subscribe(function(data) {
//     console.log('匿名订阅者' + data);
// });
// poster.setFlag(false);
// poster.subscribe('d', function(data) {
//     console.log('二次订阅' + data);
// });
// poster.setData('123456');
// poster.trigger();
// console.log(poster);
// poster.removeReceiver();
// poster.trigger();
// console.log(poster);
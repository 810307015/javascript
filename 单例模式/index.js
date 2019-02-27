// 单例模式： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
// 应用场景： 线程池，全局缓存，浏览器中的window对象，公共的登陆弹窗等等。


// 最简单的单例模式,模拟面向对象，而且实现了惰性单例
let Singleton = function (name) {
	this.name = name;
	this.instance = null;
}

Singleton.prototype.getName = function () {
	return this.name;
}

Singleton.getInstance = function (name) {
	if (!this.instance) {
		this.instance = new Singleton(name);
	}
	return this.instance;
}

let a = Singleton.getInstance("item1");
let b = Singleton.getInstance("item2"); // 这个时候返回的是name为item1的单例对象

console.log(a); // Singleton { name: 'item1', instance: null }
console.log(b); // Singleton { name: 'item1', instance: null }
console.log(a === b); // true

// 以上的单例模式不太好的是，不是通过new来获取一个单例对象，这样使用者在使用之前比必须知道它是一个单例类且使用getInstance来获取该单例对象。增加了该单例类的不透明性。而且使用传统的面向对象语言中的单利模式生搬硬套反而没有遵循语言原生的好。
// 接下来就是一个透明的单例类，用户不需要知道它是不是单例类，也不需要使用它的方法，只需要像使用其它的类一样new一下就好了。
// 模拟一个全局缓存的单例对象, 这其实就是javascript中独有的单利模式了,也用到了惰性加载，只有被调用的时候会被调用。而且是一个通用的，只需要修改func中的方法，就可以获得不同情境下的单例对象。
let func = function () {
	return [];
}

let SingleCache = (function (fn) {
	let cache;
	return function() {
		return cache || (cache = fn.apply(this, arguments));
	}
})(func);

let cache1 = new SingleCache();
let cache2 = new SingleCache();
cache1.push(1, 2, 3);
console.log(cache2); // [1, 2, 3]

// 在js中，我们经常会把全局变量来当作一个单例模式来使用。
// 因为本身js中并没有类的概念，我们只需要创建一个全局对象，就可以模拟一个单例对象了。
// 但是全局变量其实是很容易引起全局变量污染的，很容易被覆盖掉。
// 所以我们可以采用命名空间的方式和闭包的方式来实现，上面的方法就是闭包实现，使用命名空间的话就是这样。
let namespace = {
	a : function () {
		console.log(1);
	},
	b : function () {
		console.log(2);
	}
}

// 或者动态的生成命名空间
let myApp = {};
myApp.namespace = function (name) {
	let parts = name.split('.');
	let current = myApp;
	for (let i in parts) {
		if(!current[parts[i]]) {
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
}

myApp.namespace('event');
myApp.namespace('dom');

console.dir(myApp); // { namespace: [Function], event: {}, dom: {} }
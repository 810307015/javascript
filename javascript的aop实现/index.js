Function.prototype.before = function (beforefn) {
	// 保留原函数的this上下文
	var _self = this;
	// console.log(_self); // Function func
	// 返回了包括原函数和新函数的代理函数
	return function () {
		// console.log(this === global); // true
		// 先执行新函数，修正this
		// beforefn.apply(this, arguments);
		// 执行原函数
		// return _self.apply(this, arguments);
		// 使用判断可以模拟拦截器的效果，在调用方法之前作相应的判断
		if (beforefn.apply(this, arguments)) {
			return _self.apply(this, arguments);
		} else {
			return null;
		}
	}
}

Function.prototype.after = function (afterfn) {
	var _self = this;
	return function () {
		var result = _self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return result;
	}
}

var func = function () {
	console.log("这是原函数需要打印的内容");
}

func = func.before(function () {
	console.log("我是在函数运行之前调用");
	return true;
}).after(function () {
	console.log("我是在函数运行之后调用");
});

func();


// 使用aop简单实现一个add函数的调用前判断
var add = function (a, b) {
	console.log(a + b);
}

add = add.before(function () {
	//console.log(arguments);
	if (arguments.length !== 2) {
		console.log("传过来的参数个数不正确，应该为2个，实际为" + arguments.length + "个.");
		return false;
	}
	if (Object.is(NaN, parseFloat(arguments[0])) || Object.is(NaN, parseFloat(arguments[1]))) {
		console.log("传过来的两个数不是数字，请检查参数后再调用");
		return false;
	} else {
		return true;
	}
});

add(1.2, 1, 3, 5, 6);
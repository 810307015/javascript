// 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的。

// 还是以add函数为例，假如我们现在要在任何时候都能计算传进来的所有值，而且所有值都是一个或多个往函数中传值的。
let add = (function () {
	let args = [];

	return function () {
		if (arguments.length === 0) {
			let result = 0;
			for(let i = 0; i < args.length; i++) {
				result += args[i];
			}
			return result;
		} else {
			Array.prototype.push.apply(args, arguments);
		}
	}
})();

console.log(add(1)); // undefined
console.log(add(2, 3)); // undefined
console.log(add(4, 5, 6)); // undefined
console.log(add(7, 8, 9, 10)); // undefined
console.log(add()); // 55

// 封装一个通用的currying方法，来实现方法的柯里化。
let currying = function (fn) {
	let args = [];

	return function () {
		if (arguments.length === 0) {
			return fn.apply(this, args);
		} else {
			[].push.apply(args, arguments);
			// console.log(arguments.callee) 
			// Function,callee为一个指向该拥有该arguments的函数的指针，在这里指的就是multiCurry这个方法。
			return arguments.callee;
		}
	}
};

let multiCurry = currying(function () {
	let result = 1;
	for (var i = 0; i < arguments.length; i++) {
		result *= arguments[i];
	}
	return result;
});
console.log(multiCurry(1)); // Function
console.log(multiCurry(2, 3)); // Function
console.log(multiCurry(4, 5, 6)); // Function
console.log(multiCurry(7, 8, 9, 10)); // Function
console.log(multiCurry()); // 3628800

// 将apply，call借用Array的方法提取出来
Function.prototype.uncurrying = function () {
	let self = this;

	return function () {
		let obj = Array.prototype.shift.call(arguments);
		return self.apply(obj, arguments);
	}
}

let push = Array.prototype.push.uncurrying(); //这个时候self就是指向push方法的一个指针

let obj = {
	a: 1,
	b: 2,
	c: 3,
	length: 3, // 最好是给对象添加一个length属性，因为在使用push方法后会自动给改对象增加一个length属性，并从零开始计算。如果该对象本身有一个length属性，那么会把length属性的值叠加。
};

push(obj, 4);
push(obj, 5);
push(obj, 6);
console.log(obj); // { '3': 4, '4': 5, '5': 6, a: 1, b: 2, c: 3, length: 6 }
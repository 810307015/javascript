let Add = function () {
	// 用来记录计算过的结果
	let cache = {};

	return function (a, b) {
		if (cache[`${a}+${b}`]) {
			console.log('从缓存中读取');
			return cache[`${a}+${b}`];
		} else {
			console.log("Object.keys(cache).length = " + Object.keys(cache).length);
			if (Object.keys(cache).length < 1024) {
				cache[`${a}+${b}`] = a + b;
			} else {
				console.log('删除第一个cache');
				delete cache[Object.keys(cache)[0]]; // 当缓存的长度达到一定限制时，开始删除第一个缓存
				cache[`${a}+${b}`] = a + b;
			}
			return a + b;
		}
	}
}

let add = Add();

console.log(add(1, 1));
console.log(add(1, 1)); // 从缓存中读取
console.log(add(1, 1)); // 从缓存中读取

// for(let i = 0;i < 1030;i++) {
// 	console.log(add(i, i));
// }

//console.log(add(10, 10)); // 从缓存中读取


// 对加减乘除的运算来做缓存
// 定义一个真正的额计算方法
const operator = function(a, b, flag) {
	let result = null;
	switch (flag) {
	 	case '+':
	 		result = a + b;
	 		// statements_1
	 		break;
	 	case '-':
	 		result = a - b;
	 		// statements_1
	 		break;
	 	case '*':
	 		result = a * b;
	 		// statements_1
	 		break;
	 	case '/':
	 		result = a / b;
	 		// statements_1
	 		break;
	 	default:
	 		// statements_def
	 		break;
	 } 
	 return result;
}
let Caculate = function () {
	let cache = {};

	return function (a, b, flag) {
		if (cache[`${a}${flag}${b}`]) {
			console.log('从缓存中读取');
			return cache[`${a}${flag}${b}`];
		} else {
			let result = operator(a, b, flag);
			if (Object.keys(cache).length < 1024) {
				cache[`${a}${flag}${b}`] = result;
			} else {
				console.log('删除第一个cache');
				delete cache[Object.keys(cache)[0]]; // 当缓存的长度达到一定限制时，开始删除第一个缓存
				cache[`${a}${flag}${b}`] = result;
			}
			return result;
		}
	}
}

let caculate = Caculate();

console.log(caculate(1, 2, '+'));
console.log(caculate(1, 2, '+'));
console.log(caculate(1, 2, '+'));

console.log(caculate(1, 2, '-'));
console.log(caculate(1, 2, '-'));

console.log(caculate(1, 2, '*'));
// 判断对象类型
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]' ? true : false;
}

// 判断数组类型
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]' ? true : false;
}

// 判断函数类型
function isFunction(func) {
	return Object.prototype.toString.call(func) === '[object Function]' ? true : false;
}

// 通过策略模式将所有判断方法集合在一起
/*
*第一个参数为需要判断的值，第二个参数为字符串类型,需要判断的类型(Array, Function, Object)
*只是不能判断NaN
*/
function isType(value, type) {
	return Object.prototype.toString.call(value) === `[object ${type}]` ? true : false;
}

// 判断NaN可以用Object.is来实现
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  };
}

// 对数组进行迭代
function myArrIterator(arr) {
	let index = 0;

	return {
		next: function() {
			return index++ < arr.length-1 ? arr[index] : true;
		}
	}
}

// 对对象进行迭代
function myObjIterator(obj) {
	let keys = Object.keys(obj);
	let index = 0;

	return {
		next: function() {
			let result = index < keys.length ? "key = " + keys[index] + ", value = " + obj[keys[index]] : true;
			++index;
			return result;
		}
	}
}

// 根据不同的对象类型来进行不同的迭代器的使用
function anyIterator(iterator) {
	if (isType(iterator, 'Array')) {
		return myArrIterator(iterator);
	} else if (isType(iterator, 'Object')) {
		return myObjIterator(iterator);
	} else {
		return true;
	}
}

let arr = [1, 2, 3, 4, 5, 6];
//let itor = myArrIterator(arr);

let obj = {name: "Jack", age: 18, gender: "male"};
//let itor = myObjIterator(obj);

let itor1 = anyIterator(arr);
let itor2 = anyIterator(obj);

function getAllValue(itor) {
	let value = null;
	while((value = itor.next()) !== true){
		console.log(value);
	}
}

getAllValue(itor1);
getAllValue(itor2);
// 数组的标准定义是：一个存储元素的线性集合（collection），元素可以通过索引来任意存取，索引通常是数字，用来计算元素之间存储位置的偏移量。
// JavaScript 中的数组是一种特殊的对象，用来表示偏移量的索引是该对象的属性，索引可能是整数。然而，这些数字索引在内部被转换为字符串类型，这是因为JavaScript 对象中的属性名必须是字符串。数组在JavaScript 中只是一种特殊的对象，所以效率上不如其他语言中的数组高。
// 一个 JavaScript 的数组可以存放多种不同类型的值。
// 基于 node.js 环境运行

// 数组的几种声明方式
let arr1 = []; // []
let arr2 = new Array(); // []
let arr3 = new Array(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
let arr4 = new Array(5); // [ <5 empty items> ]

// 判断是否是一个数组
console.log(Array.isArray(arr1)); // true
console.log(Object.prototype.toString.apply(arr2) === '[object Array]'); //true

// 读写数组
arr2[0] = 1;
console.log(arr2[0]); // 1

// 由字符串生成数组
let str = "Hello World";
let arr5 = str.split(' ');
console.log(arr5); // [ 'Hello', 'World' ]

// 查找数组
console.log(arr3.indexOf(4)); // 3
console.log(arr3.find(item => item === 2)); // 2
console.log(arr3.find(item => item === 6)); // undefined
// ES7
console.log(arr3.includes(3)); // true

// 数组排序和反序
let arr = [5, 3, 2, 7, 9];
console.log(arr.sort((a, b) => a - b)); // [ 2, 3, 5, 7, 9 ]
console.log(arr.reverse()); // [ 9, 7, 5, 3, 2 ]

// 将数组变成字符串
console.log(arr.join('+')); // 9+7+5+3+2

// 将数组拼接
console.log(arr.concat(arr3)); // [ 9, 7, 5, 3, 2, 1, 2, 3, 4, 5 ]

// 截取数组的子集,或者向数组中间增加或者删除元素
console.log(arr.splice(1, 3)); // [ 7, 5, 3 ]这个是被删除的子数组
arr.splice(0, 0, 5); 
console.log(arr); // [ 5, 9, 2 ]
arr.splice(0, 1);
console.log(arr); // [ 9, 2 ]

// 压栈和出栈
arr.push(15); // 3
console.log(arr); // [ 9, 2, 15 ]
arr.pop(); // 15
console.log(arr); // [9, 2]

// 对第一个元素的操作
arr.unshift(15); // 3
console.log(arr); // [ 15, 9, 2 ]
arr.shift(); // 15
console.log(arr); // [9, 2]

// 迭代器方法
// 不生成新数组的迭代器方法
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 第一个为值，第二个为索引，第三个为数组本身
a.forEach((value, index, arr) => {
	console.log(`a[${index}] = ${value}`); // a[0] = 1 a[1] = 2
});
// 判断数组中的每一项是否满足一个条件，有一个不满足都返回false
console.log(a.every((value, index, arr) => {
	return value > 0;
})); // true
// 判断数组中是否有一项满足条件，有就返回true
console.log(a.some((value, index, arr) => {
	return value > 3;
})); // true
// reduce() 方法接受一个函数，返回一个值。该方法会从一个累加值开始，不断对累加值和数组中的后续元素调用该函数，直到数组中的最后一个元素，最后返回得到的累加值。
// JavaScript 还提供了reduceRight() 方法，和reduce() 方法不同，它是从右到左执行。
// 第一个为回调函数，第二个为初始值。
let result = a.reduce((total, currentVal) => {
	return total + currentVal;
}, 0);
console.log(result); // 45

let s = a.reduce((total, currentVal) => {
	return total + '&' + currentVal;
}, '0');
console.log(s); // 0&1&2&3&4&5&6&7&8&9

// 生成新数组的迭代器方法
console.log(arr3.filter(item => item > 2)); // [ 3, 4, 5 ]
console.log(arr3.map(item => item + 2)); // [ 3, 4, 5, 6, 7 ]

// 创建二维数组
var twod = [];
var rows = 5;
for (var i = 0; i < rows; ++i) {
	twod[i] = [];
}
console.log(twod); // [ [], [], [], [], [] ]
// 也可以在Array对象上进行拓展，添加一个生成二维数组的方法
Array.matrix = function(numrows, numcols, initial) {
	var arr = [];
	for (var i = 0; i < numrows; ++i) {
		var columns = [];
		for (var j = 0; j < numcols; ++j) {
			columns[j] = initial;
		}
		arr[i] = columns;
	}
	return arr;
}
let b = Array.matrix(5, 5, 0);
console.log(b); // [ [ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ] ]
// 还可以直接在声明时赋值
let c = [[1, 2, 3], [4, 5, 6]];
console.log(c); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]

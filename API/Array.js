/* Array本身的方法 */
/* Array.from(arrayLike, ?mapfn, ?thisArg), 从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例*/
/*
	参数1： arrayLike，想要转换成数组的伪数组对象或可迭代对象。
	可选参数2：mapFn，如果指定了该参数，新数组中的每个元素会执行该回调函数。
	可选参数3：thisArg，可选参数，执行回调函数 mapFn 时 this 对象。
*/
function f() {
  return Array.from(arguments);
}
f(1, 2, 3); // [1, 2, 3]

var obj = {
	1: 5,
	2: 7,
	3: 10
}

// 数组去重,ES6语法
var arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
var res = Array.from(new Set(arr)); // [1, 2, 3, 4]

// 如果mapFn使用了箭头函数，就会出现传入的thisArg无效的情况，此时的this永远指向全局，window或global
Array.from([1, 2, 3], x => x*this[x], obj); // [NaN, NaN, NaN]，此时this指向window，window没有对应的值就会出现数字乘undefined，就会变成NaN
Array.from([1, 2, 3], function(x) {
	return x * this[x];
}, obj); // [5, 14, 30]

/* Array.isArray(arg)，判断传递的值是否是一个 Array。 */
/* Array.of(args...), 创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型 */
/* Array.of() 和 Array 构造函数之间的区别在于处理整数参数：Array.of(7) 创建一个具有单个元素 7 的数组，而 Array(7) 创建一个长度为7的空数组（注意：这是指一个有7个空位(empty)的数组，而不是由7个undefined组成的数组）。 */

/* Array.prototype上的方法，数组实例可以调用的方法 */
/* arr.concat(arr1, arr2, ...)，合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。可以传值和多维数组，但是多维数组只会拼接最外面一层 */
var arr = [1];
var arr1 = arr.concat([2, 3], 4, 5, [[6]]);
console.log(arr); // [1]
console.log(arr1); // [1, 2, 3, 4, 5, [6]]

/* arr.copyWithin(target, start, end)，从数组的指定位置(start-end)拷贝元素到数组的另一个指定位置(target)中，数组长度不变，会改变原来的数组 */
/*
	target: 0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
	start: 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
	end: 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。如果 end 被忽略，copyWithin 方法将会一直复制至数组结尾（默认为 arr.length）。
*/
var arr = [1, 2, 3, 4];
arr.copyWithin(-2); // [1, 2, 1, 2]，arr被改成了这个新数组
arr.copyWithin(1, 2); // [1, 1, 2, 2]，arr从上面的结果继续替换
arr.copyWithin(0, 2, 3); // [2, 1, 2, 2], 继续替换

/* arr.entries()返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。arr.values()返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值 */
var arr = [1, 2, 3, 4];
var it = arr.entries();
// 也可以使用for...of来遍历，value的值是[key(index),value]形式的
it.next(); // { done: false, value: [0, 1] }
it.next(); // { done: false, value: [1, 2] }
it.next(); // { done: false, value: [2, 3] }
it.next(); // { done: false, value: [3, 4] }
it.next(); // { done: true, value: undefined }

/* arr.every(callback, thisArg), 测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。 */
var arr = [1, 2, 3, 4];
var obj1 = {
	max: 10,
	min: 0
};
var obj2 = {
	max: 5,
	min: 2
};
// 如果要用箭头函数做回调就不要传thisArg，会失效
arr.every(function(value, index, array) {
	return (value > this.min && value < this.max);
}, obj1); // true
arr.every(function(value, index, array) {
	return (value > this.min && value < this.max);
}, obj2); // false

/* arr.fill(value, start?, end?)，用一个固定值填充一个数组中从起始索引到终止索引内的全部元素，不包括终止索引，不能改变数组的长度 */
var arr = new Array(10);
arr.fill(1, 0, 10); // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
arr = [];
arr.fill(1, 0, 10); // []，数组本身没有长度，使用fill也添加不了元素

/* arr.filter(callback, thisArg?)，创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 */
var arr = [1, 2, 3, 4, 5];
var obj = {
	value: 2
};
arr.filter(function(value, index, array) {
	return value > this.value;
}, obj); // [3, 4, 5]

/* arr.find(callback, thisArg?)，返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。 */
var arr = [1, 2, 3, 4];
arr.find((value, index, array) => value > 2); // 3

/* arr.findIndex(callback, thisArg?)，返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1。 */
var arr = [1, 2, 3, 4];
arr.findIndex((value, index, array) => value > 2); // 2

/* arr.flat(depth)，按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回，降维操作。 */
var arr = [1, [2, 3], [4,[5, [6]]]];
arr.flat();  // [1, 2, 3, 4, [5, [6]]];
arr.flat(1); // [1, 2, 3, 4, [5, [6]]];
arr.flat(2); // [1, 2, 3, 4, 5, [6]];
arr.flat(3); // [1, 2, 3, 4, 5, 6];
arr.flat(Infinity); // [1, 2, 3, 4, 5, 6]; 传入Infinity可以将任意维数的数组降维成一维数组

/* arr.flatMap(callback, thisArg?)，使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。 */
var arr = ["今天天气不错", "", "早上好"]
arr.map(s => s.split("")) // [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap(s => s.split('')); // ["今", "天", "天", "气", "不", "错", "早", "上", "好"]
var arr1 = [1, 2, 3, 4];
arr1.flatMap(x => [x * 2]); // 等价于
arr1.reduce((acc, x) => acc.concat([x * 2]), []); // [2, 4, 6, 8]

/* arr.forEach(callback, thisArg)，对数组的每个元素执行一次提供的函数，forEach没有办法中止或者跳出循环，除了抛出一个异常。 */
var arr = [1, 2, 3, 4, 5];

function test(arr) {
	arr.forEach(val => {
		console.log(val);
		/*
			无法通过return跳出forEach的循环
			1
			2
			3
			4
			5
		*/
		if(val > 2) {
			return true;
		}
	});
	return false;
}
console.log(test(arr)); // false

/* arr.includes(val, fromIndex?)，判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。fromIndex开始的索引处，该方法无法检测对象等引用类型数据，除非能保证数组中的对象和includes传入的对象都是通过变量形式传入的 */
var obj = { a: 1 };
var arr = [1, 2, obj, { b: 2 } ];
console.log(arr.includes(1)); // true
console.log(arr.includes(3)); // false
console.log(arr.includes(obj)); // true
console.log(arr.includes({ b: 2 })); // false

/* arr.indexOf(val, fromIndex)，返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。 */
var arr = [1, 2, 3];
arr.indexOf(2); // 1
arr.indexOf(-1); // -1

/* arr.join(separator)，将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。 */
var arr = [1, 3, 1, 4, 5, 2, 0];
arr.join('');// 1314520

/* arr.keys()，返回一个包含数组中每个索引键的Array Iterator对象。 */
var arr = [1, 2];
var iterator = arr.keys();
for(let key of iterator) {
	console.log(key); // 0 1
}

/* arr.lastIndexOf(val, fromIndex?)，返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。 */
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
console.log(animals.lastIndexOf('Dodo')); // 3
console.log(animals.lastIndexOf('Tiger')); // 1

/* arr.map(callback, thisArg?)，创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。 */
var arr = [2, 4, 6, 8];
arr.map(x => x >> 1); // [1, 2, 3, 4]

/* arr.pop()，从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。 该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。在一个空数组上调用 pop()，它返回  undefined。*/
var arr = [1, 2, 3];
arr.pop(); // 3 , arr = [1, 2]
arr.length = 0; // arr = []
arr.pop(); // undefined
// 使用一个自定义的类数组通过apply或者call也可以使用pop方法
var obj = {
	0: 5,
	1: 8,
	2: 10,
	3: 11,
	length: 4
};
Array.prototype.pop.call(obj); // 11, obj = { 0: 5, 1: 8, 2: 10, length: 3 }
obj.length = 0; // obj = { 0: 5, 1: 8, 2: 10, length: 0 }
Array.prototype.pop.call(obj); // undefined

/* arr.push(el1, el2, el3 ...)，将一个或多个元素添加到数组的末尾，并返回该数组的新长度。 */
var arr = [];
arr.push(1, 2, 3, 4); // 4, arr = [1, 2, 3, 4]
var obj = { length: 0 }
Array.prototype.push.call(obj, 1, 2, 3, 4); // 4, obj = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }

/* arr.reduce(callback, initVal)，对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。 */
/* 如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。 */
/* reduceRight，从右到左进行reduce操作 */
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.reduce((accumulator, value, index, array) => accumulator += value, 0); // 55，累加
arr.reduce((accumulator, value, index, array) => accumulator += value); // 55，累加
arr.reduce((accumulator, value, index, array) => accumulator *= value, 1); // 3628800，累乘
arr.reduce((accumulator, value, index, array) => accumulator -= value); // -53，累减
arr.reduceRight((accumulator, value, index, array) => accumulator -= value); // -35，反向累减

/* arr.reverse()，将数组中元素的位置颠倒，并返回该数组。该方法会改变原数组。 */
var arr = [ 1, 2, 3, 4 ];
arr.reverse(); // [4, 3, 2, 1]

/* arr.shift()，从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。 */
/* arr.unshift(el1, el2, el3, ...)，将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。 */
var unshift = (thisArg, ...args) => Array.prototype.unshift.call(thisArg, ...args); // 提取公共的unshift方法给类数组对象使用
var shift = (thisArg, ...args) => Array.prototype.shift.call(thisArg, ...args); // 提取公共的shift方法给类数组对象使用
var obj = { length: 0 };
unshift(obj, 1, 2, 3, 4, 5, 6); // 6, obj = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, length: 6}
shift(obj); // 1, obj = {0: 2, 1: 3, 2: 4, 3: 5, 4: 6, length: 5}

/* arr.slice(begin?, end?)， 返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。*/
var arr = [1, 2, 3, 4, 5, 6];
arr.slice(-1, -3); // []
arr.slice(-3, -1); // [4, 5]

/* arr.some(callback, thisArg?)，测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。 */
var arr = [1, 2, 3, 4];
arr.some((value, index, array) => {
	console.log(value); // 1 2，找到了满足条件的就会退出循环
	return value > 1;
});

/* arr.sort(callback?)，用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的 */
var arr = [{
	a:1,
	b:22
}, {
	a:20,
	b:31
}, {
	a:14,
	b:15
}];
arr.sort((first, second) => {
	return first.a - second.a;
}); // [{a:1,b:22}, {a:14,b:15}, {a:20,b:31}]
arr.sort((first, second) => {
	return first.b - second.b;
}); // [{a:14,b:15},{a:1,b:22},{a:20,b:31}]

/* arr.splice(start[, deleteCount[, item1[, item2[, ...]]]])，通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。*/
var arr = [1, 2, 3, 4, 5];
// 插入元素
arr.splice(1, 0, 6, 7); // return [], arr = [1, 6, 7, 2, 3, 4, 5]
// 删除元素
arr.splice(1, 2); // return [6, 7], arr = [1, 2, 3, 4, 5]
// 删除起点后的所有元素
arr.splice(2); // return [3, 4, 5], arr = [1, 2, 3]
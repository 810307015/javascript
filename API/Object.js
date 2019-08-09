/*Object自身的方法*/

/* assign(target, origin1, origin2, ...) 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。 */
var obj = Object.assign({}, { a: 1, b:2 }, { c: 3 });

/* create(origin), 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__，如果是null,就会创建一个没有原型链的空对象*/
var nullObj = Object.create(null);

/* defineProperty(obj, prop, descriptor)，直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。在前端框架中可以用来实现数据的双向绑定 */
/* 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。 */
Object.defineProperty(obj, 'd', {
	/* 数据描述符 */
	configurable: true, // 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。
	enumerable: true, // 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
	
	/* 存取描述符, 属性1，只能有属性1和属性2其中一个 */
	value: 4, // 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
	writable: true, // 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
	
	/* 存取描述符, 属性2，只能有属性1和属性2其中一个 */
	get() { // 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。
		return this.value
	},
	set(newVal) { // 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
		this.value = newVal;
	}
});

/* defineProperties(obj, props)，与上面类似 */
Object.defineProperties(obj, {
	e: {
		configurable: true,
		enumerable: true,
		value: 5
	},
	f: {
		get() {
			return this.value;
		},
		set(newVal) {
			this.value = newVal;
		}
	}
});

/* entries(obj)，返回一个给定对象自身可枚举属性的[key, value]键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）*/
var obj1 = { a: 1, b:2, c:3 };
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
  /*
		a: 1
		b: 2
		c: 3
  */
}
/* fromEntries([[key, value]])把键值对列表转换为一个对象，可以转换Map和一个内长度为2的2位数组，将其变成一个对象 */

/* freeze(obj)，方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。这个方法返回传递的对象，而不是创建一个被冻结的副本。 */
Object.freeze(obj);

/* getOwnPropertyDescriptor(obj, prop), 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）*/
Object.getOwnPropertyDescriptor(obj, 'd');

/* getOwnPropertyNames(obj)，返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。 */
Object.getOwnPropertyNames(obj);

/* getOwnPropertySymbols(obj), 返回一个给定对象自身的所有 Symbol 属性的数组。 */
var obj2 = {
	[Symbol('H')]: 1
};
Object.getOwnPropertySymbols(obj2); // [Symbol(H)]

/* getPrototypeOf(obj)，返回指定对象的原型（内部[[Prototype]]属性的值）。如果没有继承属性，则返回 null*/
var nullObj = Object.create(null)
Object.getPrototypeOf(nullObj); // null

/* is(v1, v2)，判断两个值是否是相同的值。与===有点不同的是，=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，is不会。===判定 Number.NaN 不等于 NaN，is判定为相等 */
NaN === NaN; // false
Object.is(NaN, NaN); // true
+0 === -0; // true
Object.is(+0, -0); // false

/* isExtensible(obj)，判断一个对象是否是可扩展的（是否可以在它上面添加新的属性），返回为值布尔值。在 ES5 中，如果参数不是一个对象类型，将抛出一个 TypeError 异常。在 ES6 中， non-object 参数将被视为一个不可扩展的普通对象，因此会返回 false 。 */
Object.isExtensible(1); // TypeError: 1 is not an object (ES5 code)
Object.isExtensible(1); // false                         (ES6 code)

/* isFrozen(obj)，判断一个对象是否被冻结 */
/* isSealed(obj)，判断一个对象是否被密封 */
/* seal(obj)，封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。 */
const object1 = {
  property1: 42
};

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1);
// output: 33
delete object1.property1; // cannot delete when sealed
console.log(object1.property1);
// output: 33
object1.a = 2;
console.log(object1.a); // undefined

/* keys(obj)，返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。如果对象的键-值都不可枚举，那么将返回由键组成的数组。在ES5里，如果此方法的参数不是对象（而是一个原始值），那么它会抛出 TypeError。在ES2015中，非对象的参数将被强制转换为一个对象。 */
Object.keys("foo"); // TypeError: "foo" is not an object (ES5 code)
Object.keys("foo"); // ["0", "1", "2"]                   (ES2015 code)

/* preventExtensions(obj)，让一个对象变的不可扩展，也就是永远不能再添加新的属性。 */
/* setPrototypeOf(target, prototype)，设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或 null。不推荐使用，可以使用create替代 */
/* values(obj)，返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。 */

/* 原型链上的方法，也就是Object对象实例化之后可以调用的方法 */

/* obj.propertyIsEnumerable(prop)，判断一个对象上的某个属性是不是可枚举的属性 */
/* obj.hasOwnProperty(prop)，判断该属性是不是这个对象本身拥有的，而不是从原型链上继承过来的 */
/* obj.isPrototypeOf(prototype)，判断一个对象的原型是不是属于某个prototype */
/* toLocaleString, toString, valueOf 表示该对象的字符串表示和原始值 */

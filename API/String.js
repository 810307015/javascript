/* String本身的方法 */

/* 静态 String.fromCharCode() 方法返回由指定的UTF-16代码单元序列创建的字符串。 */
/* 参数： 一系列UTF-16代码单元的数字。 范围介于0到65535（0xFFFF）之间。 大于0xFFFF的数字将被截断。 不进行有效性检查。 */
/* 返回值: 一个长度为N的字符串，由N个指定的UTF-16代码单元组成. */
console.log(String.fromCharCode(189, 43, 190, 61)); // ½+¾=

/* String.fromCodePoint() 静态方法返回使用指定的代码点序列创建的字符串。 */
/* 参数： 一串 Unicode 编码位置，即“代码点”。 */
/* 返回值： 使用指定的 Unicode 编码位置创建的字符串。 */
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2F804)); // ☃★♲你

/* String.raw() 是一个模板字符串的标签函数，用来获取一个模板字符串的原始字符串的，用法有两种
	String.raw(callSite, ...substitutions) 
	String.raw`templateString`
 */
String.raw({ raw: ['a', 'b', 'cd'] }, 1, 2, 3+5); // "a1b2cd"
String.raw({ raw: ['a', 'b', 'cd', 'e'] }, 1, 2, 3+5); // "a1b2cd8e"
String.raw`ab${5+6}c${5}`; // "ab11c5"


/* String原型上的方法 */
/*
	charAt(index)，从一个字符串中返回指定位置的字符。
	charCodeAt(index)，返回给定索引处（String中index索引处）字符的 UTF-16 代码单元值的码点(小于65536)；如果在索引处没找到元素则返回 NaN。
	codePointAt(index)，返回在字符串中的给定索引处的32 位的 UTF-16 字符的码点(可以大于65536)，如果在索引处没找到元素则返回 undefined 。
*/
var str = '中国🐮🍺吉';
str.charAt(0); // 中
str.charCodeAt(0); // 20013
str.codePointAt(0); // 20013
str.charAt(1); // 国
str.charCodeAt(1); // 22269
str.codePointAt(1); // 22269
str.charAt(2); // 🐮
str.charCodeAt(2); // 55357
str.codePointAt(2); // 55357
str.charAt(3); // 🍺
str.charCodeAt(3); // 56366
str.codePointAt(3); // 56366
str.charAt(4); // 吉
str.charCodeAt(4); // 55356，超出范围的时候，只会显示前面两个字节或者后面两个字节的码点
str.codePointAt(4); // 127866

/* concat(s1, s2, s3, ...)，将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 */
var str = '中国';
str.concat('🐮', '🍺'); // 中国🐮🍺

/*
	字符串匹配
	startsWith(searchString, position?)，判断当前字符串在position位置（默认为0）是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
	endsWith(searchString, length?)，判断当前字符串在length - 1位置（默认为字符串str.length）是否以另外一个给定的子字符串结尾，并根据判断结果返回 true 或 false。
	includes(searchString, position?)，判断从position位置(默认为0)起，一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
	indexOf(searchValue, fromIndex?)，判断从fromIndex位置(默认为0)起向后查找该字符串对象第一次出现指定值的索引值，直到末尾还没有找到就会返回-1。
	lastIndexOf(searchValue, fromIndex?)，判断从fromIndex位置(默认为length-1)起向前查找该字符串对象最后一次出现指定值的索引值，直到开头还没有找到就会返回-1。
*/
var str = 'This is a pen and that is a apple';
str.startsWith('This'); // true
str.startsWith('this'); // false
str.endsWith('apple'); // true
str.endsWith('apple', 15); // false
str.includes('pen'); // true
str.includes('pen', 15); // false
str.indexOf('is'); // 2
str.lastIndexOf('is'); // 23

/*
  字符串裁剪
  slice(beginIndex, endIndex?) 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。如果值为负数，会被当做 strLength + index 看待，这里的strLength 是字符串的长度
  split(separator?, limit?) 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。 
  substring(indexStart, indexEnd?) 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。下标如果任一参数小于 0 或为 NaN，则被当作 0。如果任一参数大于 stringName.length，则被当作 stringName.length。
  trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）。
  trimRight() 方法从一个字符串的右端移除空白字符。
  trimLeft() 方法从一个字符串的左端移除空白字符。
*/
var str = ' Hello, world ';
str.slice(-5, -1); // 'orld'
str.split(','); // [" Hello", " world "]
str.substring(-5, 2); // ' H'
str.trim(); // 'Hello, world'

/*
	字符串填充、替换
	padStart(length, padStr?) 方法用另一个字符串填充当前字符串(重复，如果需要的话)，以便产生的字符串达到给定的长度。填充从当前字符串的开始(左侧)应用的。length小于字符串本身就会返回该字符串本身
	padEnd(length, padStr?)  方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。
	repeat(count) 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。
	replace(regexp|substr, newSubStr|function) 方法返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。
	toLocaleLowerCase()方法根据任何特定于语言环境的案例映射，返回调用字符串值转换为小写的值。
	toLocaleUpperCase() 使用本地化（locale-specific）的大小写映射规则将输入的字符串转化成大写形式并返回结果字符串。
	toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。
	toUpperCase() 将调用该方法的字符串值转换为大写形式，并返回。
	search(regexp) 方法执行正则表达式和 String 对象之间的一个搜索匹配。如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。
	normalize() 方法会按照指定的一种 Unicode 正规形式将当前字符串正规化.
	match(regexp) 方法检索返回一个字符串匹配正则表达式的的结果。如果传入一个非正则表达式对象，则会隐式地使用 new RegExp(obj) 将其转换为一个 RegExp 。如果使用g标志，则将返回与完整正则表达式匹配的所有结果（Array），但不会返回捕获组，或者未匹配 null。如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。 在这种情况下，返回的项目将具有如下所述的其他属性，或者未匹配 null。
	matchAll(regexp) 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。
*/
var hour = '1';
var mintue = '1';
var second = '1';
var time = `${hour.padStart(2, 0)}:${mintue.padStart(2, 0)}:${second.padStart(2, 0)}`; // "01:01:01"
var str = '0';
var repeatStr = str.repeat(8); // "00000000"
var s = 'Hello World';
s.replace('World', (match) => {
	return match.toUpperCase();
}); // "Hello WORLD"
s.match('l'); // ["l", index: 2, input: "Hello World", groups: undefined]
var a = s.matchAll('l');
a.next(); // { done: false value: ["l", index: 2, input: "Hello World", groups: undefined] }
a.next(); // { done: false value: ["l", index: 3, input: "Hello World", groups: undefined] }
a.next(); // { done: false value: ["l", index: 9, input: "Hello World", groups: undefined] }
a.next(); // { done: true value: undefined }
// 栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为栈顶。
// 由于栈具有后入先出的特点，所以任何不在栈顶的元素都无法访问。为了得到栈底的元素，必须先拿掉上面的元素。
// 对栈的两种主要操作是将一个元素压入栈和将一个元素弹出栈。入栈使用push() 方法，出栈使用pop() 方法。
// 另一个常用的操作是预览栈顶的元素。pop() 方法虽然可以访问栈顶的元素，但是调用该方法后，栈顶元素也从栈中被永久性地删除了。peek() 方法则只返回栈顶元素，而不删除它。
// clear() 方法清除栈内所有元素，length 属性记录栈内元素的个数。
// js数组本身提供了push和pop方法，所以可以直接使用数组来模拟栈，但是要杜绝以下标赋值的方式去给栈赋值。

// 拓展栈需要的功能
Array.prototype.peek = function () {
	return this[this.length - 1];
}

Array.prototype.clear = function () {
	this.length = 0;
}

// 使用栈来解决问题
// 1. 数制间的相互转换,将10进制的数转换成任何进制
// 传入一个正数，期望的进制
let tenBase = function (num, base) {
	let s = [];
	do {
		s.push(num % base);
		num = Math.floor(num /= base);
	} while (num > 0);
	let converted = "";
	while (s.length > 0) {
		converted += s.pop();
	}
	return converted;
}

console.log(tenBase(32.2, 2));

// 回文
let isPalindrome = function (str) {
	let originStr = str;
	let s = [];
	while (str.length > 0) {
		s.push(str.charAt(0));
		str = str.slice(1);
	}
	let newStr = "";
	while (s.length > 0) {
		newStr += s.pop();
	}
	if (newStr === originStr) {
		return true;
	} else {
		return false;
	}
}

console.log(isPalindrome('HellolleH')); // true
console.log(isPalindrome('Hello')); // false

// 使得一段文字的每一个部分都反序，如I Like You变成I ekiL uoY
// let textPush = function (text) {
// 	let stack = [];
// 	for (let i = 0; i < text.length; i++) {
// 		stack.push(text[i]);
// 	}
// 	return stack;
// }

let textPop = function (stack) {
	let text = "";
	while(stack.length > 0) {
		text += stack.pop();
	}
	return text;
}

let reverseText = function (str) {
	let result = "";
	let stack = [];
	for (let i = 0; i < str.length; i++) {
			if (str[i] !== " ") {
				stack.push(str[i]);
			} else {
				result += textPop(stack) + ' ';
				stack = [];
			}
	}
	if(stack.length > 0) {
		result += textPop(stack);
	}
	return result;
}

console.log(reverseText('Hello World!')); // olleH !dlroW
console.log(reverseText('你好 世界')); // 好你 界世

// 判断括号表达式,()(),(())组成的括号表达式是合法的，判断一个括号表达式是否合法。
let isRealBracket = function (str) {
	if (str.length <= 1 || str.length % 2 !== 0) {
		return false;
	}
	let stack = [];
	for(let i = 0; i < str.length; i++) {
		if (str[i] === '(') {
			stack.push('(');
		} else if (str[i] === ')') {
			if(stack.peek() === '(') {
				stack.pop();
			}
		} else {
			return false;
		}
	}
	if (stack.length === 0) {
		return true;
	} else {
		return false;
	}
}

console.log(isRealBracket('()()')); // true
console.log(isRealBracket('((())(()))')); // true
console.log(isRealBracket(')((())(()))(')); // false

// 现实生活中栈的一个例子是佩兹糖果盒。想象一下你有一盒佩兹糖果，里面塞满了红色、黄色和白色的糖果，但是你不喜欢黄色的糖果。使用栈（有可能用到多个栈）写一段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移出。
// 以a,b,c代替红色、黄色和白色。
// 最简单的方法是使用filter就可以实现
let candy = 'aaabbccaabacbcaa';
let result = candy.split('').filter(c => c !== 'b').join('');
console.log(result); // aaaccaaaccaa

// 也可以用栈来做
let removeYellow = function (str, color) {
	let arr = str.split('').reverse();
	let stack = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== color) {
			stack.push(arr[i]);
		}
	}
	return textPop(stack);
}

console.log(removeYellow('aaabbccaabacbcaa', 'a')); // bbccbcbc
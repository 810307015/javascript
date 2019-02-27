/* + */
// 取时间
console.log(+new Date()); // 1538118056312

/* () */
// 强制运算
var str = ("Hello World", 1000);
console.log(str); // 1000

/* {} */
// 是对象还是单值表达式,js解释器表现为语句优先，表达式在语法分析的后面，所以在没有括号强制执行的时候是一个赋值语句，在有括号强制执行的时候为一个对象。
var code = "if(true) {a:1}";
console.log(eval(code)); // 1, 此时是一个赋值表达式
var _code = "if(true) ({a:1})";
console.log(eval(_code)); // {a: 1}, 此时是一个对象

/* , */
// 既是分隔符，又是运算符
var arr = [1, 2, (3, 4, 5), 6];
console.log(arr); // [ 1, 2, 5, 6 ]

/* [] */
// 方括号既可以用于声明数组的直接量，又可以是存取数组下标的运算符,就是将第一个[]以及它的值当做了一个数组的立即表达式的字面量。相当于arr = [1], _arr = [arr[1]]。
var _arr = [[1][1]];
console.log(_arr); // [undefined]
var __arr = [[1,2,3,4,5,6][3,4]];
console.log(__arr); // [5]
console.log(arr[1,2,3]); // 6,在[]里面的逗号如果是作为下标也会先执行逗号表达式
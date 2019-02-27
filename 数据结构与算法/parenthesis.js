/* 括号表达式 */
/* ()()为标准的括号表达式， (())也为标准的括号表达式，求一个由左右括号组成的字符串是不是一个标准的括号表达式 */

var isStandard = function (str) {
  // 标准的括号表达式肯定是成对出现了，只有长度为奇数肯定不是标准的括号表达式
  if (str.length % 2 !== 0) {
    return false;
  }

  var stack = [];
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === '(') {
      stack.push(str.charAt(i));
    } else {
      if (stack[stack.length-1] === '(') {
        stack.pop();
      } else {
        stack.push(str.charAt(i));
      }
    }
  }
  if (stack.length > 0) {
    return false;
  } else {
    return true;
  }
}

var str = "";
for (var i = 0; i < 20; i++) {
  str += (Math.random()>0.5) ? '(' : ')';
}
console.log(str);
console.log(isStandard(str));
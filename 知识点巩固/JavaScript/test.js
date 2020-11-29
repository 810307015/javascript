function formatOne(str) {
  let newStr = str;
  for(let len = newStr.length, i = len - 3; i >= 0; i-= 3) {
    newStr = newStr.slice(0, i) + ',' + newStr.slice(i);
  }
  if(newStr.charAt(0) === ',') {
    newStr = newStr.slice(1);
  }
  return newStr;
}

function reverseStr(str) {
  return str.split('').reverse().join('');
}

function formatOne(str) {
  let newStr = reverseStr(str);
  let hasAddSymbol = 0; // 当前已经添加了几个逗号
  newStr.replace(/[0-9]{3}/g, function(val, index) {
    const i = index + hasAddSymbol;
    newStr = newStr.slice(0, i) + newStr.slice(i, i + 3) + ',' + newStr.slice(i + 3);
    hasAddSymbol++;
  })
  return reverseStr(newStr);
}

function format(number) {
  let [ interger, decimal ] = number.toString().split('.');
  
  return formatOne(interger) + '.' + formatOne(decimal);
}

// console.log(format('23456789.12'))

var coder = {
  name: "jsCoder",
  skill: ["css3", "html5", "es6", "react", "angular", "vue"],
  say: function() {
    for(let i = 0,len = this.skill.length; i < len; i++) {
      setTimeout(() => {
        console.log('No.' + i + this.name);
        console.log(this.skill[i]);
        console.log('------------')
      }, 1000)
    }
  }
}

// coder.say();


process.nextTick(() => {
  console.log('nextTick');
})
Promise.resolve().then(() => {
  console.log('promise1')
}).then(() => {
  console.log('promise2');
})
setImmediate(() => {
  console.log('setImmediate');
})
console.log('end');
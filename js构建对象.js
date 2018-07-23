// 该this指向一个People的实例
var People = (function() {
	// 由于一个闭包，name就变成了私有属性，这就相当于一个构造函数
    function People(name) {
        this.name = name;
    }
    People.prototype.getName = function () {
        return this.name;
    };
    People.prototype.getThis = function() {
    	return this;
    }
    return People;
}());
var people = new People('jack');
console.log(people.getThis() === people);

// class People { 
//     constructor(name) { 
//         this.name = name;
//     }

//     getName() { 
//         return this.name;
//     }
// }

// let people = new People('jack');

// 一个js的单例模式
function Singal(fn) {
	let result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	}
}

let getSingal = Singal(function() {
	return {a: 1, b: 2};
})

var s1 = getSingal();
var s2 = getSingal();

console.log(s1);
console.log(s2);
console.log(s1 === s2);

var obj1 = {a: "1", b: "2"};
var obj2 = {a: "1", b: "2"};
console.log(obj1 === obj2);
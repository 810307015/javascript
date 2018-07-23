function Book(){}

// js的new就是将更改对象的原型
Book.prototype.print = function() { console.log(111) }
Book.print = function() { console.log(222) }

// 相当于book.prototype = Book.prototype
var book = new Book();

book.print();

let People = function (name) {
	this.name = name;
}

People.prototype.getThis = function() {
	return this;
}

let people = new People('Jack');
console.log(people.getThis() === people);
console.log(people.name);

let p = People('Tom');
console.log(p.prototype);
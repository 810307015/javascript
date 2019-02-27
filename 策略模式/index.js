// 策略模式，定义一系列的算法，将他们封装起来，并且使得他们可以相互替换。将不变的部分和变化的部分隔开是每个设计模式的主题，策略模式的目的就是将算法的使用和实现分离开来。
// 一个策略模式的程序至少需要两个部分，一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。
// 通过策略模式可以消除原本大量的分支语句。
// 一个简单的例子，根据员工的绩效成绩来发工资。

/*
使用策略类的几个步骤
1. 先定义一系列的算法，把它们封装起来，使得它们可以互相替换。这个相互替换在静态语言里一般通过继承自同一个父类来实现，通过向下转型实现。在js中任何对象都不用转型来替换，所以不用考虑这个问题。一般就是将算法封装在对应的策略类中。
2. 在需要使用策略模式的客户对象中，添加一个策略类对象的属性，然后将其相关的方法委托给策略类来进行。这样就可以灵活的添加新算法，使得客户对象不用做任何修改。
*/

// 策略类
// 绩效为S
let PerformanceS = function () {}
PerformanceS.prototype.calculate = function (salary) {
	return salary * 4;
}

// 绩效为A
let PerformanceA = function () {}
PerformanceA.prototype.calculate = function (salary) {
	return salary * 3;
}

// 绩效为B
let PerformanceB = function () {}
PerformanceB.prototype.calculate = function (salary) {
	return salary * 2;
}

// 定义奖金类
let Bonus = function () {
	this.salary = null; // 原始工资
	this.strategy = null; // 绩效对应的策略对象
}
Bonus.prototype.setSalary = function (salary) {
	this.salary = salary; // 设置原始工资
}
Bonus.prototype.setStrategy = function (strategy) {
	this.strategy = strategy; // 设置绩效对应的策略类对象
}
Bonus.prototype.getBonus = function () {
	return this.strategy.calculate(this.salary); // 把奖金的计算委托给策略类
}

// 测试策略类是否有效
let bonus = new Bonus();
bonus.setSalary(6000);
bonus.setStrategy(new PerformanceS()); // 设置绩效为S
console.log(bonus.getBonus()); // 24000
bonus.setStrategy(new PerformanceA()); // 设置绩效为A
console.log(bonus.getBonus()); // 18000

// 在js中还有更加直接的方法，因为在js中函数也是对象，所以直接将strategy定义为函数就可以，就像这样：
let strategies = {
	'S': function (salary) {
		return salary * 4;
	},
	'A': function (salary) {
		return salary * 3;
	},
	'B': function (salary) {
		return salary * 2;
	},
}
// 在客户对象中，也不需要设置策略类的对象，只需要设置它的绩效类型，在计算时直接调用改对象的方法来实现。如：
Bonus.prototype.getBonusByFunc = function () {
	return strategies[this.strategy](this.salary);
}

let bonus1 = new Bonus();
bonus1.setSalary(6000);
bonus1.setStrategy('S'); // 设置绩效等级S
console.log(bonus1.getBonusByFunc()); // 24000
bonus1.setStrategy('A'); // 设置绩效等级A
console.log(bonus1.getBonusByFunc()); // 18000
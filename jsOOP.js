var People = function () {
  /* 判断是否由 new 关键字生成 */
  if (!(this instanceof arguments.callee)) {
    throw new Error('Please use new');
  }

  var _id; // 一个用于标识唯一对象的标识
  var _name; // 私有变量
  var _age; // 私有变量

  this._constructor = function (name, age, identity) {
    _id = +new Date();
    _name = name;
    _age = age;
    this.identity = identity; //公有变量
  }

  this.setName = function (name) {
    _name = name;
  }

  this.getName = function () {
    return _name;
  }

  this.setAge = function (age) {
    _age = age;
  }

  this.getAge = function () {
    return _age;
  }

  this.getId = function () {
    return _id;
  }

  this.toString = function () {
    console.log(`name = ${_name}, age = ${_age}, identity = ${this.identity}`);
  }

  /* 定义一些钩子函数，在对象的不同阶段使用 */
  this.beforeInit = function () {
    console.log('beforeInit 被调用');
  }

  this.afterInit = function () {
    console.log('afterInit 被调用');
  }

  this.beforeInit(); // 在参数初始化之前调用
  this._constructor.apply(this, arguments); // new的时候初始化变量,构造函数
  this.afterInit(); // 在参数初始化之后调用
}

var people = new People('Jack', 18, 'student');
var people2 = new People('Jane', 16, 'student');
people.toString();
people2.toString();
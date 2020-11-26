function myNew(...args) {
    const constructor = args[0];
    if (typeof constructor !== 'function') {
        throw new Error('please input a valid constructor');
    }
    // 这样产生的空对象是没有原型链的空对象
    const obj = Object.create(constructor.prototype); // new的第一步与第二步的合并，产生一个原型链指向构造器的新对象。
    const _obj = constructor.apply(obj, args.slice(1)); // new的第三步，绑定构造器执行的上下文，并执行构造器方法，以及参数的传递
    return typeof _obj === 'object' ? _obj : obj; // new的第四步，如果没有返回一个对象就直接返回obj
}

function New(fn) {
    return function () {
        const obj = { '__proto__': fn.prototype }; // new的第一步与第二步的合并，产生一个原型链指向构造器的新对象。
        const _obj = fn.apply(obj, arguments); // new的第三步，绑定构造器执行的上下文，并执行构造器方法，以及参数的传递
        return typeof _obj === 'object' ? _obj : obj; // new的第四步，如果没有返回一个对象就直接返回obj
    }
}

function People(name, age) {
    this.name = name;
    this.age = age;
}
const man = myNew(People, 'xiaoming', 18);
console.log(man); // People { name: 'xiaoming', age: 18 }
console.log(man instanceof People); // true

const woman = new People('xiaohong', 16);
console.log(woman); // People { name: 'xiaohong', age: 16 }
console.log(woman instanceof People); // true

const p1 = New(People)('chen', 22);
console.log(p1); // People { name: 'chen', age: 22 }
console.log(p1 instanceof People); // true
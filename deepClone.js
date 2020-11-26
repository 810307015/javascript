// 是否是一个可以遍历的合法对象或数组
function isObject(obj) {
    return ['[object Object]', '[object Array]'].includes(Object.prototype.toString.apply(obj)) && obj != null;
}

// 是否循环引用
/***
 * source 原始对象
 * target 已经拷贝的目标对象
 * sourceData 原始对象中的某个值
 */
function isCyclicRefer(source, target, sourceData) {
    let isCyclicRefer = source === sourceData;
    for(let key in source) {
        if(source[key] === sourceData) {
            isCyclicRefer = true;
        }
    }
    for(let key in target) {
        if(target[key] === sourceData) {
            isCyclicRefer = true;
        }
    }
    return isCyclicRefer;
}

function deepClone(source) {
    if(!isObject(source)) {
        throw new Error('Please input object or array');
    }
    const target = Array.isArray(source) ? [] : {};
    for(let key in source) {
        const value = source[key];
        if(source.hasOwnProperty(key)) {
            if(isObject(value) && !isCyclicRefer(source, target, value)) {
                target[key] = deepClone(value);
            } else {
                target[key] = value;
            }
        }
    }
    return target;
}

const a = {
    c: 2
};
a.b = a;
const c = deepClone(a);
console.log(c); // { c: 2, b: { c: 2, b: ... } }
console.log(c === a); // false

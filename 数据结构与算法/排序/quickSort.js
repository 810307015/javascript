let count = 0;
let loopCount = 0;
let quickSort = function (arr) {
  if (arr.length === 0) {
    return [];
  }
  let base = arr[0];
  let leftArr = [];
  let rightArr = [];
  for (let i = 1;i < arr.length; i++) {
    ++loopCount;
    if (arr[i] < base) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  ++count;
  return quickSort(leftArr).concat(base, quickSort(rightArr));
}

let arr = [];
for (let i = 0;i < 10000000; i++) {
  arr.push(Math.floor(Math.random()*10000000));
}
var now = +new Date();
console.log(quickSort(arr));
console.log('所花费时间: ' + (+new Date() - now) + 'ms');
console.log('递归次数: ' + count + '次');
console.log('循环次数: ' + loopCount + '次');
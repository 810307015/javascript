// 冒泡排序
const bubbleSort = function (arr, flag) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if ((arr[j] > arr[j+1]) === flag) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  let endTime = new Date().getTime();
  console.log('冒泡排序花费时间： ', endTime - startTime);
  return arr;
}
// 选择排序
const selectSort = function (arr, flag) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if ((arr[i] > arr[j]) === flag) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  let endTime = new Date().getTime();
  console.log('选择排序花费时间： ', endTime - startTime);
  return arr;
}
// 插入排序
const insertSort = function(arr, flag) {
  var temp, inner;
  for (var outer = 1; outer <= arr.length - 1; ++outer) {
    temp = arr[outer];
    inner = outer;
    while (inner > 0 && (arr[inner - 1] >= temp) === flag) {
      arr[inner] = arr[inner - 1];
      --inner;
    }
    arr[inner] = temp;
  }
  let endTime = new Date().getTime();
  console.log('插入排序花费时间： ', endTime - startTime);
  return arr;
}

let arr1 = [];
let arr2 = [];
let arr3 = [];
for (let i = 0; i < 100000; i++) {
  let value = parseInt(Math.random()*10000);
  arr1.push(value);
  arr2.push(value);
  arr3.push(value);
}

let startTime = new Date().getTime();
bubbleSort(arr1, true); // 冒泡排序花费时间：  47212
startTime = new Date().getTime();
selectSort(arr2, true); // 选择排序花费时间：  20501
startTime = new Date().getTime();
insertSort(arr3, true); // 插入排序花费时间：  6836
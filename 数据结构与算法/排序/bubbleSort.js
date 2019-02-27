/*
冒泡排序算法，它是最慢的排序算法之一，但也是一种最容易实现的排序算法。
之所以叫冒泡排序是因为使用这种排序算法排序时，数据值会像气泡一样从数组的一端漂浮到另一端。
*/
// flag为true表示升序排列，false为降序排列
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
  return arr;
}

let arr = [100, 90, 80, 70, 60, 50];
bubbleSort(arr, true);
console.log(arr); // [ 50, 60, 70, 80, 90, 100 ]
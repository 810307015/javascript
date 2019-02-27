/*
选择排序从数组的开头开始，将第一个元素和其他元素进行比较。检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法会从第二个位置继续。这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序。
*/
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
  return arr;
}

let arr = [88, 52, 92, 45, 100, 33, 27, 56];
selectSort(arr, false);
console.log(arr); // [ 100, 92, 88, 56, 52, 45, 33, 27 ]
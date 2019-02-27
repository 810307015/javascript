/*
插入排序类似于人类按数字或字母顺序对数据进行排序。
插入排序有两个循环。外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及它后面的那个元素进行比较。如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动，为内循环中的这个元素腾出位置，就像之前介绍的姓氏卡片一样。
*/
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
}

let arr = [1, 2, 82, 21, 13, 65];
insertSort(arr, false);
console.log(arr); // [ 82, 65, 21, 13, 2, 1 ]
// 整体过程
// 1, 2, 82, 21, 13, 65
// 2, 1, 82, 21, 13, 65
// 82, 2, 1, 21, 13, 65
// 82, 21, 2, 1, 13, 65
// 82, 21, 13, 2, 1, 65
// 82, 65, 21, 13, 2, 1
/*
  八皇后问题，是一个古老而著名的问题，是回溯算法的典型案例。该问题是国际西洋棋棋手马克斯·贝瑟尔于1848年提出：在8×8格的国际象棋上摆放八个皇后，使其不能互相攻击，即任意两个皇后都不能处于同一行、同一列或同一斜线上，问有多少种摆法。
*/
/*var arr = [0,0,0,0,0,0,0,0,0,0];
var val = [1,2,3,4,5,6,7,8];

var isCanPlace = function (selected, index, val) {
  var flag = true;
  if (selected.includes(val)) {
    flag = false;
    return flag;
  }
  for (var i = 0;i < selected.length; i++) {
    if ((selected[i] - i-1) === (val - index) || (selected[i]+(i+1)) === (val+index)) {
      //console.log(selected[i], i+1, val, index);
      flag = false;
    }
  }
  return flag;
}
var count = 0;
var loop = function (arr, index, hasSelected) {
  if (index > 8) {
    console.log('arr = ', arr);
    ++count;
    return true;
  } else {
    for (var i = 0; i < val.length; i++) {
      if (isCanPlace(hasSelected, index, val[i])) {
        let arr_copy = [...arr];
        arr_copy[index] = val[i];
        let hasSelected_copy = [...hasSelected];
        hasSelected_copy.push(val[i]);
        loop(arr_copy, index+1, hasSelected_copy);
      } else {
        //console.log('该条路径不通');
      }
    }
  }
}

loop(arr, 1, []);
console.log(count);*/


var arr = [];
var val = [1,2,3,4,5,6,7,8,9,10,11]; // 棋盘的列数

var isCanPlace = function (selected, index, val) {
  var flag = true;
  if (selected.includes(val)) {
    flag = false;
    return flag;
  }
  for (var i = 0;i < selected.length; i++) {
    if ((selected[i] - i) === (val - index) || (selected[i]+i) === (val+index)) {
      flag = false;
    }
  }
  return flag;
}

var count = 0; // 统计符合条件的个数
var max = 9; // 几行
var loop = function (arr, index) {
  if (index >= max) {
    console.log('arr = ', arr);
    ++count;
    return true;
  } else {
    for (var i = 0; i < val.length; i++) {
      if (isCanPlace(arr, index, val[i])) {
        let arr_copy = [...arr];
        arr_copy[index] = val[i];
        loop(arr_copy, index+1);
      } else {
        //console.log('该条路径不通');
      }
    }
  }
}

loop(arr, 0);
console.log(count);

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

// 在 m*n的棋盘上放 m个皇后的方法
var loopForMN = function (m, n) {
  var val = [];
  for (var i = 0;i < n; i++) {
    val.push(i+1);
  }

  var res = [];
  var count = 0;
  var loop = function (res, index) {
    if (index >= m) {
      console.log('res = ', res);
      ++count;
      return true;
    } else {
      for (var i = 0; i < val.length; i++) {
        if (isCanPlace(res, index, val[i])) {
          let res_copy = [...res];
          res_copy[index] = val[i];
          loop(res_copy, index+1);
        } else {
          //console.log('该条路径不通');
        }
      }
    }
  }

  loop(res, 0);
  console.log('一共有' + count + '种情况!');
}

loopForMN(8,8);
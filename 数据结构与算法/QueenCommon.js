var isCanPlace = function (rows, cols, index, col) {
  var flag = true;
  
  return flag;
}

var sum = function (arr) {
  var sum = 0;
  for (var i = 0;i < arr.length; i++) {
    sum += arr[i]; 
  }
  return sum;
}


// 在 m*n的棋盘上放x个皇后
var commonQueen = function (m, n, x) {
  var rows = []; // 记录每一个棋子的行数
  var cols = []; // 记录每一个棋子的列数

  var rows_val = []; // 记录棋盘行上可以存放的取值范围
  var cols_val = []; // 记录棋盘列上可以存放的取值范围

  // 初始化行列的取值范围
  for (var i = 0;i < m; i++) {
    rows_val.push(i+1);
  }
  for (var j = 0;j < n; j++) {
    cols_val.push(j+1);
  }

  var row = []; // 每一次可能时的情况
  var sums = []; // 每一种情况的乘积
  // 排列组合，在 m行上放 x个棋子的结果
  var getRows = function (index, row) {
     if (index >= x) {
        //console.log(row);
        if (!sums.includes(sum(row))) { // 过滤掉重复的结果
          sums.push(sum(row));
          rows.push(row);
        }
        
        return true; 
     } else {
       for (var i = 0;i < m; i++) {
          if (!row.includes(i+1)) {
            var row_copy = row.concat([i+1]);
            getRows(index+1, row_copy);
          } else {

          }
       }
     }
  }
  getRows(0, row);
  
  console.log('rows = ', rows);


  var col = [];
  var getCols = function (index, col) {

  }
}

commonQueen(12,8,8);
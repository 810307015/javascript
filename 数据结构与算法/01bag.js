/* 01背包问题
  一个容量为w的背包，在有k个重量为m(k),价值为v(k)的物品时，如何能够使背包装得物品价值最大化？
  经典的公式为B(k, w)。B表示在背包容积还剩w时，前k个物品能组成的最大价值。
            B(k-1, w) 当第K件太重时，排除该物品
          /   
  B(k, w)         B(k-1, w-m(k)) + v(k) 放进来
          \     /
            max
                \
                  B(k-1, w) 不放进来

  解决方法有两种，一种使用递归来解决， 一种使用二维数组。
*/
var W = 20; // 背包的总容量
var goods = [
  {
    w: 0,
    v: 0
  },{
    w: 1,
    v: 3
  },{
    w: 3,
    v: 5
  },{
    w: 5,
    v: 8
  },{
    w: 7,
    v: 10
  },{
    w: 9,
    v: 12
  },
]; // 物品的对象数组

var i = 0;
// 使用递归来实现求背包能装下的最大价值
var getMaxValue = function (k, w) {
  ++i;
  if (k === 0) {
    return 0;
  }
  if (goods[k].w > w) {
    return getMaxValue(k-1, w);
  } else {
    return (getMaxValue(k-1, w-goods[k].w) + goods[k].v) > getMaxValue(k-1, w) ? (getMaxValue(k-1, w-goods[k].w) + goods[k].v) : getMaxValue(k-1, w);
  }
}


console.log(getMaxValue(goods.length - 1, W)); // 30
console.log(i); // 260,递归了260次


// 使用二维数组的循环来实现求背包能装下的最大价值
var val = [];
for (var i =0;i < goods.length; i++) {
  val[i] = [];
}// 定义一个空的二维数组,每一列代表背包的剩余容量，每一行表示一个物品，每一个值表示在前m个物品时，容量为n时的最大价值。

var j = 0;
var getMaxValue2 = function () {
  for (var m = 0; m < goods.length; m++) {
    for (var n = 0; n <= W; n++) {
      if (m === 0 || n === 0) {
        val[m][n] = 0;
      } else {
        if (goods[m].w > n) {
          val[m][n] = val[m-1][n];
        } else {
          val[m][n] = (val[m-1][n-goods[m].w] + goods[m].v) > val[m-1][n] ? (val[m-1][n-goods[m].w] + goods[m].v) : val[m-1][n];
        }
      }
      ++j;
    }
  }
}

getMaxValue2();
console.log('组成的二维数组是:')
for (var p = 0; p < val.length; p++) {
  var str = "";
  for (var q = 0; q < val[p].length; q++) {
    if (val[p][q] < 10) {
      str += '0' + val[p][q] + ' ';
    } else {
      str += val[p][q] + ' ';
    }
  }
  console.log(str);
}
console.log(val[goods.length-1][W]); // 30
console.log(j); // 126,循环了126次
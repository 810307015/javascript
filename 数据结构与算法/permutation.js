/*
  列出一组不相同的数的全排列情况
*/
let arr = [1,2,3,4];
let getNewRange = function (arr, num) {
  return arr.filter(function (n) {
    return n != num;
  });
}

let getRes = function (arr, res) {
  console.log(arr, res);
  let _res = res;
  if (res.length === 4) {
    //return console.log(res);
  } else {
    for (let i = 0;i < arr.length; i++) {
      _res.push(arr[i]);
      getRes(getNewRange(arr, arr[i]), _res);
      _res = res;
    }
  }
}

getRes(arr, []);
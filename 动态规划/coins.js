/* 最少硬币找零问题 */
/* 有1, 2, 5的硬币，以最少的个数的硬币来找 */
let coins = [1, 2, 5];
let number = 0;
const result = [];
const Money = 13;

let getResult = function () {
  let max = Math.max.apply(null, coins);
  if (number + max <= Money) {
    number += max;
    result.push(max);
  } else {
    coins = coins.filter(coin => coin !== max);
  }
  if (number !== Money) {
    if (coins.length > 0) {
      return getResult();
    } else {
      return console.log('无法组成需要的数字');
    }
  } else {
    console.log(result);
  }
}

getResult();
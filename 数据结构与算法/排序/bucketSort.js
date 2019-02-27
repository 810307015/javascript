/* 桶排序 */
const bucketSort = function(arr) {
  const max = Math.max.apply(null, arr)
  const res = new Array(max+1).fill(0)
  for (let i = 0;i < arr.length; i++) {
    ++res[arr[i]]
  }
  const _arr = []
  for (let j = 0;j < res.length; j++) {
    if (res[j] > 0) {
      for (let k = 0;k < res[j];k++) {
        _arr.push(j)
      } 
    }
  }
  return _arr;
}

const arr = [55, 23, 12, 15, 44, 36, 10, 8, 38, 34]
console.log(bucketSort(arr))

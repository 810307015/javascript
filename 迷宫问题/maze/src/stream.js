const readline = require('readline');
const Util = require('./myUtil');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 获取迷宫的尺寸
let getSize = function (callback) {
  rl.question('请输入迷宫的尺寸,如3x3就输入3 3,中间用一个空格隔开\n', (answer) => {
    let size = answer.split(' ');
    if (Util.judgeLength(size, 2)) {
      console.log('Incorrect command format.');
      return getSize(callback);
    } else {
      if (Util.judgeInt(size[0]) || Util.judgeInt(size[1])) {
        console.log('Invalid number format.');
        return getSize(callback);
      } else {
        if (Util.judgeHasMinus(size[0]) || Util.judgeHasMinus(size[1])) {
          console.log('Number out of range.');
          return getSize(callback);
        } else {
          // 返回迷宫的尺寸
          return callback(size);
        }
      }
    }
  });
}

// 获取迷宫的连通性,传入迷宫的size
let getConnectedness = function (x, y, callback) {
  rl.question('请输入迷宫的连通性,如果 cell(0,1) 和 cell(0,2) 是连通的，则表示为：0,1 0,2多个连通以分号 ; 隔开。没有任何连通则直接回车\n', (answer) => {
    if (!Util.judgeLength(answer, 0)) {
      rl.close();
      return callback([]);
    }
    let connectednesses = answer.split(';');
    for (let i = 0;i < connectednesses.length; i++) {
      let connectedness = connectednesses[i].split(' ');
      if (Util.judgeLength(connectedness, 2)) {
        console.log('Incorrect command format.');
        return getConnectedness(x, y, callback);
      } else {
        let [size1, size2] = connectedness;
        let [x1, y1] = size1.split(',');
        let [x2, y2] = size2.split(',');
        if (Util.judgeInt(x1) || Util.judgeInt(y1) || Util.judgeInt(x2) || Util.judgeInt(y2)) {
          console.log('Invalid number format.');
          return getConnectedness(x, y, callback);
        } else {
          if (Util.judgeHasMinus(x1)
            || Util.judgeHasMinus(y1)
            || Util.judgeHasMinus(x2)
            || Util.judgeHasMinus(y2)
            || x1 >= x
            || x2 >= x
            || y1 >= y
            || y2 >= y) {
            console.log('Number out of range.');
            return getConnectedness(x, y, callback);
          } else {
            x1 = parseInt(x1);
            y1 = parseInt(y1);
            x2 = parseInt(x2);
            y2 = parseInt(y2);
            if (Math.abs(x1 - x2) + Math.abs(y1 - y2) !== 1) {
              console.log('Maze format error.');
              return getConnectedness(x, y, callback);
            }
          }
        }
      }
    }
    rl.close();
    let result = [];
    for (let i = 0;i < connectednesses.length; i++) {
      connectedness = connectednesses[i].split(' ');
      let [size1, size2] = connectedness;
      let [x1, y1] = size1.split(',');
      let [x2, y2] = size2.split(',');
      connectedness = [[parseInt(x1), parseInt(y1)], [parseInt(x2), parseInt(y2)]];
      result.push(connectedness);
    }
    return callback(result);
  });
}

exports.getSize = getSize;
exports.getConnectedness = getConnectedness;
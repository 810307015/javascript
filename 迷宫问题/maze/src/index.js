const stream = require('./stream');
const Maze = require('./maze');

// 入口方法，获取迷宫对象
let index = function (callback) {
  let maze = new Maze();
  stream.getSize((size) => {
    let [x, y] = size;
    maze.setSize(x, y);
    stream.getConnectedness(x, y, (connectedness) => {
      maze.setConnectedness(connectedness);
      callback(maze);
    });
  });
}

// 根据迷宫对象获取相应的矩阵
let getMatrix = function (maze) {
  let matrix = [];
  // 初始化迷宫矩阵
  for (let i = 0;i < 2*maze.getSize().y + 1;i++) {
    let row = [];
    for (let j = 0;j < 2*maze.getSize().x + 1; j++) {
      if(i % 2 === 1) {
        if (j % 2 === 1) {
          row.push('[R]');
        } else {
          row.push('[W]');
        }
      } else {
        row.push('[W]');
      }
    }
    matrix.push(row);
  }
  // 根据连通性修改迷宫
  for (let i = 0;i < maze.getConnectedness().length; i++) {
    let connectedness = maze.getConnectedness()[i];
    let [ceil_1, ceil_2] = connectedness;
    if (Math.abs(ceil_1[0] - ceil_2[0]) === 1) {
      let x = Math.max(ceil_1[0], ceil_2[0]);
      let y = ceil_1[1];
      matrix[2*x][y*2+1] = '[R]';
    } else {
      let x = ceil_1[0];
      let y = Math.max(ceil_1[1], ceil_2[1]);
      matrix[x*2+1][y*2] = '[R]';
    }
  }
  return matrix;
}

index((maze) => {
  let matrix = getMatrix(maze);
  console.log('最终矩阵为：');
  matrix.forEach(row => {
    let str = "";
    for(let i = 0; i < row.length; i++) {
      str += row[i];
    }
    console.log(str);
  });
});

// 给测试文件使用
exports.getMatrix = getMatrix;
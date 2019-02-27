const assert = require('assert');
const index = require('../src/index');
const Maze = require('../src/maze');

// 判断传入一个迷宫对象后是否返回了期望的矩阵
describe('index', function() {
  describe('getMatrix()', function() {
    it('should return a matrix when the input a valid maze', function() {
      let maze = new Maze();
      maze.setSize(3, 3);
      maze.setConnectedness([]);
      let expected = [ [ '[W]', '[W]', '[W]', '[W]', '[W]', '[W]', '[W]' ],[ '[W]', '[R]', '[W]', '[R]', '[W]', '[R]', '[W]' ],[ '[W]', '[W]', '[W]', '[W]', '[W]', '[W]', '[W]' ],[ '[W]', '[R]', '[W]', '[R]', '[W]', '[R]', '[W]' ],[ '[W]', '[W]', '[W]', '[W]', '[W]', '[W]', '[W]' ], [ '[W]', '[R]', '[W]', '[R]', '[W]', '[R]', '[W]' ],[ '[W]', '[W]', '[W]', '[W]', '[W]', '[W]', '[W]' ] ];
      let total = index.getMatrix(maze);
      let flag = true;
      for (let i = 0;i < expected.length;i++) {
        for (let j = 0;j < expected[i].length; j++) {
          if(expected[i][j] !== total[i][j]) {
            flag = false;
          }
        }
      }
      assert.equal(flag, true);
    });
  });
});
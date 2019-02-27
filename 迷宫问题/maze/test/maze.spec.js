const assert = require('assert');
const Maze = require('../src/maze');

// 测试迷宫对象的set与get方法是否有效，以及构造函数是否有效
describe('Maze', function() {
  describe('constructor()', function() {
    it('should be Maze(0, 0, []) when not params', function() {
      let maze = new Maze();
      assert.equal(maze.x, 0);
      assert.equal(maze.y, 0);
      // 判断类型是否为数组
      assert.equal(Object.prototype.toString.apply(maze.connectedness), '[object Array]');
      // 判断数组是否为空
      assert.equal(maze.connectedness, 0);
    });
  });

  describe('getSize()', function() {
    it('should be x=3 y=3  when Maze(3, 3)', function() {
      let maze = new Maze(3, 3);
      assert.equal(maze.getSize().x, 3);
      assert.equal(maze.getSize().y, 3);
    });
  });

  describe('setSize()', function() {
    it('should be Maze(3, 3, []) when params is 3,3', function() {
      let maze = new Maze();
      maze.setSize(3, 3);
      assert.equal(maze.x, 3);
      assert.equal(maze.y, 3);
    });
  });

  describe('getConnectedness()', function() {
    it('should be 3,3,[[[1,2],[1,1]]] when new Maze(3,3,[[[1,2],[1,1]]])', function() {
      let maze = new Maze(3, 3, [[[1,2],[1,1]]]);
      assert.equal(maze.getConnectedness()[0][0][0], 1);
      assert.equal(maze.getConnectedness()[0][0][1], 2);
      assert.equal(maze.getConnectedness()[0][1][0], 1);
      assert.equal(maze.getConnectedness()[0][1][1], 1);
    });
  });

  describe('setConnectedness()', function() {
    it('should be Maze(3, 3, [[[1,2],[1,1]]]) when params is 3,3,[[[1,2],[1,1]]]', function() {
      let maze = new Maze(3, 3);
      maze.setConnectedness([[[1,2],[1,1]]]);
      assert.equal(maze.getConnectedness()[0][0][0], 1);
      assert.equal(maze.getConnectedness()[0][0][1], 2);
      assert.equal(maze.getConnectedness()[0][1][0], 1);
      assert.equal(maze.getConnectedness()[0][1][1], 1);
    });
  });
});
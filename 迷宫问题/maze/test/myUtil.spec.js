const assert = require('assert');
const Util = require('../src/myUtil');

describe('Unit test for myUtil', function() {
  // 测试judgeLength()方法
  describe('judgeLength()', function() {
    it('should return true when the arr.length is not equal', function() {
      assert.equal(Util.judgeLength([1, 2, 3], 2), true);
    });
    it('should return false when the arr.length is equal', function() {
      assert.equal(Util.judgeLength([1, 2, 3], 3), false);
    });
  });

  // 测试judgeInt()方法
  describe('judgeInt()', function() {
    it('should return true when the value can\'t be transform to Int', function() {
      assert.equal(Util.judgeInt('aaa'), true);
    });
    it('should return false when the value can be transform to Int', function() {
      assert.equal(Util.judgeInt('12'), false);
    });
  });

  // 测试judgeHasMinus()方法
  describe('judgeHasMinus()', function() {
    it('should return true when the value has a "-" in the start ', function() {
      assert.equal(Util.judgeHasMinus('-12'), true);
    });
    it('should return false when the value hasn\'t a "-" in the start', function() {
      assert.equal(Util.judgeHasMinus('12'), false);
    });
  });
});
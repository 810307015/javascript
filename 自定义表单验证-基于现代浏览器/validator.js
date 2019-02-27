/*
  changeInvalidMsg 接受三个参数:
    1. 需要修改验证信息的表单元素
    2. 验证失败时需要显示的错误信息
    3. 需要验证的类型，如required,maxlength等等
*/
var myValidate = {
  email: '^\w+@[a-z]+.com',
  telphone: '13[0-9][0-9]{8}',
}

var validator = {
  // 获取验证类型对应的验证状态
  validateType: {
    'required': 'valueMissing',
    'min': 'rangeUnderflow',
    'max': 'rangeOverflow',
    'minlength': 'tooShort',
    'maxlength': 'tooLong',
    'pattern': 'patternMismatch',
  },
  // 修改不合法时的提示信息
  changeInvalidMsg: function(element, errorMsg, type) {
    var self = this;
    element.addEventListener('change', function (event) {
      if (element.validity[self.validateType[type]]) {
        element.setCustomValidity(errorMsg);
      } else {
        element.setCustomValidity('');
      }
    });
  },
  // 添加对应的表单校验
  addValidate: function (element, type, errorMsg) {
    element.setAttribute('pattern', myValidate[type]);
    // 当传入errorMsg时主动调用修改错误信息的事件
    if (errorMsg) {
      this.changeInvalidMsg(element, errorMsg, 'pattern');
    }
  }
}
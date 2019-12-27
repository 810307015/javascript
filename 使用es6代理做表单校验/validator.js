/*
使用示例
const validators = [
  {
    type: "isRequired",
    propName: "username",
    errDom: err_text[0],
    errMsg: "用户名不能为空"
  },
  {
    type: "password",
    propName: "password",
    errDom: err_text[1]
  }
];

const obj = Validator({
  target: {},
  validators: validators
});

input.onchange = e => obj.target.value; // 每次change就会触发检测
感觉还是应该将数据跟input的change绑定在内部实现比较好，外部只需要使用封装好的表单组件是最简单的，单独的检验器用起来还是麻烦
*/
// 开放自定义校验类型
// type 校验类型 reg校验的正则，如果传入了validator就不用传 validatori自定义校验方法 errMsg校验不通过的提示信息
function defineValidateType(option) {
  const { type, reg, errMsg = "", validator } = option;
  _validator[type] = validator
    ? validator
    : value => {
        return reg.test(value);
      };
  _errMsg[type] = errMsg;
}

// 所有的校验方法
const isRequired = value => value !== "";
const isNumber = value => !isNaN(Number(value));
const isMobilePhone = value => _regs["mobilephone"].test(value);
const isTelphone = value => _regs["telphone"].test(value);
const isPassword = value => _regs["password"].test(value);
const isChinese = value => _regs["chinese"].test(value);

// 校验方法的映射
const _validator = {
  isRequired: isRequired,
  number: isNumber,
  mobilephone: isMobilePhone,
  telphone: isTelphone,
  password: isPassword,
  chinese: isChinese
};

// 校验不通过的报错信息
const _errMsg = {
  isReuired: "不能为空",
  password: "密码为6-18为，字母数字以及非特殊符号组成"
};

// 校验的正则
const _regs = {
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  mobilephone: /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/,
  telphone: /^0\d{2,3}-\d{7,8}$/,
  password: /^[\da-zA-Z!@#$%^&*]{6,18}$/,
  chinese: /^[\u4E00-\u9FA5]+$/
};

// 主入口
function Validator(option) {
  const { target, validators } = option;
  const proxy = new Proxy(target, {
    set: function(obj, prop, value) {
      let validator = validators.find(validator => validator.propName === prop);
      obj.isValid = obj.isValid || {};
      obj[prop] = value;
      if (validator) {
        const { type, propName, errDom, errMsg } = validator;
        if (!_validator[type]) {
          console.error("传入的校验类型错误或校验类型不存在");
          return false;
        }
        const flag = _validator[type](value);
        console.log(flag);
        if (!flag) {
          obj.isValid[propName] = false;
          errDom &&
            (errDom.innerHTML = errMsg || _errMsg[type] || "字段校验不通过");
        } else {
          obj.isValid[propName] = true;
          errDom && (errDom.innerHTML = "");
        }
      }
      return true;
    }
  });
  return proxy;
}

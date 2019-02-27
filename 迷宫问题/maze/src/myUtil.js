// 判断数组或字符串长度是否和期望值不一样
let judgeLength = function (value, len) {
	if (value.length !== len) {
		return true;
	} else {
		return false;
	}
}

// 判断是否不能转换成整数
let judgeInt = function (value) {
	if (Object.is(parseInt(value), NaN)) {
		return true;
	} else {
		return false;
	}
}

// 判断是否有负号
let judgeHasMinus = function (value) {
	value = value + '';
	if (value.charAt(0) === '-') {
		return true;
	} else {
		return false;
	}
}

exports.judgeInt = judgeInt;
exports.judgeLength = judgeLength;
exports.judgeHasMinus = judgeHasMinus;

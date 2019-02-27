// 列表是一组有序的数据。每个列表中的数据项称为元素。在JavaScript 中，列表中的元素可以是任意数据类型。列表中可以保存多少元素并没有事先限定，实际使用时元素的数量受到程序内存的限制。
/*
不包含任何元素的列表称为空列表。列表中包含元素的个数称为列表的length。在内部实现上，用一个变量listSize 保存列表中元素的个数。可以在列表末尾append 一个元素，也可以在一个给定元素后或列表的起始位置insert 一个元素。使用remove 方法从列表中删除元素，使用clear 方法清空列表中所有的元素。
还可以使用toString() 方法显示列表中所有的元素，使用getElement() 方法显示当前元素。列表拥有描述元素位置的属性。列表有前有后（分别对应front 和end）。使用next() 方法可以从当前元素移动到下一个元素，使用prev() 方法可以移动到当前元素的前一个元
素。还可以使用moveTo(n) 方法直接移动到指定位置，这里的n 表示要移动到第n 个位置。currPos 属性表示列表中的当前位置。列表的抽象数据类型并未指明列表的存储结构，在本章的实现中，我们使用一个数组dataStore 来存储元素。

listSize（属性） 列表的元素个数
pos（ 属性） 列表的当前位置
length（ 方法） 返回列表中元素的个数
clear（ 方法） 清空列表中的所有元素
toString（ 方法） 返回列表的字符串形式
getElement（ 方法） 返回当前位置的元素
insert（ 方法） 在现有元素后插入新元素
append（ 方法） 在列表的末尾添加新元素
remove（ 方法） 从列表中删除元素
front（ 方法） 将列表的当前位置设移动到第一个元素
end（ 方法） 将列表的当前位置移动到最后一个元素
prev（方法） 将当前位置后移一位
next（ 方法） 将当前位置前移一位
currPos（ 方法） 返回列表的当前位置
moveTo（方法） 将当前位置移动到指定位置
*/

function List () {
	this.listSize = 0;
	this.pos = 0;
	this.dataSource = []; // 初始化一个空数组来保存列表元素
}

List.prototype.length = function () {
	return this.listSize;
}

List.prototype.clear = function () {
	delete this.dataStore;
	this.dataSource = [];
	this.pos = 0;
	this.listSize = 0;
}

List.prototype.append = function (element) {
	this.dataSource.push(element);
	this.listSize += 1;
}

List.prototype.remove = function (element) {
	this.dataSource = this.dataSource.filter(data => data !== element);
	this.listSize -= 1;
}

List.prototype.find = function (element) {
	for (var i = this.dataSource.length - 1; i >= 0; i--) {
		if (this.dataSource[i] === element) {
			return i;
		}
	}
	return -1;
}

List.prototype.toString = function () {
	return `listSize = ${this.listSize}, pos = ${this.pos}, dataSource = ${this.dataSource}`;
}

List.prototype.getElement = function () {
	return this.dataSource[this.pos];
}

List.prototype.insert = function (element, index) {
	if (index > -1) {
		this.dataSource.splice(index+1, 0, element);
		this.listSize += 1;
		return true;
	}
	return false;
}

List.prototype.front = function () {
	this.pos = 0;
}

List.prototype.end = function () {
	this.pos = this.listSize - 1;
}

List.prototype.prev = function () {
	if (this.pos > 0) {
		--this.pos;
	}
}

List.prototype.next = function () {
	if (this.pos < this.listSize-1) {
		++this.pos;
	}
}

List.prototype.currPos = function () {
	return this.pos;
}

List.prototype.moveTo = function (position) {
	this.pos = position;
}


let list = new List();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
console.log(list.toString());
console.log(list.getElement());
console.log(list.remove(2));
console.log(list.find(2));
console.log(list.length());
list.end();
console.log(list.toString());
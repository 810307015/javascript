// 队列是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出，这点和栈不一样，在栈中，最后入栈的元素反而被优先处理。可以将队列想象成在银行前排队的人群，排在最前面的人第一个办理业务，新来的人只能在后面排队，直到轮到他们为止。
// 队列是一种先进先出（First-In-First-Out，FIFO）的数据结构。队列被用在很多地方，比如提交操作系统执行的一系列进程、打印任务池等，一些仿真系统用队列来模拟银行或杂货店里排队的顾客。
// 队列的两种主要操作是：向队列中插入新元素和删除队列中的元素。插入操作也叫做入队，删除操作也叫做出队。
// 队列的另外一项重要操作是读取队头的元素。这个操作叫做peek()。该操作返回队头元素，但不把它从队列中删除。除了读取队头元素，我们还想知道队列中存储了多少元素，可以使用length 属性满足该需求；要想清空队列中的所有元素，可以使用clear() 方法来实现。
// 构建队列对象
function Queue() {
	this.dataStore = [];
	// 向队尾添加一个元素
	this.enqueue = enqueue;
	// 将队头元素删除
	this.dequeue = dequeue;
	// 读取队头的元素
	this.front = front;
	// 读取队尾的元素
	this.back = back;
	// 显示所有队内元素
	this.toString = toString;
	// 队列是否为空
	this.empty = empty;
	// 队列的长度
	this.queueSize = queueSize;
}

let enqueue = function (element) {
	return this.dataStore.push(element);
}

let dequeue = function () {
	return this.dataStore.shift();
}

let front = function () {
	return this.dataStore[0];
}

let back = function () {
	return this.dataStore[this.dataStore.length - 1];
}

let toString = function () {
	return this.dataStore.join('<');
}

let empty = function () {
	return this.dataStore.length > 0 ? false : true;
}

let queueSize = function () {
	return this.dataStore.length;
}

let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(queue.toString());

// 使用队列来实现基数排序。
/*
队列不仅用于执行现实生活中与排队有关的操作，还可以用于对数据进行排序。计算机刚
刚出现时，程序是通过穿孔卡输入主机的，每张卡包含一条程序语句。这些穿孔卡装在一
个盒子里，经一个机械装置进行排序。我们可以使用一组队列来模拟这一过程。这种排序
技术叫做基数排序，参见 Data Structures with C++（ Prentice Hall）一书。它不是最快的排
序算法，但是它展示了一些有趣的队列使用方法。
对于0~99 的数字，基数排序将数据集扫描两次。第一次按个位上的数字进行排序，第二
次按十位上的数字进行排序
*/
// 以0-99的数字为例

// 一组数字
let arr = [12, 52, 30, 89, 45, 76, 64];
let baseSort = function (arr) {
	// 首先需要0-9一共10个队列
	let queues = [new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue()];
	for (let i = 0; i < arr.length; i++) {
		queues[arr[i]%10].enqueue(arr[i]);
	}
	let temp = [];
	for (let i = 0;i < queues.length; i++) {
		if (!queues[i].empty()) {
			temp = temp.concat(queues[i].dataStore);
		}
	}
	console.log(temp); //第一次入队出队之后为[ 30, 12, 52, 64, 45, 76, 89 ]
	queues = [new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue(), new Queue()];
	for (let i = 0; i < temp.length; i++) {
		queues[parseInt(temp[i]/10)].enqueue(temp[i]);
	}
	t = [];
	for (let i = 0;i < queues.length; i++) {
		if (!queues[i].empty()) {
			t = t.concat(queues[i].dataStore);
		}
	}
	return t; // 第二次入队出队之后为[ 12, 30, 45, 52, 64, 76, 89 ]
}

console.log(baseSort(arr));
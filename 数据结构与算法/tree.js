/*
树是计算机科学中经常用到的一种数据结构。树是一种非线性的数据结构，以分层的方式
存储数据。树被用来存储具有层级关系的数据，比如文件系统中的文件；树还被用来存储
有序列表。本章将研究一种特殊的树：二叉树。选择树而不是那些基本的数据结构，是因
为在二叉树上进行查找非常快（而在链表上查找则不是这样），为二叉树添加或删除元素
也非常快（而对数组执行添加或删除操作则不是这样）。
二叉树是一种特殊的树，它的子节点个数不超过两个。二叉树具有一些特殊的计算性质，
使得在它们之上的一些操作异常高效。
二叉查找树是一种特殊的二叉树，相对较小的值保存在左节点中，较大的值保存在右节点中。
*/
// 建立一个二叉树的节点
let Node = function(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
    this.show = show;
}

let show = function() {
    console.log("data = ", this.data);
}

// 建立一个查找二叉树
let BST = function() {
    this.root = null;
    this.insert = insert;
    this.getMin = getMin;
    this.getMax = getMax;
    this.find = find;
}

let insert = function(data) {
    let node = new Node(data, null, null);
    if (this.root === null) {
        this.root = node;
    } else {
        let current = this.root;
        let parent = null;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                if (current === null) {
                    parent.left = node;
                    break;
                }
            } else {
                current = current.right;
                if (current === null) {
                    parent.right = node;
                    break;
                }
            }
        }
    }
}

// 由于是查找二叉树，所以最小值应该在最下面的左节点上
let getMin = function () {
	let current = this.root;
	while (current.left !== null) {
		current = current.left;
	}
	return current.data;
}

// 由于是查找二叉树，所以最大值应该在最下面的右节点上
let getMax = function () {
	let current = this.root;
	while (current.right !== null) {
		current = current.right;
	}
	return current.data;
}

// 查找某一个数字,由于是查找二叉树，所以它是有大小顺序的，所以只需要跟左右节点来比较进行查找。
let find = function (value) {
	let current = this.root;
	while (current !== null) {
		if (current.data === value) {
			return current;
		} else if (value < current.data) {
			current = current.left;
		} else {
			current = current.right;
		}
	}
	return null;
}

// 中序遍历
let inOrder = function (node) {
	let current = node;
	if (current !== null) {
		inOrder(current.left);
		current.show();
		inOrder(current.right);
	}
}

// 先序遍历
let preOrder = function (node) {
	let current = node;
	if (!(current === null)) {
		current.show();
		preOrder(current.left);
		preOrder(current.right);
	}
}

// 后序遍历
let postOrder = function (node) {
	let current = node;
	if (!(current === null)) {
		postOrder(current.left);
		postOrder(current.right);
		current.show();
	}
}

// 删除节点

// 节点计数，修改node的定义，添加一个count属性。


let bst = new BST();
arr = [45, 25, 86, 94, 33, 50, 40, 18, 67, 75];

for (let i = 0; i < arr.length; i++) {
	let data = parseInt(arr[i]);
	bst.insert(data);
}
console.log("bst = ",bst);
console.log('中序遍历的结果');
inOrder(bst.root);
console.log('先序遍历的结果');
preOrder(bst.root);
console.log('后序遍历的结果');
postOrder(bst.root);
console.log('最小值为: ' + bst.getMin());
console.log('最大值为: ' + bst.getMax());
console.log('查找data为10的节点: ', bst.find(10));
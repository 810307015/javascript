// 迷宫类
class Maze {
	constructor(x, y, connectedness) {
		// 迷宫的尺寸
		this.x = x || 0;
		this.y = y || 0;
		// 迷宫的连通性
		this.connectedness = connectedness || [];
	}
	// size的get和set方法
	setSize (x, y) {
		this.x = parseInt(x) || 0;
		this.y = parseInt(y) || 0;
	}

	getSize () {
		return {
			x: this.x,
			y: this.y
		}
	}

	// 连通性的get和set方法
	setConnectedness (connectedness) {
		this.connectedness = connectedness || [];
	}

	getConnectedness () {
		return this.connectedness;
	}
};

module.exports = Maze;
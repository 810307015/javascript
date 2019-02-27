// 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法。
let Student = function (name, scores) {
	this.name = name;
	this.scores = scores;
	this.avg = 0;
}

Student.prototype.setScores = function (scores) {
	this.scores = scores;
}

Student.prototype.getAvg = function () {
	this.avg = this.scores.reduce((total, currentVal) => {
		return total + currentVal;
	}, 0) / this.scores.length;
	return this.avg;
}

let student = new Student('Jack', [80, 88, 86]);
console.log(student.getAvg()); // 84.66666...
student.setScores([100, 88, 86]);
console.log(student.getAvg()); // 91.33333...


// 将一组单词存储在一个数组中，并按正序和倒序分别显示这些单词。
let words = ['Hello', 'World', 'I\'m', 'Jack'];
console.log(words.join(' ')); // Hello World I'm Jack
let reverseWords = words.map(word => word.split('').reverse().join(''));
console.log(reverseWords.join(' ')); // olleH dlroW m'I kcaJ

// 创建这样一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连在一起，显示成一个单词。
let alphabets = ['H', 'e', 'l', 'l', 'o'];
console.log(alphabets.join('')); // Hello
const http = require('http')

const server = http.createServer((req, res) => {
	let obj = {
		a: 1,
		b: 2
	}
	res.end('doAlert(' + JSON.stringify(obj) + ')')
}).listen(3000)
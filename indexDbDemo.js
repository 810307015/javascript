/**
 * 基于indexDb做一层基本的封装来使用
 */
class CustomDb {
	constructor(option) {
		if(!window.indexedDB) {
			return console.warn('你的浏览器暂时不支持浏览器数据库，请下载最新浏览器后使用');
		}
		this.init(option);
		this.db = {};
	}

	init(option) {
		const { dbName, version, callback } = option;
		const request = window.indexedDB.open(dbName, version);
		request.onsuccess = () => (this.db = request.result) && callback && callback();
		request.onerror = () => console.warn('打开数据库失败');
	}

	createTable(option) {
		const { tableName, keyPath, autoIncrement } = option;
		if(!this.db.objectStoreNames.contains(tableName)) {
			if(autoIncrement) {
				db.createObjectStore(tableName, { autoIncrement: ture });
			} else {
				db.createObjectStore(tableName, { keyPath: keyPath });
			}
		}
	}

	createIndex(option) {
		const { tableName, indexName, keyPath, unique } = option;
		this.db.transaction([tableName], 'readwrite') // 新建一个事务
				.objectStore(tableName) // 拿到IDBObjectStore，也就是拿到对应的表
				.createIndex(indexName, keyPath);			    		
	}

	add(option) {
		const { tableName, value, key, callback } = option;
		const transaction = this.db.transaction([tableName], 'readwrite'); // 创建事务
		const objectStore = transaction.objectStore(tableName); // 获取表对象
		const request = key ? objectStore.add(value, key) : objectStore.add(value);
		request.onsuccess = () => callback && callback('操作成功');										
		request.onerror = () => callback && callback('操作失败');										
	}

	get(option) {
		const { tableName, keyPath, callback } = option;
		const transaction = this.db.transaction([tableName]); // 创建事务
		const objectStore = transaction.objectStore(tableName); // 获取表对象
		const request = objectStore.get(keyPath);
		request.onsuccess = () => callback && callback(request.result);
		request.onerror = () => callback && callback('操作失败');
	}

	getAll(option) {
		const { tableName, callback } = option;
		const objectStore = this.db.transaction([tableName]).objectStore(tableName);
		const result = [];

		// 使用指针对象进行遍历
		objectStore.openCursor().onsuccess = function (event) {
			const cursor = event.target.result;
			if(cursor) {
			  result.push(cursor.value);
			  cursor.continue();
			} else {
			  callback && callback(result);
			}
		};
	}

	getIndex(option) {
		const { tableName, indexName, callback } = option;
		const transaction = this.db.transaction([tableName]); // 创建事务
		const objectStore = transaction.objectStore(tableName); // 获取表对象
		const index = objectStore.index(indexName);
		index.openCursor().onsuccess = (e) => callback && callback(e.target.result);
	}

	update(option) {
		const { tableName, value, key, callback } = option;
		const transaction = this.db.transaction([tableName], 'readwrite'); // 创建事务
		const objectStore = transaction.objectStore(tableName); // 获取表对象
		const request = objectStore.put(value, key);
		request.onsuccess = () => callback && callback(request.result);
	}

	delete(option) {
		const { tableName, keyPath } = option;
		var request = this.db.transaction([tableName], 'readwrite')
											.objectStore(tableName)
		    							.delete(keyPath);
		request.onsuccess = () => callback && callback('删除成功');
		request.onerror = () => callback && callback('删除失败');
	}
}
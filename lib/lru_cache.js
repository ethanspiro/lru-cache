const LinkedList = require('./lru_linked_list.js');

class Cache {
    constructor(maxSize = 5) { // default for testing purposes
        this.cache = {};
        this.maxSize = maxSize;
        this.currentSize = 0;
        this.dLL = new LinkedList();
    }
    
    exists(key) {
        return this.cache.hasOwnProperty(key);
    }
    
    retrieve(key) {
        if (this.cache[key]) {
            const node = this.cache[key];
            this.dLL.removeAt(node); // cycle node to start of list
            const nodeInList = this.dLL.insertFirst(node);
            this.cache[key] = nodeInList;
            return node.value;
        }
        
        return null; // cant find
    }
    
    add(key, value) {
        const newNode = this.dLL.newNode(key, value);
        
        if (this.currentSize >= this.maxSize) {
            const removedKey = this.dLL.removeLast();
            delete this.cache[removedKey];
            this.currentSize--;
        }
        
        const nodeInList = this.dLL.insertFirst(newNode);
        this.cache[key] = nodeInList;
        this.currentSize++;
    }
}

module.exports = Cache;

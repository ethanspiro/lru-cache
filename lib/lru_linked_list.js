const Node = require('./lru_node.js');

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    
    newNode(key, value) {
        return new Node(key, value);
    }
    
    insertFirst(node) {
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return node;
        }
        
        node.next = this.head;
        node.previous = null;
        this.head.previous = node;
        this.head = node; // move head pointer
        return node;
    }
    
    removeAt(node) {
        if (node.previous) {
            node.previous.next = node.next;
        } else {
            this.head = node.next;
        }
        
        if (node.next) {
            node.next.previous = node.previous;
        } else {
            this.tail = node.previous;
        }
    }
    
    removeLast() {
        let key = null;
        if (this.tail) {
            key = this.tail.key;
            
            if (this.tail.previous) {
                this.tail = this.tail.previous;
                this.tail.next = null;
            } else { // case of only 1 element in the list, head and tail the same
                this.tail = null;
                this.head = null;
            }
        }
        
        return key; // null if no tail to remove
    }
}

module.exports = LinkedList;

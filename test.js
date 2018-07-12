const assert = require('assert');

const Node = require('./lib/lru_node.js');
const LinkedList = require('./lib/lru_linked_list.js');
const Cache = require('./lib/lru_cache.js');
const salesTaxLookup = require('./sales_tax_lookup.js');

/**
* Node class
*/
const expectedNode = {
    key: 'abc',
    value: 123,
    next: null,
    previous: null
};

assert.deepEqual(new Node('abc', 123), expectedNode);

/**
* LinkedList class
*/
const ll = new LinkedList();
const expectedLL = {
    head: null,
    tail: null
};

// test constructor and newNode()
assert.deepEqual(ll, expectedLL);
assert.deepEqual(ll.newNode('abc', 123), expectedNode);

// test inserting first node in empty list
ll.insertFirst(expectedNode);
assert(ll.head.key === 'abc');
assert(ll.head.value === 123);
assert(ll.head.next === null);
assert(ll.head.previous === null);
assert(ll.tail.key === 'abc');
assert(ll.tail.value === 123);
assert(ll.tail.next === null);
assert(ll.tail.previous === null);

// test inserting second node and movement of head/tail pointers
ll.insertFirst(new Node('def', 456));
assert(ll.head.key === 'def');
assert(ll.head.value === 456);
assert(ll.head.next.key, ll.tail);
assert(ll.head.previous === null);
assert(ll.tail.key === 'abc');
assert(ll.tail.value === 123);
assert(ll.tail.next === null);
assert(ll.tail.previous, ll.head);

// test removeLast()
ll.removeLast();
assert(ll.head.key === 'def');
assert(ll.tail.key === 'def');
ll.removeLast();
assert(ll.head === null);
assert(ll.tail === null);

// test removeAt(node)
ll.insertFirst(new Node('abc', 123));
const middleNode = new Node('def', 456);
ll.insertFirst(middleNode);
ll.insertFirst(new Node('ghi', 789));
ll.removeAt(middleNode);
let counter = 0;
let node = ll.head;
while (node) {
    node = node.next;
    counter++;
}
assert(counter === 2);
assert(ll.head.key === 'ghi');
assert(ll.tail.key) === 'abc';


/**
* Cache class
*/
const c = new Cache();
const expectedCache = {
    cache: {},
    maxSize: 5,
    currentSize: 0,
    dLL: {
        head: null,
        tail: null
    }
};

assert.deepEqual(c, expectedCache);
const biggerCache = new Cache(10);
assert(biggerCache.maxSize === 10);

// add()
c.add('abc', 123);
assert(c.cache['abc']);
assert(c.dLL.head.key === 'abc');
assert(c.dLL.tail.key === 'abc');
c.add('a', 1);
c.add('b', 2);
c.add('c', 3);
c.add('d', 4);
c.add('e', 5);
assert(!c.cache['abc']); // abc removed because it is lru in size 5 cache
assert(c.dLL.head.key === 'e');
assert(c.dLL.tail.key === 'a');

// exists()
assert(c.exists('a'));
assert(!c.exists('abc'));

// retrieve()
assert(c.retrieve('b') === 2);
assert(c.dLL.head.key === 'b'); // head is now b since it is mru

/**
* Sales Tax functions
* Note: only element a (index 4) will perform a fast lookup (check console logs)
* By the time b is searched for second time, it is out of the LRU cache
*/
const addresses = ['a', 'b', 'c', 'd', 'a', 'e', 'f', 'b'];
for (let address of addresses) {
    salesTaxLookup(address);
}

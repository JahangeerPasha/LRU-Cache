class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.cache = new Map();
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const node = this.cache.get(key);
        this._remove(node);
        this._add(node);
        this.updateDisplay();
        return node.val;
    }

    put(key, val) {
        if (this.cache.has(key)) {
            this._remove(this.cache.get(key));
            this.size--;
        }
        const newNode = new Node(key, val);
        this._add(newNode);
        this.cache.set(key, newNode);
        this.size++;
        if (this.size > this.capacity) {
            const lru = this.head.next;
            this._remove(lru);
            this.cache.delete(lru.key);
            this.size--;
        }
        this.updateDisplay();
    }

    _add(node) {
        const prev = this.tail.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.tail;
        this.tail.prev = node;
    }

    _remove(node) {
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        next.prev = prev;
    }

    updateDisplay() {
        const cacheContainer = document.getElementById('cache');
        cacheContainer.innerHTML = '';
        let current = this.head.next;
        while (current !== this.tail) {
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            nodeDiv.textContent = `Key: ${current.key}, Value: ${current.val}`;
            cacheContainer.appendChild(nodeDiv);
            current = current.next;
        }
    }
}

const cache = new LRUCache(3);

function handlePut() {
    const key = parseInt(document.getElementById('putKey').value);
    const value = parseInt(document.getElementById('putValue').value);
    if (!isNaN(key) && !isNaN(value)) {
        cache.put(key, value);
    }
}

function handleGet() {
    const key = parseInt(document.getElementById('getKey').value);
    if (!isNaN(key)) {
        const value = cache.get(key);
        alert(value !== -1 ? `Key ${key}: Value ${value}` : `Key ${key} not found`);
    }
}

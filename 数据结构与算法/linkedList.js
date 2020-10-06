class Node {
  constructor(element) {
    this.element = element;
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0
  }

  clear() {
    this.head = null;
    this.size = 0;
  }

  append(ele) {
    var node = new Node(ele);
    var current;
    
    if(this.head == null) this.head = node;
    else {
      current = this.head;
      while(current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  remove(index) {
    if (index < 0 || index > this.size || this.size === 0) return -1;
    var pre, curr;
    curr = this.head;
    pre = curr;
    if (index === 0) this.head = curr.next;

    for (var i = 0; i < index; i++) {
      prev = curr;
      curr = curr.next;
    }
    
    prev.next = curr.next;
    this.size--;
    return curr.element; 
  }

  insert(ele, index) {
    if (index < 0 || index > this.size || this.size === 0) return false;
    var node = new Node(ele);
    var curr, prev;
    if(index === 0) {
      node.next = this.head;
      this.head = node;
    }
    curr = this.head;
    for (var i = 0; i < index; i++) {
      prev = current;
      curr = curr.next;
    }

    node.next = curr;
    prev.next = node;
    this.size++;
  }

  length() {
    return this.size;
  }

  getValue(index) {
    if (index < 0 || index > this.size || this.size === 0) return false;
    var curr = this.head;
    for (var i = 0; i < index; i++) curr = curr.next;
    return curr.element;
  }
}
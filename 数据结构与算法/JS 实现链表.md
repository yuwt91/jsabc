## 用 JavaScript 实现链表

链表（linked-list）和数组（array）类似，是按顺序存放元素的线性数据结构，不同的是数组中的元素好像是“细胞”，和整体的联系密不可分，链表中的元素像是乐高积木块，彼此独立，可以随意从中拿下或放上一个积木，不会影响其他元素。

每个链表中的元素好比一个盒子，盒子分为两格，第一格存数据，第二格存下一个盒子的地址，最后一个盒子不存下一个盒子的地址。

根据 list ADT 定义，实现一个链表要实现以下方法：

```js

// 移除所有元素，使之成为空链表
clear()

// 链表末尾添加元素
append(ele)

// 移除并返回指定元素
remove(index)

// 指定位置插入元素
insert(ele, index)

// 返回链表的节点个数，头部节点和尾部节点不算在内
length()

// 获得index位置的节点的数据
getValue(index)
```

由于链表中的元素是独立的节点，所以单独用一个类来实现节点：

```js
class Node {
	constructor(element){
		this.element = element;
		this.next = null
	}
}
```

实现链表的index，主要是要实现“当前位置”这个概念，头部节点的index为0，头部节点的next指向的节点的index为1，依次类推，可以用for或者while进行实现

```js
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
```

源码见同目录文件：`linkedList.js`

参考：
[openDSA-Linked-list](https://opendsa-server.cs.vt.edu/OpenDSA/Books/Everything/html/ListLinked.html#linked-list-implementation)
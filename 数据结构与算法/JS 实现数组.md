## 用 JavaScript 实现 Array class

### 1. 与数组相关的抽象数据类型——列表

讲 `array`（`数组`）之前先要提与数组相关的抽象数据类型——`list`（`列表`），我们把数据作为列表的一种具体实现。而当我们从抽象数据类型的层面来讨论时，意味着我们只用描述性、定义性的话语来说明列表的有哪些特点，至于这些特点具体如何实现暂时不用管。

列表的最重要特征是**位置**，即在一个列表中，依次排列着*第一个*元素、*第二个*元素...一直到*最后一个*元素，这些元素的排列是有顺序的。列表可以存放不同类型的元素值，但一般假定一个列表通常用来存放同一种类型的元素值。

如果一个列表中没有任何元素，则说它是个**空**列表，当前列表中元素的个数，叫列表的**长度**，列表的起始位置叫**头（head）**，列表的结束位置叫**尾（tail）**

### 2. 列表的ADT

ADT（抽象数据类型）是对一类数据及能对它进行的哪些操作作出的规定，对于列表的特征在 1 中提到，能对列表进行的操作有以下：

```js
// 移除列表中的所有元素，使之成为空列表
clear();

// 在列表的当前位置插入 element 这个元素
// 同时确保不会超过列表的容量
insert(element)；

// 移除并返回当前位置的元素
remove();

// 将当前位置设为列表的起始位置
moveToStart();

// 将当前位置设为列表的结束位置
moveToEnd();

// 将当前位置往左移一位，如果当前已位于头部，则不变
prev();

// 将当前位置往右移一位，如果当前已位于尾部，则不变
next();

// 返回列表中当前存在的元素个数
length();

// 返回当前元素的位置
currPos();

// 将当前位置设为 pos
moveToPost(pos);

// 如果当前位置在列表尾部，返回true
isAtEnd();

// 返回当前位置的元素值
getValue();
```

实现 list，就需要实现上面描述的所有方法。

参考：
[OpenDSA-The List ADT](https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS2/html/ListADT.html#list-terminology-and-notation)

### 3. 用 JavaScript 实现 Array

我原来想用 JavaScript 实现基于数组的列表，但发现按照 list ADT的描述，很多方法无从按照js的逻辑来实现，如当前位置及相关的一连串方法，不知道从何做起，因此这里实现基本的array 方法。

1. 什么是数组

`数组`指一段连续的内存地址，其中每个地址都存储一个固定长度的数据项。

2. 用 JavaScript 实现操作数据的几个方法

```js
class TestArray {
	constructor(){
		// 保存数组的长度
		this.length = 0;
		// 用对象存放数组元素
		this.data = {};
	}
	
	// 移除数组中所有元素，使之成为空数组
	clear(){}
	
	// 在数组指定位置插入 ele 这个元素，返回整个数组
	insert(ele, index){}

	// 移除并返回位置为 index 的元素
	remove(index){}

	// 在数组的末尾添加元素ele
	append(ele){}
	
	// 删除数组末尾的元素
	pop(){}

	// 获取位置为 index 的元素
	getValue(index){}
	
}
```

以下是具体实现：

```js
clear(){
  // 将数组的长度设为0后删除其中的所有元素
  // ES5 15.4 'whenever the length property is changed, every property whose name is an array index whose value is not smaller than the new length is automatically deleted'
  // 其他清空数组的方法：array.splice(0,array.length);array=[];
	this.length = 0;
}

insert(ele, index){
	// 从最后一个元素开始，直到当前位置的后一个元素，依次往后移一位
	// 给当前位置腾出空间
	for(let i=this.length; i>index; i--){
		this.data[i] = this.data[i-1];
	}
	this.data[index] = ele;
	this.length++;
	return this.data;
}

remove(index){
	//没有该元素，返回null
	if((index<0) || (index>this.length-1)) return null;
	
	// 获取当前位置元素的复制
	const eleRemoved = this.data[index]; 
	
	// 从当前位置开始，直到倒数第二个位置，依次将后一个位置的元素往前移一位
	for(let i=index; i<this.length-1; i++){
		this.data[i] = this.data[i+1];
	}
	
	// 返回被删除的元素
	return eleRemoved;
}

append(ele){
	this.data[this.length] = ele;
	this.length++;
	return this.data;
}

pop(){
	const lastEle = this.data[this.length-1];
	delete this.data[this.length-1];
	this.length--;
	return this.data;
}

getValue(index){
	//没有该元素，返回 undefined
	if((index<0) || (index>this.length-1)) return undefined;
	return this.data[index];
}

```





Object.defineProperty() 方法

用来给一个对象直接添加、修改属性。

Object.defineProperty(对象，属性名，描述符)

描述符是个对象，用来界定属性能否被读写，如何被读写。描述符分两种形态：数据描述符（data descriptors），访问描述符（accessor descriptors），一个属性要么被数据描述符，要么被访问描述符描述。

两个描述符具体是什么？
两者都共有这些可选的键：
```js
{
	configurable: false, // 默认false，如果是true，这个属性能从对象上被删除
	enumerable: false // 默认false，如果是true，那么遍历对象时，这个属性会被枚举到
}
```

数据描述符有这些可选键值：
```js
{
	value: undefined, // 该属性对应的值，默认undefined
	writable: false	 // 默认false，如果是true，属性的值，也就是value，可以被赋值运算符改变
}
```
访问描述符有这些可选键值：
```js
{
	get: function(){} // 是个函数，访问属性时，调用这个 getter 函数
	set: function(value){} // 是个函数，修改属性时，调用这个 setter 函数
}
```


















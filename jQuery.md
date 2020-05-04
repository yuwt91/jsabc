

jQuery 


### 整个 jQuery 被包在一个 IIFE 中
```js
(function(global, factory){
	// somecoede
	// 1. IIFE 有两个参数，其中一个是factory。IIFE 函数内部返回 factory 的调用结果
  // 2. 调用IIFE 时给 factory 传入了匿名函数，匿名函数作为 factory 变量传入后，被调用
  // 3. 调用这个匿名函数（在这里叫factory）会发生什么结果？
  // 4. 会创建一个执行上下文，在其中初始化一些变量、函数，更具体的，需要看传进来的匿名函数
	
})(typeof window !== "undefined" ? window : this, function(window, noGlobal){
	// 匿名函数里的内容
	var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context );
	// jQuery 函数接受选择器作为参数，调用它会返回 new jQuery.fn.init 的结果，这样外界调用jQuery 就不用在前面加 new 操作符。可以看到，jQuery.fn.init 是个构造器函数。
};

jQuery.fn = jQuery.prototype = {
// 定义了一些方法，如：
	constructor: jQuery,
	length: 0,
	toArray: function() {return slice.call( this );}
}; 
// 我们知道每个函数都有 prototype 属性，当这个函数被当作构造器用时，其 prototype 属性才发挥作用。上面这段代码创建了一个对象，并让它可以通过 jQuery.fn 和 jQuery.prototype 引用。

});
```

### jQuery 的代码结构


###  jQuery 对象
jQuery 对象是个数组对象，数组的原型对象挂着 jQuery 方法。
数组中的元素是浏览器提供的 DOM 元素，DOM 元素上挂着浏览器提供的属性、方法和事件。
即使网页上没有元素，使用 jQuery 选择语法也会返回一个空数组对象，所以不能用简单的
`if ($('#top')) {}` 来判断网页上是否有 id 为 top 的元素，因为这个判断总是 true，用元素的长素属性来判断：`if ($('#top').length > 0) {}`，或者取出数组中 DOM 元素做判断：`if ($('#top')[0]) {}`

### 创建 jQuery 对象
```js
var $header = $("#header");
```
jQuery 对象是个数组对象

### 方法链

我们可以一个接一个调用方法，每个方法都会影响调用它的父级对象。

如何实现？

例如：`Obj.method1().method2()` 

`method1` 方法和 `method2` 方法最终都会返回指向`obj` 的` this` 



### jQuery 如何暴露到全局对象上：

```js
if (typeof noGlobal === strundefined) {
	window.jQuery = window.$ = jQuery;
}
```

在页面上引入 jQuery 
通过内容分发网络（CDN）
国内
```js
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.0/jquery.js"></script>
```

国际
```js
// 微软的CDN
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.5.0.js"></script>
```

这些是开发版，包含了注释和缩进，发布前要用打包工具转成压缩版（只有一行），可用在线压缩 JS 工具，或者配置 webpack 

来源：
1. [国内 BootCDN jQuery](https://www.bootcdn.cn/jquery/)
2. [微软CDN](https://docs.microsoft.com/en-us/aspnet/ajax/cdn/overview#jQuery_Releases_on_the_CDN_0) 



本地文件
使用 <script> 标签进行外部文件引入
```js
<script src = "jquery.js"></script>
```

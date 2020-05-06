

jQuery 


###  jQuery 就是一个大型 IIFE 
IIFE（immediately invoked function expression） 叫做立即调用函数表达式， jQuery 绝大部分源代码放在一个 `IIFE`中，大致浏览了一下它的结构：

#### IIFE 整体结构

```js
(function(global, factory){
	// somecode
	return factory;
	// 1. IIFE 有两个参数，一个是全局上下文，一个是factory。IIFE 函数内部返回 factory 的调用结果
  // 2. 调用这个匿名函数（在这里叫factory）会发生什么结果？
  // 3. 会创建一个执行上下文，在其中初始化一些变量、函数，更具体的，需要看传进来的匿名函数
	
})(typeof window !== "undefined" ? window : this, function(window, noGlobal){
	// 1. 第一个参数写了一个三元操作符，用于给 jQuery 传入一个全局上下文，在浏览器中是window
	// 2. 第二个参数是一个匿名函数，传给 factory，在函数体内部调用
	// 3. jQuery 的主体代码在这个函数里面
});
```

具体内容要看传入  `factory` 的匿名函数。
#### 传入 `factory` 的匿名函数的内容
```js
(function(global, factory){
// somecode
})(typeof window !== "undefined" ? window : this, function(window, noGlobal){
	// 1. jQuery 函数，它接受 selector 作为参数，调用它会返回 new jQuery.fn.init 的结果，外界调用 $("#id")就是在调用这个函数。可以看到，jQuery.fn.init 是个构造器函数。
	var jQuery = function( selector, context ) {
	return new jQuery.fn.init( selector, context );
};

// 2. jQuery.prototype jQuery 的原型对象
// 我们知道每个函数都有 prototype 属性，当这个函数被当作构造器用时，其 prototype 属性才发挥作用。上面这段代码创建了一个对象，并让它可以通过 jQuery.fn 和 jQuery.prototype 引用。普通函数的 prototype 属性没有用，这么写难道想把 jQuery 当作构造器调用？
jQuery.fn = jQuery.prototype = {
// somecode
	constructor: jQuery,
	length: 0,
	toArray: function() {return slice.call( this );}
}; 

// 3. jQuery.fn.init 的定义
// 上面提到 jQuery.fn.init 指向一个构造器函数，所以内部代码一定有 this，this 指向 new 出来的空对象，构造器就是给 new 出来的空对象添加属性和方法用的。
var init = jQuery.fn.init = function(selector, context, root){
// somecode

// 构造函数的最后一行返回一个 调用 jQuery.makeArray 函数的结果。
// makeArray 把 this 这个空对象转换成数组
// 这种做法说明，我们还可以在构造器函数内部，把 this 传给其他函数，对 this 做点什么，然后再把从它构造器函数里返回。
return jQuery.makeArray( selector, this );
};

// 这里让 init 的 prototype 属性也指向了 jQuery 函数的 prototype 属性，这样会让 init 构造器产生的对象的原型指向它。jQuery.fn.init 的作用是，接收输入的选择器，$('#id')中的‘#id’，然后返回一个对象，只是做了 jQuery 对象的初始化工作。对象可用的方法是通过 jQuery 的prototype 属性获取的。
init.prototype = jQuery.fn;

...
// 最后看一下 jQuery 如何暴露到全局对象上
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}

});
```


###  jQuery 对象
jQuery 对象是个数组对象，数组的原型对象挂着 jQuery 方法。
数组中的元素是浏览器提供的 DOM 元素，DOM 元素上挂着浏览器提供的属性、方法和事件。
即使网页上没有元素，使用 jQuery 选择语法也会返回一个空数组对象，所以不能用简单的
`if ($('#top')) {}` 来判断网页上是否有 id 为 top 的元素，因为这个判断总是 true，用元素的长素属性来判断：`if ($('#top').length > 0) {}`，或者取出数组中 DOM 元素做判断：`if ($('#top')[0]) {}`

以下代码创建一个 jQuery 对象
```js
var $header = $("#header"); // 变量名称前加 $ 表示它是 jQuery 对象
```

### 方法链

我们可以一个接一个调用方法，每个方法都会影响调用它的父级对象。

如何实现？

例如：`$obj.method1().method2()` 

$obj 调用`method1` 方法，方法内部对`$obj`做某些加工，最后返回 `this`(即$obj)，加工后的$obj接着调用 `method2` 方法。

```js
jQuery.fn.extend({ // 这些方法都放在 jQuery 原型上
	addClass: function(value){
		// 为对象添加类的实现代码
		return this;
	},
	
	removeClass: function(value){
		// 为对象移除类的实现代码
		return this;
	}
});
```

每次调用方法，都返回一个被加工过的 jQuery 对象，因此可以一直链式调用下去。



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

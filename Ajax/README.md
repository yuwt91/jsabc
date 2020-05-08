Ajax 一种构建 Web 应用的方式，它包含多种技术：

- XHTML 和 CSS ：用于静态页面的表现
- DOM：实现页面的动态交互及呈现
- XML：数据交换的格式（现在还有Json）
- XMLHttpRequest：用来进行异步数据获取的浏览器对象
- JavsScript：把以上联系起来的脚本语言

在使用 Ajax 之前， 用户行为触发一个 HTTP 请求，由浏览器发送给 web服务器，服务器处理用户请求，并把相应通过一个 HTML 页面返回给浏览器。这种处理方式有两个体验不好的地方：

1. 服务器在处理请求的时候，用户只能等着；
2. 服务器返回整个 HTML 页面，导致浏览器需要重新渲染一遍页面

![ajax model](/Users/tom/Documents/JSabc/Ajax/images/ajax model.jpg)

Ajax 的方式是在用户与服务器之间添加了一个 Ajax 引擎层，由用户触发网页上行为，会由 Ajax 引擎层处理并发送基于 XMLHttpRequest 的请求，服务器以 XML 格式返回数据，Ajax 引擎再转换成HTML 渲染到页面上。

![ajax asyn](/Users/tom/Documents/JSabc/Ajax/images/ajax asyn.jpg)

一些在客户端即可处理的工作会由 Ajax 引擎层直接处理（如简单的数据验证，在内存中编辑数据等），一些需要服务器处理的工作会由 Ajax 引擎层以异步的方式发送给服务器，不会中断用户与 web应用的交互过程。



参考

Ajax: a new approach to web application




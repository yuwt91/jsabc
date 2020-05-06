// 构建一个 IIFE，防止命名空间污染
// 参数：里面的函数需要访问 window 和 jQuery，所以它们作为参数传入
// 返回：返回调用构造器后新建的对象
// 外界通过 Greetr() 和 G$() 进行调用
;(function(global, $){

    var Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language);
    };

    // 定义一些变量，只供 Greetr 里面的方法使用
    // 变量保存着不同语言版本的 greeting
    // 尽管如此，在 IIFE 返回后，外界通过G$()创建的对象仍能访问这些变量。因为闭包把 IIFE 这个词法环境中的变量都保存起来了
    var supportedLanguage = ['cn', 'en'];
    
    var greetings = {
        cn: '吃了吗',
        en: 'Hi'
    };

    var formalGreetings = {
        cn: '你好',
        en: 'Greetings'
    };

    var logMessage = {
        cn: '欢迎登陆',
        en: 'Logged in'
    }

    // 定义 Greetr 原型，里面是一些可用的方法
    // 为什么不直接定义 Greetr.init.prototype？因为这样看起来更直接
    // 为了使经过 Greetr.init 构造函数创建的对象拥有 Greetr.prototype，需要做一步指定
    Greetr.prototype = {

        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        validate: function(){
            if (supportedLanguage.indexOf(this.language) === -1) {
                throw '不支持的语言';
            }
        },

        greeting: function(){
            return greetings[this.language] + ',' + this.firstName;
        },

        formalGreeting: function(){
            return formalGreetings[this.language] + ',' + this.fullName();
        },

        // 以下方法供链式调用
        greet: function(formal){
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            if(console) {console.log(msg);}
            return this; 
        },

        log: function(){
            if(console){
                console.log(logMessage[this.language] + ' ' + this.fullName());
            }
            return this;
        },

        setLang: function(lang){
            this.language = lang;
            this.validate();

            return this;
        },

        // 添加 jQuery 支持
        // 参数：传入 jQuery 选择器
        // 返回：this 以便链式调用
        renderGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }
            if(!selector){
                throw 'Missing jQuery selector';
            }

            var msg;
            if(formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            $(selector).html(msg);
            return this;
        }
    };

    // 构造函数，模仿 jQuery 风格，新对象都通过 Greetr.init 构建
    Greetr.init = function(firstName, lastName, language){
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.language = language || 'cn';
        this.validate();
    }

    // 把 Greetr 的原型设为 Greetr.init 构造函数的原型，模仿 jQuery 风格
    Greetr.init.prototype = Greetr.prototype;

    // 把 Greetr 暴露到全局对象上
    global.Greetr = global.G$ = Greetr;

})(window, jQuery);
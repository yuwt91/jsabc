// 获取一个新的对象
// var g = G$('james', 'fisher');

// 获取按钮，绑定click事件
$('#login').click(function(){
    // 新建一个 Greetr 对象
    var loginGtr = G$('james', 'fisher');

    // 获得选择框里的值，根据值改变指定元素中的内容
    loginGtr.setLang($('#lang').val()).renderGreeting('#greeting', true).log();

}); 

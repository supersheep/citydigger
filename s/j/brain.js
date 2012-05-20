Locator.init("map_container");

// 三个按钮分别点击，都会有不同的控件下拉出来
ActionButton($('.find'),"s/tpl/find.html",function(){});
ActionButton($('.at'),"s/tpl/at.html",function(){});
ActionButton($('.msg'),"s/tpl/msg.html",function(){});

$(".logo").click(ActionButton.close);
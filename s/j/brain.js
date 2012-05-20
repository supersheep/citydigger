(function(){

function renderUserList(){

}


Locator.init("map_container");

// 三个按钮分别点击，都会有不同的控件下拉出来
ActionButton($('.find'),"s/tpl/find.html",function(){
	
	var search_input = ('.search-bar .input-text');
	var search_btn = $('.search-bar .search');
	var fresh = $('.search-bar .btn-sure');
	
	search_btn.click(fetchResult);
	fresh.click(fetchFresh);
	
	function fetchResult(){
		
	}
	
	function fetchFresh(){
		
	}
	
	
	

});
ActionButton($('.at'),"s/tpl/at.html",function(){});
ActionButton($('.msg'),"s/tpl/msg.html",function(){});

$(".logo").click(ActionButton.close);
})();
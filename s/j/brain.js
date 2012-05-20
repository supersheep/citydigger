(function(){

function renderUserList(){

}


Locator.init("map_container");

// 三个按钮分别点击，都会有不同的控件下拉出来
ActionButton($('.find'),"s/tpl/find.html",function(){
	var search_input = $('.search-bar .input-text');
	var search_btn = $('.search-bar .search');
	var fresh = $('.search-bar .btn-sure');
	var list = $(this).find('.list-cont');
	
 	var keyword;
	
	search_btn.click(function(){
		keyword = search_input.val();
		fetchResult(1,10);
	});
	
	fresh.click(function(){
		fetchFresh(1,10);
	});
	
	function fetchResult(from,to){
		list.empty();
		list.append($('<img />').attr('src','s/i/pending.gif'))
		$.ajax({
			url:'ajax/user/search/',
			data:{from:from,to:to,keyword:keyword},
  			dataType: 'json',
			success:function(json){
				if(json.code==200){	
					var ul = $('<ul />');
					list.empty();
					list.append(ul);
					console.log(list);
					json.msg.forEach(function(item){
						var li = $('<li class="item clearfix" />');
						
						li.append($('<img class="avatar" />').attr('src',item.avatar));
						li.append($('<p class="name" />').html(item.username));
						li.append($('<span class="connect" />').data('id',item.id));
						
						ul.append(li);
					});
					
					console.log(ul);
					
				}else{
					
				}
			}
		});
	}
	
	function fetchFresh(from,to){
		
	}
});
ActionButton($('.at'),"s/tpl/at.html",function(){});
ActionButton($('.msg'),"s/tpl/msg.html",function(){});

$(".logo").click(ActionButton.close);
})();
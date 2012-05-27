(function(){

window.mapLay = new MapLay("#map_container");

// Render user list to the list
function renderUserList(list,data){
var ul = $('<ul />');
list.empty();
list.append(ul);
data.forEach(function(item){
	var li = $('<li class="item clearfix" />');
	
	li.append($('<img class="avatar" />').attr('src',item.avatar));
	li.append($('<p class="name" />').html(item.username));
	li.data('data',item);
	ul.append(li);
});
}

function renderMentionsList(list,data){
var ul = $('<ul />');
list.empty();
list.append(ul);

data.forEach(function(item){
	var li = $('<li class="item clearfix" />');
	var user = item.user;
	
	li.append($('<img class="avatar" />').attr('src',user.avatar).attr('title',user.username));
	li.append($('<p />').html(user.username + ' just found a nice place'));
	li.append($('<p class="btn-sure" />').html('have a look'))
	li.data('post',item.post);
	ul.append(li);
});
}

// fetch result from ajax/user/search
function fetchResult(url,data,list,cb){
	list.empty();
	list.append($('<img />').attr('src','s/i/pending.gif'))
	$.ajax({
		url:url,
		data:data,
		dataType: 'json',
		success:function(json){
			if(json.code==200){	
				cb(list,json.msg);
			}
		}
	});
}

function msgCount(n){
	var msg = $('.msg');
	var counter = msg.find('.count');
	
	if(n == 0){
		counter.remove();
	}else{
		if(!counter){
			counter = $('<small />').addClass('count');
			msg.append(counter);
		}
		counter.html(n);
	}
}

msgCount.current = function(){
	var counter = $('.msg .count');
	
	if(!msgCount._current){
		if(counter.get(0)){
			msgCount._current = +counter.html();
		}else{
			msgCount._current = 0
		}
	}
	
	return msgCount._current > 0 ?  msgCount._current : 0;
};


// 三个按钮分别点击，都会有不同的控件下拉出来

var memberPicker = new ActionButton('s/tpl/find.html',function(){
	var elem = this,
		search_input = elem.find('.search-bar .input-text'),
		search_btn = elem.find('.search-bar .search'),
		list = $(this).find('.list-cont');
	
	search_btn.click(function(){
		var v = search_input.val();
		v && fetchResult('ajax/user/search',{
			from:1,
			to:10,
			keyword:v
		},list,renderUserList);
	});
	
	list.delegate('.item','click',function(){
		memberPicker.elem.trigger("pick",$(this).data('data'));
		memberPicker.close();
	});
});	

var atPannel = new ActionButton("s/tpl/at.html",function(){
	var self = this;
	var at_btn = self.find('.at-btn');
	var post_btn = self.find('.btn-bar .btn-sure');
	var cancel_btn = self.find('.btn-bar .btn-cancel');
	var post_input = self.find('.post-box textarea');
	var member_list = self.find('.member-list'); 
	var member_arr = []; 
	
	
	function addMember(o){
		var id = o.id,
			name = o.username,
			member_span = $('<span class="member" />'),
			name_span = $('<span class="name" />').html(name),
			cross = $('<span class="cross" />').html("x");
			
		if(!(member_arr.indexOf(id)>=0)){
			member_arr.push(id);
			member_list.append(member_span);
			member_span.append(name_span,cross);
			cross.click(function(){
				removeMember(member_span,o);
			});
		}
	}
	
	function removeMember(elem,o){
		elem.remove();
		member_arr.forEach(function(id,i){
			if(id == o.id){
				member_arr.splice(i,1);
			}
		});
	}
	
	at_btn.click(function(){
		memberPicker.open();
	});
	
	post_btn.click(function(){
		var content = post_input.val(),
			userid = window.userid,
			latlng = mapLay.latlng.map(function(n){return n.toFixed(4)}).join(','),
			mentions = member_arr.join(',');
		
		$.ajax({
			type:'post',
			url:'ajax/post/add',
			dataType: 'json',
			data:{userid:userid,content:content,latlng:latlng,mentions:mentions},
			success:function(json){
				var user,post,latlng;
				if(json.code == 200){
					user = json.msg.user;
					post = {content:content};
					latlng = json.msg.latlng.split(',');
					mapLay.add(user,post,latlng);
					atPannel.close();
				}else{
					alert(json.msg);
				}
			}
		});		
	});
	
	cancel_btn.click(function(){
		atPannel.close();
	});
	
	
	memberPicker.elem.unbind('pick');
	memberPicker.elem.bind('pick',function(e,o){
		addMember(o);
	});
	
	msgPannel.close();
	
});


var msgPannel = new ActionButton("s/tpl/msg.html",function(){
	var elem = this,
		list = elem.find('.list-cont');
	fetchResult('ajax/mentions/unread',{},list,renderMentionsList);
	list.delegate('.item','click',function(){
		var post = $(this).data('post');
		msgPannel.close();
		msgCount(msgCount.current() - 1);	
		console.log();
		$.ajax({
			url:'ajax/post/get',
			data:{id:post},
			dataType:'json',
			success:function(e){
				var post,latlng;
				if(e.code == 200){
					msg = e.msg;
					latlng = msg.post.latlng.split(',');
					
					mapLay.addpost(e.msg);
					mapLay.locate.apply(mapLay,latlng);
				}
			}
		});
	});
});

// 点击按钮打开相应浮层
$('.at').click(function(){
	msgPannel.close();
	memberPicker.close();
	atPannel.toggle();
})

$('.msg').click(function(){
	atPannel.close();
	msgPannel.toggle();
});

// 点击logo关闭所有浮层
$(".logo").click(function(){
	atPannel.close();
	msgPannel.close();
});


$.ajax({
	url:'ajax/post/latest',
	dataType:'json',
	success:function(json){
		if(json.code == 200){
			json.msg.forEach(function(data){
				mapLay.addpost(data);
			});
		}
	}
});

})();
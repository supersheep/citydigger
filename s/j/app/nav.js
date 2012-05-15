// 一个模块所要做的事情，应该是可以通过一些参数的配置来初始化一个对象
// 同时提供对外提供适合的api，以应对需求的变动
// 这里的nav，使用的时候写了两行，分别调用nav.li()和nav.switchy()
// 如果应用中这两件事情都是必然会一起做的，那就没有必要分成两个函数
// 一个init就好
// 我将下面代码批注并注释掉，然后再尽量利用你原先逻辑的情况下重写一版，你可以参考


/*
define(function(require,exports){
	require('jquery');
	return {
		li:function(){
			var ul=$('.areaul');
			ul.delegate('li','click',function(){
				var current=$(this);
				var area = $(this).attr('id');
				var a = "."+area;
				var all = $('.schools div');
				ul.find('li').removeClass('on');
				current.addClass('on');
				all.css("display","none");
				$(a).css("display","block");			
			});
		},
		switchy : function(){
			var ul = $('.schools ul li');
			ul.mouseover(function(){
				$(this).children('.select').css("display","block");
			});
			ul.mouseleave(function(){
				$('.select').css("display","none");
			});
			
			// mouseover对应mouseout为一组，原生事件
			// mouseenter对应mouseleave为jquery新增事件，用于解决移入内部容器也会触发mouseout的情况。
		}
	}
});
*/


define(function(require,exports){
	require('jquery');
	var nav = function(wrapper){
		var self = this,
			elem = self.elem = $(wrapper),
			areaul = elem.find('.areaul'),
			//arealis = areaul.find('li'),
			closebtn = elem.find('.close'),
			schools = elem.find('.schools');
			
		// bind events
		areaul.delegate('li','click',function(e){
			var cur = $(this),
				navs = areaul.find('li'),
				i = navs.index(cur),		
				schooldiv = schools.find('div');	
			
			navs.removeClass('on');
			cur.addClass('on');
			schooldiv.removeClass('on');
			schooldiv.eq(i).addClass('on');
		});
		
		schools.delegate('li','mouseenter',function(){			
			$(this).find('.select').show();
		});
		
		schools.delegate('li','mouseleave',function(){
			schools.find('.select').hide();
		});
		
		closebtn.click(function(){
			self.close();
		});		
	}
	nav.prototype = {
		close:function(){
			this.elem.hide();
		},
		open:function(){
			this.elem.show();
		}
	};
	return nav;
})




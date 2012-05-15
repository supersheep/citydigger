define(function(require,exports){	
	require('jquery');
	var Calendar = require('calendar');
	var Switchy = require('switchy');	
	return {
		init : function(){			
			var EventCalendar = new Calendar($('.calendar'));
			
			var monthBtns = $('.month');
			var yearBtns = $('.year');
			
			monthBtns.delegate('span','click',function(e){
				var thebtn = $(this);
				monthBtns.find('span').removeClass('on');
				thebtn.addClass('on');
				EventCalendar.setMonth(thebtn.html()-1);				
			});
			
			yearBtns.delegate('span','click',function(e){
				var thebtn = $(this);
				yearBtns.find('span').removeClass('on');
				thebtn.addClass('on');
				EventCalendar.setYear(thebtn.html());				
			});
			
			
			var SMain = new Switchy({			
				'autoplay':1500,
				'trigger':{
					wrapper:$('.slide .ctrl'),
					item:'.num'
				},
				'prepare':['horizontal','vertical'],
				'on':['click'],
				'sliders':[{
					wrapper:$('.slide .pics'),
					items:'li'
				},{
					wrapper:$('.slide .infos'),
					items:'li'
				}],
				'effects':[function(wrapper,items,on,n){	
					wrapper.animate({
						left:-n*630
					},500,'swing',function(){
					});
					// console.log(wrapper,items,on,n);
				},function(wrapper,items,on,n){
					wrapper.animate({
						top:-n*60
					},500,'swing',function(){
					});		
				}]
			});
			var SMenu = new Switchy({
				'trigger':{
					wrapper:$('.tools .tab-hd'),
					item:'.tab-hd-c'
				},
				'on':['click'],
				'sliders':[{
					wrapper:$('.tools .tab-bd'),
					items:'.tab-bd-c'
				}],
				'effects':[function(wrapper,items,on){
					items.hide();
					on.show();
				}]
			});
			var SAd = new Switchy({
				'autoplay':1500,
				'trigger':{
					wrapper:$('.market .ctrl'),
					item:'.num'
				},
				'prepare':['horizontal'],
				'on':['click'],
				'sliders':[{
					wrapper:$('.market .board ul'),
					items:'li'
				}],
				'effects':[function(wrapper,items,on,n){	
					wrapper.animate({
						left:-n*270
					},500,'swing',function(){
						console.log('done');
					});
					// console.log(wrapper,items,on,n);
				}]		
			});
			var SFilter = new Switchy({
				'trigger':{
					wrapper:$('.search-filter'),
					item:'.title'
				},
				'on':['click'],
				'sliders':[{
					wrapper:$('.search-filter'),
					items:'.filter'
				}],
				'effects':[function(wrapper,items,cur,n){
					items.removeClass('on');
					cur.addClass('on');
				}]
			});
			
			
			$('.slide .prev').click(function(e){
				e.preventDefault();
				SMain.to('prev');
			});
			
			$('.slide .next').click(function(e){
				e.preventDefault();
				SMain.to('next');
			});
		}
	}
})

define(function(require,exports){

	function Switchy(opts){			
		
		var self = this,slider,prepare,len = opts.sliders.length;
		
		var preparePresets = {
			'vertical':function(items){
				items.each(function(i,e){
					var el = $(e);
					el.css('top',i* ( el.height() + parseInt(el.css('padding-top')) + parseInt(el.css('padding-bottom')) ));
				});
				return items;
			},
			'horizontal':function(items){
				items.each(function(i,e){				
					var el = $(e);
					el.css('left',i* ( el.width() + parseInt(el.css('padding-left')) + parseInt(el.css('padding-right')) ));
				});
				return items;
			},
			'noop':function(item){
				return item;
			}
		};
		
		function fill(by,length){
			var arr = [];
			for(var i  = 0 ; i < length ; i++){
				arr.push(by);
			}
			return arr;
		}
		
		
		prepare = opts.prepare ? opts.prepare.map(function(e){
			return (typeof e === 'string')?(preparePresets[e]||preparePresets['noop']):e;
		}):fill(preparePresets['noop'],len);
		
		self.sliders = [];
		for(var i = 0 ; i < len ; i ++ ){
			slider =  opts.sliders[i];
			
			self.sliders.push({
				wrapper:slider.wrapper,
				item: prepare[i](slider.wrapper.find(slider.items))
			});		
		}
		
		self.effects = opts.effects;
		
		self.triggers = opts.trigger.wrapper.find(opts.trigger.item);
			opts.on.forEach(function(act){
				self.triggers.bind(act,function(e){
				e.preventDefault();
				var n = self.triggers.index($(this));
				//console.log(n);
				self.to.call(self,n);							
			});
		});	
		
		self.current = 0;
	}
		
	Switchy.prototype = {
		to:function(n){
			var self = this,slider,wrapper,items,current,
				ACTIVECLASS = 'on',
				triggers = self.triggers;
			
			if(n=='next' || n=='prev'){			
				if(n == 'next'){
					//next	
					self.to(self.current + 1 > self.sliders.length ? 0 : self.current+1);
				}else{			
					//prev
					self.to(self.current - 1 < 0 ? self.sliders.length : self.current-1);
				}
				return;
			}

			
			self.current = n;	
			
			triggers.removeClass(ACTIVECLASS);
			triggers.eq(n).addClass(ACTIVECLASS);
			for(var i = 0 , l = self.effects.length ; i < l ; i++ ){
					var slider = self.sliders[i],
					wrapper = slider.wrapper,
					items = slider.item,
					current = slider.item.eq(n);
					self.effects[i].call(null,wrapper,items,current,n);
			}
		}
	}

	return Switchy;

});
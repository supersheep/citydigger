(function(){


function ActionButton(template,callback){
	var self = this;
	self.elem = $('<div />').addClass("action-pannel");
	self.template = template;
	self.name = template.match(/(\w+)\.html/)[1]
	self.callback = callback;
}


ActionButton.prototype.open = function(){
	var self = this;
	var pannel = self.elem;
	var template = self.template;
	var callback = self.callback;
	var succount = 2;
	
	self.opened = true;
	
	
	function cb(){
		succount--;
		
		if(succount==0){
			callback.call(pannel);
		}
	}
	
	pannel.appendTo('body');
	
	
	pannel.load(template,cb);
	pannel.animate({
		"top":40
	},{
		duration:"1000",
		easeing:"easein",
		complete:function(){	
			cb();
		}
	});
	
	
	return false;

}


ActionButton.prototype.close = function(){
	var pannel = this.elem;
	
	this.opened = false;
	
	
	
	
	pannel && pannel.animate({
		"top":-440
	},{
		duration:"1000",
		easeing:"easein",
		complete:function(){
			pannel.detach();
		}
	});
	
};



ActionButton.prototype.toggle = function(){
	if(this.opened){
		this.close();
	}else{
		this.open();
	}
}

window.ActionButton = ActionButton;

})()
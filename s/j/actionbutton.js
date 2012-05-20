(function(){

var current_pannel;

function ActionButton(button,template,callback){
	button.click(function(){
		
		var pannel = $('<div />').addClass("action-pannel");
		pannel.appendTo('body');
		
		pannel.load(template,callback);
		pannel.animate({
			"top":40
		},{
			duration:"1000",
			easeing:"easein",
			complete:function(){
				current_pannel && current_pannel.remove();
				current_pannel = pannel;
			}
		});
		
		
		return false;
	});
}

ActionButton.close = function(){
	current_pannel && current_pannel.animate({
		"top":-440
	},{
		duration:"1000",
		easeing:"easein",
		complete:function(){
			current_pannel.remove();
			current_pannel = null;
		}
	});
};



window.ActionButton = ActionButton;

})()
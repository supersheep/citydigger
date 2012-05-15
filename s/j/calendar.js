define(function(require, exports, module) {
    require('jquery');
    var _Calendar = function(wrap,date){

		date = date || new Date();
		
		this.wrap = wrap;	
		this.year = date.getFullYear();
		this.month = date.getMonth();	
		this.render();
	}


	_Calendar.prototype = {
		
		setYear:function(year){
			this.year = year;
			this.render();
		},
		
		setMonth:function(month){
			this.month = month;
			this.render();
		},
		
		// dateArr = []
		render:function(dateArr){
			
			var self = this;
			var month = new Month(this.year,this.month);
			var firstday = month.firstday;
			var lastday = month.lastDay;
			var calfirst = new Date(new Date(firstday).setDate(-firstday.getDay()+1));
			
			var html = '<table><tr class="weekday"><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></table>';
			
			var table = $(html);
			
			function makeDay(date){
				var td = $('<td />');			
				td.html(date.getDate());
				
				var themonth = date.getMonth();
				
				if(themonth < self.month){
					td.addClass('last-month-day');
				}else if(themonth > self.month || (themonth == 0 && self.month == 11 ) ){
					td.addClass('next-month-day');
				}
				
				if(date.toDateString() == new Date().toDateString()){
					td.addClass('today');
				}
				
				return td;
			}
			
			var tr,td;
			var currentDate = calfirst;
			
				
			for(var i = 0 ; i < 6 ; i++ ){
				var tr = $('<tr class="date"></tr>');
				for(var j = 0 ; j < 7 ; j++){
					td = makeDay(calfirst);
					tr.append(td);
					calfirst.setDate(calfirst.getDate()+1);
				}
				table.append(tr);
			}
			
			
			
			this.wrap.empty();
			this.wrap.append(table);

			
		}

	}



	var Month = function(year,month){	
		var firstday = this.firstday = new Date(year,month,1);	
		var lastday = this.lastDay = new Date(+new Date(year,month+1,0));
		var weeks = this.weeks = getWeeks(firstday,lastday);	
		function getWeeks(f,l){
			return  Math.ceil((l.getDate() - (7 - f.getDay())) / 7 ) + 1;		
		}	
	}

	
	return _Calendar;

});




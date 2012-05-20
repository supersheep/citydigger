var Locator = {
	init:function(id) {
		this.id = id;
		this.getGeoLocation();
	},
	getGeoLocation:function(){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(){
			self.initWithContainerAndPosition.apply(self,arguments);
		},function(){
			self.geoFetchError.apply(self,arguments);
		});
	},
	initWithContainerAndPosition:function(position){
		var myOptions = {
	    	center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
	        zoom: 17,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById(this.id),myOptions);
	},
	geoFetchError:function(){
		alert('fetch error');
	}
}
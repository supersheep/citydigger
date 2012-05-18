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
	/*
function success(position) {
  var s = document.querySelector('#status');
  
  if (s.className == 'success') {
    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
    return;
  }
  
  s.innerHTML = "found you!";
  s.className = 'success';
  
  var mapcanvas = document.createElement('div');
  mapcanvas.id = 'mapcanvas';
  mapcanvas.style.height = '400px';
  mapcanvas.style.width = '560px';
    
  document.querySelector('article').appendChild(mapcanvas);
  
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  var myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
  
  var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  });
}
*/
}
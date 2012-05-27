(function(){

AvatarLay = function(user,postdata,latlng,map){
	
	this.postdata = postdata;
	this.div = $('<div />').addClass('avatar_icon');
	this.src = user.avatar;
	this.latlng = latlng;
	this.map = map;
	this.setMap(map)
}

AvatarLay.prototype = new google.maps.OverlayView();

AvatarLay.prototype.onAdd = function(){
	var panes = this.getPanes();
	var content = this.postdata.content;
	var img = $('<img />').attr('src',this.src);
	var post = this.post = $('<div class="post" />').html(content);
	var div = this.div;
	var arrowsize = this.arrowsize = 5;
	var varrow = this.varrow = $('<div />').addClass('arrow');
	var harrow = this.harrow = $('<div />').addClass('arrow');
	var postarrow = $('<div />').addClass('arrow');
	var postwidth;
	var self = this;
	div.css({
 		background:"#fff",
 		position:'absolute'
 	});
	div.append(img);
	div.append(harrow);
	div.append(varrow);
	
	div.append(post);
	post.append(postarrow);
	
	this.listeners = [
          google.maps.event.addListener(this, 'position_changed',
               function() { self.draw(); }),
          google.maps.event.addListener(this, 'text_changed',
               function() { self.draw(); }),
          google.maps.event.addListener(this.map, 'center_changed',
               function() { self.draw(); }),
          google.maps.event.addListener(this.map, 'projection_changed',
               function() { self.draw(); }),
          google.maps.event.addListener(this, 'zindex_changed',
               function() { self.draw(); })
    ];
	
	$(panes.overlayLayer).append(div);
	
	this.width = div.width();
	this.height = div.height();
	this.div = div;
	
	postwidth = post.width();
	
	postarrow.css({
		left:(postwidth - 4 )/2,
	});
	post.css({
		left: ( this.width - postwidth - 6) / 2,
		bottom:this.height + arrowsize
	});
}

AvatarLay.prototype.onRemove = function(){
	this.div.remove();
	for (var i = 0, l = this.listeners.length; i < l; ++i) {
          google.maps.event.removeListener(this.listeners[i]);
    }
	this.div = null;
}

AvatarLay.prototype.draw = function(){
	var overlayProjection = this.getProjection();
	var latlng = this.latlng;
 	var map = this.map;
 	var div = this.div;
 	
	var position = overlayProjection.fromLatLngToDivPixel(latlng);
	
	var arrowsize = this.arrowsize;
	
	var x,y;
	
	var h = this.height;
	var w = this.width;
	
	//var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
 	//var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
 	var bounds = this.map.getBounds();
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	
	var nepx = overlayProjection.fromLatLngToDivPixel(ne);
	var swpx = overlayProjection.fromLatLngToDivPixel(sw);
	
	var harrow = this.harrow;
	var varrow = this.varrow;
	
 	['east','west','center'].forEach(function(cls){
 		harrow.removeClass(cls);
 	});
 	
 	['north','south','middle'].forEach(function(cls){
 		varrow.removeClass(cls);
 	});
 	console.log(w,h);
 	
 	
 	if(swpx.x > position.x - arrowsize){
 		x = swpx.x + arrowsize;
 		console.log('west',swpx.x);
 		harrow.addClass('west');
 	}else if(nepx.x < position.x + w + arrowsize ){
 		harrow.addClass('east');
 		console.log('east');
 		x = nepx.x - arrowsize - w;
 	}else{
 		console.log('center');
 		x = position.x;
 	}
 	
 	console.log(nepx.y,position.y);
 	if(nepx.y > position.y - arrowsize){
 		console.log('north');
 		varrow.addClass('north');
 		y = nepx.y + arrowsize;
 		this.post.hide();
 	}else if(swpx.y < position.y + h + arrowsize){
 		console.log('south');
 		varrow.addClass('south');
 		y = swpx.y - arrowsize - h; 
 		this.post.show();
 	}else{
 		console.log('middle');
 		y = position.y;
 		this.post.show();
 	}
 	
 	div.css({
 		left:x,
 		top:y
 	});
 	
}



MapLay = function(elem){
	var myOptions = {
	        zoom: 17,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	
	this.elem = $(elem);
	this.map = new google.maps.Map(this.elem.get(0),myOptions);
	this.getGeoLocation();
};

MapLay.prototype = {
	getGeoLocation:function(){
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position){
			self.locate(
				position.coords.latitude,
				position.coords.longitude
			);
		},function(){
			self.geoFetchError.apply(self,arguments);
		});
	},
	add:function(user,post,latlng){
		var myLatlng = new google.maps.LatLng(latlng[0],latlng[1]);
		
		var avataricon = new AvatarLay(user,post,myLatlng,this.map);
		/*
		var marker = new google.maps.Marker({
            position: myLatlng,
            icon:user.avatar,
            title:"Hello World!"
        });
        */
       // console.log(marker.getIcon,marker.getTitle);
      //  marker.setMap(this.map);
	},
	// a simple way to add post marker from ajax callback data
	addpost:function(msg){
		var user = msg.user,
			post = msg.post;
			latlng = post.latlng.split(',');
			
		mapLay.add(user,post,latlng);
	},
	locate:function(lat,lng){
		var	center = new google.maps.LatLng(lat,lng);
			
	    this.latlng = [lat,lng];
	    this.map.setCenter(center)
	},
	geoFetchError:function(){
		alert('can\'t get your location, plz try later');
	}

}



})()
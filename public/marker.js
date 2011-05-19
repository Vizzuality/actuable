
function HomeMarker(latlng, map) {
  this.latlng_ = latlng;
  this.map_ = map;
  this.offsetVertical_ = -27;
  this.offsetHorizontal_ = -27;
  this.height_ = 55;
  this.width_ = 55;
  this.position = latlng;
  this.setMap(map);
}

HomeMarker.prototype = new google.maps.OverlayView();

HomeMarker.prototype.remove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

HomeMarker.prototype.draw = function() {
  // Creates the element if it doesn't exist already.
  this.createElement();
  if (!this.div_) return;

  // Calculate the DIV coordinates of two opposite corners of our bounds to
  // get the size and position of our Bar
  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
  if (!pixPosition) return;

  // Now position our DIV based on the DIV coordinates of our bounds
  this.div_.style.width = this.width_ + "px";
  this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
  this.div_.style.height = this.height_ + "px";
  this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
	
  this.div_.style.display = 'block';
};

HomeMarker.prototype.createElement = function() {
  var panes = this.getPanes();
  var div = this.div_;
  if (!div) {
//			var image = '/gbif_marker.png';
			var image = '/flickr_marker.png';
//			var image = '/user_marker.png';
    
    div = this.div_ = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
    div.style.width = "55px";
    div.style.height = "55px";
    div.style.opacity = "1";
    
    var bkg = document.createElement("div");
    bkg.style.border = "0px none";
    bkg.style.position = "absolute";
    bkg.style.top = "50%";
    bkg.style.left = "50%";
    bkg.style.margin = "0";
    bkg.style.background = "#ff0000";
    $(bkg).css('-webkit-border-radius','25px');
    $(bkg).css('border-radius','25px');
    $(bkg).css('-moz-border-radius','25px');
    bkg.style.width = "0";
    bkg.style.height = "0";
    bkg.style.opacity = "0";
    this.bkg_ = bkg;
    div.appendChild(bkg);

    var inner = document.createElement("div");
    inner.style.border = "0px none";
    inner.style.position = "absolute";
    inner.style.zIndex = "100";
    inner.style.top = "50%";
    inner.style.left = "50%";
    inner.style.margin = "0";
    $(inner).css('-webkit-border-radius','5px');
    $(inner).css('border-radius','5px');
    $(inner).css('-moz-border-radius','5px');
    inner.style.background = "url('"+image+"') no-repeat center center";
    inner.style.width = "0";
    inner.style.height = "0";
    inner.style.opacity = "0";
    div.appendChild(inner);

    
    $(bkg).animate({
      opacity: 0.1,
      width: '55px',
      height: '55px',
      marginTop:-27,
      marginLeft:-27
    }, 500, function(){});
    
    $(inner).animate({
      opacity: 1,
      width: '25px',
      height: '25px',
      marginTop:-12,
      marginLeft:-12
    }, 500);
    
    

    panes.floatPane.appendChild(div);

    
		
  } else if (div.parentNode != panes.floatPane) {
    // The panes have changed.  Move the div.
    div.parentNode.removeChild(div);
    panes.floatPane.appendChild(div);
  }
}

HomeMarker.prototype.getPosition = function() {
    return this.latlng;
};


HomeMarker.prototype.grow = function(size) {
  var factor = (size/100.0);
 
  $(this.bkg_).animate({
    opacity: 0.1 + factor,
    width: '55px',
    height: '55px',
    marginTop:-27,
    marginLeft:-27
  }, 500);  
  
  
    //   opacity: 0.5,
    //   width: 55 + size*2 + 'px',
    //   height: 55 + size*2 + 'px',
    //   marginTop:-27 - size*2,
    //   marginLeft:-27 - size*2
    // }
    

  
  // $(this.bkg_).animate({
  //   opacity: 0.5,
  //   width: 55 + size*2 + 'px',
  //   height: 55 + size*2 + 'px',
  //   marginTop:-27 - size*2,
  //   marginLeft:-27 - size*2
  // }, 500, function(){
  //   $(bkg).animate({
  //     opacity: 0.5,
  //     width: 55 + size + 'px',
  //     height: 55 + size + 'px',
  //     marginTop:-27 - size,
  //     marginLeft:-27 - size
  //   }, 500);
  // });

};
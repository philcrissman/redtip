// -----------------------------------------------------------------------------------

//
//	Additional methods for Element added by SU, Couloir
//	- further additions by Lokesh Dhakar (huddletogether.com)
//  
// Object.extend(Element, {
//  getWidth: function(element) {
//      element = $(element);
//      return element.offsetWidth; 
//  },
//  setWidth: function(element,w) {
//      element = $(element);
//      element.style.width = w +"px";
//  },
//  setHeight: function(element,h) {
//        element = $(element);
//      element.style.height = h +"px";
//  },
//  setTop: function(element,t) {
//      element = $(element);
//      element.style.top = t +"px";
//  },
//  setLeft: function(element,t) {
//      element = $(element);
//      element.style.left = t + "px";
//  },
//  setSrc: function(element,src) {
//      element = $(element);
//      element.src = src; 
//  },
//  setHref: function(element,href) {
//      element = $(element);
//      element.href = href; 
//  },
//  setInnerHTML: function(element,content) {
//    element = $(element);
//    element.innerHTML = content;
//  }
// });

var RedTip = {
  
  showTip: function(id, clicked)
  {
    var options = Object.extend({
      offsetTop: 25,
      offsetLeft: 0,
      width: 400
    }, arguments[2] || { });
    this.setUpBoxes();
    var objOverlay = $('RT_overlay');
    objOverlay.onclick = function() { RedTip.close(); return false; }
    new Effect.Appear('RT_window', {duration: 0.5, queue: 'end'});
    $(id).addClassName("redtip_contents");
    this.cloneWindowContentsForTip(id, clicked);
    this.clonePositionForTip(id, clicked, {setWidth: false, setHeight: false, offsetTop: options.offsetTop, offsetLeft: options.offsetLeft, width: options.width });
    $(id).insert('<div class="RT_close"><a href="#" onclick="RedTip.close(); return false;"><img src="/images/closelabel.gif" /></a></div>', {position: top});
  },
  
  setUpBoxes: function() {
    var inside_redtip = '<div id="RT_window" style="display:none;"></div><div id="RT_overlay" style="display: none;"></div>';
    if ($('RT_redtip'))
    {
      Element.update('RT_redtip', "");
      new Insertion.Top($('RT_redtip'), inside_redtip);  
    }
    else
    {
      new Insertion.Top(document.body, '<div id="RT_redtip">' +  inside_redtip + '</div>');      
    }
    this.setOverlaySize();
    new Effect.Appear('RT_overlay', {to: 0.2, queue: 'end'});
    // this.hideSelectBoxes();
  },
  
  showDropDown: function(id, clicked)
  {
    var options = Object.extend({
      offsetTop: 20,
      offsetLeft: 0,
      width: 120
    }, arguments[2] || { });
    this.setUpDropDown();
    var objOverlay = $('RT_overlay');
    objOverlay.onclick = function() { RedTip.close(); return false; }
    new Effect.Appear('RT_window', {duration: 0.3, queue: 'end'});
    $(id).addClassName("redtip_dropdown");
    this.cloneWindowContentsForTip(id, clicked);
    this.clonePositionForTip(id, clicked, {setWidth: false, setHeight: false, offsetTop: options.offsetTop, offsetLeft: options.offsetLeft, width: options.width});
  },
  
  setUpDropDown: function()
  {
    var inside_redtip = '<div id="RT_window" style="display:none;"></div><div id="RT_overlay" style="display: none;"></div>';
    if ($('RT_redtip'))
    {
      Element.update('RT_redtip', "");
      new Insertion.Top($('RT_redtip'), inside_redtip);  
    }
    else
    {
      new Insertion.Top(document.body, '<div id="RT_redtip">' +  inside_redtip + '</div>');      
    }
    this.setOverlaySize();
    new Effect.Appear('RT_overlay', {duration: 0.4, to: 0.2, queue: 'end'});
  },
  
  
  showOverlay: function()
  {
    if ($('RT_redbox'))
    {
      Element.update('RT_redbox', "");
      new Insertion.Top($('RT_redbox'), '<div id="RT_window" style="display: none;"></div><div id="RT_overlay" style="display: none;"></div>');  
    }
    else
    {
      new Insertion.Bottom(document.body, '<div id="RT_redbox" align="center"><div id="RT_window" style="display: none;"></div><div id="RT_overlay" style="display: none;"></div></div>');      
    }
    new Insertion.Top('RT_overlay', '<div id="RT_loading" style="display: none"></div>');  

    this.setOverlaySize();
    new Effect.Appear('RT_overlay', {duration: 0.4, to: 0.6, queue: 'end'});
  },

  setOverlaySize: function()
  {
    if (window.innerHeight && window.scrollMaxY)
    {  
      yScroll = window.innerHeight + window.scrollMaxY;
    } 
    else if (document.body.scrollHeight > document.body.offsetHeight)
    { // all but Explorer Mac
      yScroll = document.body.scrollHeight;
    }
    else
    { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      yScroll = document.body.offsetHeight;
    }
    $("RT_overlay").style['height'] = yScroll +"px";
  },
  
  // Based on the prototype method
  clonePositionForTip: function(element, source) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0,
      width:      120
    }, arguments[2] || { });

    // find page position of source
    source = $(source);
    var p = source.viewportOffset();

    // find coordinate system to use
    element = $(element);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(element, 'position') == 'absolute') {
      parent = element.getOffsetParent();
      delta = parent.viewportOffset();
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }
    
    // checks if the box will spill off the page; if it will, correct the offsetLeft
    var pageSize = this.getPageSize();
    if(options.offsetLeft == 0){
      l = p[0] - delta[0];
      if ((l + 450) > pageSize[2]) {
        options.offsetLeft = (pageSize[2] - (l + 450));
      }
    }
    
    // set position
    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if (options.setWidth) {
      element.style.width = source.offsetWidth + 'px';
    } else {
      element.style.width = options.width + 'px';
    }
    if (options.setHeight) element.style.height = source.offsetHeight + 'px';
    return element;
  },

  close: function()
  {
    new Effect.Fade('RT_window', {duration: 0.5});
    new Effect.Fade('RT_overlay', {duration: 0.4});
    // this.showSelectBoxes();
  },

  // getPageSize()
  // Returns array with page width, height and window width, height
  // Stolen by from lightbox.js, by Lokesh Dhakar - http://www.huddletogether.com
  // Core code from - quirksmode.com
  // Edit for Firefox by pHaez
  //
  getPageSize: function() {
    
       var xScroll, yScroll;
    
       if (window.innerHeight && window.scrollMaxY) {  
         xScroll = window.innerWidth + window.scrollMaxX;
         yScroll = window.innerHeight + window.scrollMaxY;
       } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
         xScroll = document.body.scrollWidth;
         yScroll = document.body.scrollHeight;
       } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
         xScroll = document.body.offsetWidth;
         yScroll = document.body.offsetHeight;
       }
    
       var windowWidth, windowHeight;

      // console.log(self.innerWidth);
      // console.log(document.documentElement.clientWidth);
      
      if (self.innerHeight) {  // all except Explorer
       if(document.documentElement.clientWidth){
         windowWidth = document.documentElement.clientWidth; 
       } else {
         windowWidth = self.innerWidth;
       }
       windowHeight = self.innerHeight;
      } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
       windowWidth = document.documentElement.clientWidth;
       windowHeight = document.documentElement.clientHeight;
      } else if (document.body) { // other Explorers
       windowWidth = document.body.clientWidth;
       windowHeight = document.body.clientHeight;
      }  

      // for small pages with total height less then height of the viewport
      if(yScroll < windowHeight){
            pageHeight = windowHeight;
          } else { 
            pageHeight = yScroll;
          }

      // console.log("xScroll " + xScroll)
      // console.log("windowWidth " + windowWidth)

      // for small pages with total width less then width of the viewport
      if(xScroll < windowWidth){ 
            pageWidth = xScroll;    
          } else {
            pageWidth = windowWidth;
          }
      // console.log("pageWidth " + pageWidth)

      arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
         return arrayPageSize;
        },
      
  cloneWindowContentsForTip: function(id, clicked)
  {
    var content = $(id).cloneNode(true);
    content.style['display'] = 'block';
    // content.style['background'] = '#fff';
    $('RT_window').appendChild(content);
    //this.setWindowPositions();
  },
  
  hideSelectBoxes: function()
  {
  	selects = document.getElementsByTagName("select");
  	for (i = 0; i != selects.length; i++) {
  		selects[i].style.visibility = "hidden";
  	}
  },

  showSelectBoxes: function()
  {
  	selects = document.getElementsByTagName("select");
  	for (i = 0; i != selects.length; i++) {
  		selects[i].style.visibility = "visible";
  	}
  },
  
  cloneWindowContentsForDropDown: function(id, clicked)
  {
    this.cloneWindowContentsForTip(id, clicked);
  },
  
  clonePositionForDropDown: function(id, clicked)
  {
    this.clonePositionForTip(id, clicked);
  }
}
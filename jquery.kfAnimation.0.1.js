/**
 * jquery-keyframeAnimation.js v0.1.0
 *
 * Copyright (c) 2011 hako584
 * Dual licensed under the MIT or GPL Version 3 licenses
 */



(function($){
    
    // Vender prifix define
    var VENDER_PREFIX = (function() {
        var ua = navigator.userAgent;
        if (ua.indexOf('Opera') != -1) {
            return 'O';
        } else if (ua.indexOf('MSIE') != -1) {
            return 'ms';
        } else if (ua.indexOf('WebKit') != -1) {
            return 'webkit';
        } else if (navigator.product == 'Gecko') {
            return 'Moz';
        } else {
            return '';
        }
    })();
    
    // Crate style node
    var animStyleNode = $('<style>').attr('type','text/css');
    $("head").append(animStyleNode);



  // Extend jQuery function
  $.fn.keyframe = function(){
    // exit if no options
    if (arguments.length == 0) return this;
    // Store reference to self
    var _ = this,
        args = Array.prototype.slice.call(arguments),
        // List of keyframes
        anim = args[0],
        // Capture easing option
        default_easing = args[1] || 'ease',
        // Stores object keys in numerical order
        keys = [], key_len,
        // Unique animation name
        keyframeAnimName = 'keyframe' + (new Date() - 0),
        // Animation duration
        duration,
        // Css style after animation
        resultStyle = {};
    
    // Grap all the object key names
    for (var k in anim)
      keys.push(
        // Allow use of 'start' instead of 0
        (k == 'start') ? 0 : parseInt(k)
      );
    // Sort the object's key names in numerical ascending order
    keys.sort( function(a,b){
      return (a < b)? -1 : 1;
    } );
    
    anim[0] = anim[0] || anim['start'];
    duration = keys[keys.length - 1];
    
    resultStyle.extend = function(object) {
        for (property in object) { this[property] = object[property]; }
        return this;
    }
    
    var toKeyframe = function (obj){
        var css = '';
        for(var k in obj)css += k + ':' + obj[k]  +';';
        resultStyle.extend(obj);
        return css;
    }
    var cssKeyFrame = '';
    for(var i=0; i<keys.length; i++){
        cssKeyFrame += (keys[i]/duration)*100 + '%{ ' + toKeyframe(anim[keys[i]])  +'} ';
    }
    
    animStyleNode.text(animStyleNode.text() + '@-' + VENDER_PREFIX + '-keyframes ' + keyframeAnimName + ' {'+
    cssKeyFrame +
    '}' + '\n');
    _.css(VENDER_PREFIX + 'Animation-name' , '"' + keyframeAnimName + '"');
    _.css(VENDER_PREFIX + 'Animation-duration' , duration/1000 + 's');
    _.css(VENDER_PREFIX + 'Animation-timing-function' , default_easing);
    _.css(VENDER_PREFIX + 'Animation-iteration-count' , ' 1');
    
    // If start animation is not defined, need to use default style on animation starting.
    if(anim[0])_.css(resultStyle);
    else setTimeout(function(){_.css(resultStyle);},10);
    
    
    
    return this
  };
})(jQuery);
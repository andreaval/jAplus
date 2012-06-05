/*!
 * JQuery A+ (jAplus) plugin
 * Version 0.1.0
 * @requires jQuery v1.2.3 or later
 *
 * Developed and maintanined by andreaval, andrea.vallorani@gmail.com
 * Copyright (c) 2012 Andrea Vallorani
 * Source repository: https://github.com/andreaval/jAplus
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */ 

;(function($, undefined) {

	$.fn.Aplus = function(options){
	
	    var settings = $.extend({
	    	popup : {width:400,height:400,scrollbars:0,toolbar:0},
            confirm : 'Are you sure you want to open the link?'
	    },options);
	    
        var elements=(this.is('a')) ? this : this.find('a');
        
	    elements.click(function(e){
	    	var a=$(this);
            var classes=a.attr('class').split(" ");
            if(a.hasClass('confirm')){
                if(!confirm(settings.confirm)) return false;
            }
	    	if(a.hasClass('blank')){
                a.attr('target','_blank');
                return true;
	    	}
	    	if(a.hasClass('parent')){
                a.attr('target','_parent');
                return true;
	    	}
	    	if(a.hasClass('frame')){
				for(var i=0,len=classes.length;i<len;i++){
					if (/^frame-/.test(classes[i])){
                        a.attr('target',classes[i].substr(6));
                        return true;
					}
				}
	    	}
            if(a.hasClass('popup')){
                e.preventDefault();
                var options='';
                $.each(settings.popup,function(i,v){
                    options+=','+i+'='+v;
                });
                options=options.substr(1);
                var win=window.open(a.attr('href'),'popup',options);
                return false;
            }
            return true;
	    });
        
	};
})(jQuery);
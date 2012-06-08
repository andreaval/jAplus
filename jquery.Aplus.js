/*!
 * JQuery A+ (jAplus) plugin
 * Version 0.2.0
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
            win: {width:400,height:400,scrollbars:0,toolbar:0},
            confirm: 'Are you sure you want to open the link?',
            confirmType: false
        },options);

        var elements=(this.is('a')) ? this : this.find('a[class]');
        
        elements.filter('.confirm[title]').each(function(){
            var e=$(this);
            e.data('confirm',e.attr('title'));
            e.removeAttr('title');
        });

        elements.click(function(e){
            var a=$(this);
            var before=a.classPre('before');
            if(before){
                if($.isFunction(eval(before))){
                    if(window[before](a)===false) return false;
                } 
                else{
                    alert('function "'+before+'" not found!');
                    return false;
                } 
            } 
            if(a.hasClass('confirm')){
                var msg=settings.confirm;
                if(a.data('confirm')) msg=a.data('confirm');
                
                if(!settings.confirmType){
                    if(!confirm(msg)) return false;
                }
                else if(settings.confirmType=='custom'){
                    confirm(msg,function(){
                        window.location.replace(a.attr('href'));
                    });
                    return false;
                }
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
                a.attr('target',a.classPre('frame'));
                return true;
            }
            if(a.hasClass('win')){
                e.preventDefault();
                var options='';
                var aSett=$.extend(settings.win,a.classPre('win',1));
                if(a.hasClass('win-fullpage')){
                    aSett.width=$(window).width();
                    aSett.height=$(window).height();
                    delete aSett.fullpage;
                }
                else{
                    aSett.width=Math.min(aSett.width,$(window).width());
                    aSett.height=Math.min(aSett.height,$(window).height());
                }
                if(a.hasClass('win-center')){
                    aSett.left = ($(window).width()/2)-(aSett.width/2);
                    aSett.top = ($(window).height()/2)-(aSett.height/2);
                    delete aSett.center;
                }
                $.each(aSett,function(i,v){
                    options+=','+i+'='+v;
                });
                options=options.substr(1);
                window.open(a.attr('href'),'win',options);
                return false;
            }
            return true;
        });
    };
    $.fn.classPre = function(prefix,all){
        var classes=this.attr('class').split(' ');
        prefix+='-';
        var l=prefix.toString().length;
        var value=(all) ? {} : false;
        $.each(classes,function(i,v){
            if(v.slice(0,l)==prefix){
                if(all){
                    var t = v.slice(l).split('-',2);
                    if(t[1]==null) t[1]='1';
                    value[t[0]]=t[1];
                } 
                else{
                    value = v.slice(l);
                    return;
                }
            } 
        });
        return value;
    };
})(jQuery);
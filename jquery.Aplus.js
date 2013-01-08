/*!
 * JQuery A+ (Aplus) plugin
 * Version 0.6.0pre
 * @requires jQuery v1.3.2 or later
 *
 * Developed and maintanined by andreaval, andrea.vallorani@gmail.com
 * Copyright (c) 2012 Andrea Vallorani
 * Source repository: https://github.com/andreaval/jAplus
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
    "use strict";
    $.Aplus_version = '0.6.0pre';
    $.fn.Aplus = function(options){
        //console.time('Aplus loading');
        var settings = $.extend({
            prefix: '',
            win: {width:400,height:400,scrollbars:0,toolbar:0},
            confirm: 'Are you sure you want to open the link?',
            confirmType: false,
            disabledMsg: 'alert',
            scroll: {speed:300,offsetY:0},
            notify: {life:10,type:null},
            dialog: {}
        },options);
        
        var x=settings.prefix;
        var elements=(this.is('a')) ? this : this.find('a[class]');
        
        elements.filter('.'+x+'confirm,.'+x+'dialog,.'+x+'disabled').each(function(){
            if($(this).is('[title]')){
                var e=$(this);
                e.data('title',e.attr('title')).removeAttr('title');
            }
        });

        function Aplus_parser(e){
            var a=$(this);
            if(a.hasClass(x+'disabled')){
               if(a.data('title') && settings.disabledMsg=='alert') alert(a.data('title'));
               return false; 
            }
            if(a.hasClass(x+'print')){
                window.setTimeout(window.print,0);
                return false;
            }
            if(a.classPre(x+'before')){
                var before=a.classPre(x+'before');
                if($.isFunction(eval(before))){
                    if(window[before](a)===false) return false;
                }
                else{
                    alert('function "'+before+'" not found!');
                    return false;
                }
            }
            if(!a.is('[href]')) return;
            var url=a.attr('href');
            var confirmed=a.data('confirmed');
            if(confirmed) a.data('confirmed',false);
            else if(a.hasClass(x+'confirm')){
                var msg=settings.confirm;
                var mask=a.classPre(x+'confirm-mask');
                if(!mask){
                    if(IsAnchor(url)) mask=url;
                    else if(a.data('title') && IsAnchor(a.data('title'))){
                        mask=a.data('title');
                    }
                }
                else mask='#'+mask;
                if(mask && $(mask).length){
                    msg=$(mask).html();
                    if(a.data('title')){
                       msg=msg.replace(/\[title\]/g,a.data('title'));
                    }
                    msg=msg.replace(/\[href]/g,url);
                    msg=msg.replace(/\[text]/g,a.text());
                }
                else if(a.data('title')) msg=a.data('title');
                
                if(settings.confirmType!=false){
                    switch(settings.confirmType){
                        case 'dialog':
                            if(!jQuery.ui) return false;
                            $("<div/>").html(msg).dialog({
                                modal:true,
                                resizable:false,
                                buttons:{
                                    Ok:function(){
                                        if($(this).children('form').length==0){
                                            a.data('confirmed',true).click();
                                        }
                                        else $(this).children('form').submit();
                                        $(this).dialog("close");
                                    },
                                    Cancel:function(){
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        break;
                        default:
                            var f=null;
                            eval('f='+settings.confirmType);
                            f.call(a,msg,function(){
                                 if($(mask+' form').length) $('form',this).submit();
                                 else a.data('confirmed',true).click();
                            });
                     }
                 }
                 else if(confirm(msg)) return a.data('confirmed',true).triggerHandler('click');
                 return false;
            }
            if(a.hasClass(x+'dialog')){
            	if(jQuery.ui){
                    var options=$.extend({},settings.dialog,a.classPre(x+'dialog',1));
                    if(!IsAnchor(url)){
                        var frame;
                        if(a.hasClass(x+'dialog-ajax')){
                            frame=$('<div></div>');
                            frame.load(url);
                        }
                        else{
                            frame=$('<iframe src="'+url+'" style="padding:0;"></iframe>');
                            options.open=function(e,ui){
                                frame.css('width',$(this).parent().width());
                            };
                        }
                        options.dragStart=options.resizeStart=function(e,ui){
                            frame.hide();
                        };
                        options.dragStop=options.resizeStop=function(e,ui){
                            frame.show();
                        };
                        url=frame;
                    }
                    else url=$(url);
                    if(a.data('title')) options.title=a.data('title');
                    
                    var wP=$(window).width();
                    var hP=$(window).height();
                    if(a.hasClass(x+'dialog-full')){
                        options.width=wP-15;
                        options.height=hP;
                        options.position = [3,3];
                        if(options.draggable==undefined) options.draggable=false;
                    }
                    else{
                        if(options.w) options.width = options.w;
                        if(options.h) options.height = options.h;
                        if(options.l && options.t) options.position = [options.l,options.t];
                        if(options.width){
                            var w=options.width;
                            if(w.toString().charAt(w.length-1)=='p'){
                                w=parseInt(w)*(wP/100);
                            }
                            options.width=Math.min(w,wP);
                        }
                        if(options.height){
                            var h=options.height;
                            if(h.toString().charAt(h.length-1)=='p'){
                                h=parseInt(h)*(hP/100);
                            }
                            options.height=Math.min(h,hP);
                        }
                    }
                    url.dialog(options);
            	}
            	else alert('jqueryUI required!');
            	return false;
            }
            else if(a.hasClass(x+'win')){
                e.preventDefault();
                var options='';
                var aSett=$.extend({},settings.win,a.classPre(x+'win',1));
                var wP=$(window).width();
                var hP=$(window).height();
                if(a.hasClass(x+'win-fullpage')){
                    aSett.width=wP;
                    aSett.height=hP;
                    delete aSett.fullpage;
                }
                else{
                    var w=aSett.width;
                    var h=aSett.height;
                    if(w.toString().charAt(w.length-1)=='p'){
                        w=parseInt(w)*(wP/100);
                    }
                    if(h.toString().charAt(h.length-1)=='p'){
                        h=parseInt(h)*(hP/100);
                    }
                    aSett.width=Math.min(w,wP);
                    aSett.height=Math.min(h,hP);
                }
                if(a.hasClass(x+'win-center')){
                    aSett.left = (wP/2)-(aSett.width/2);
                    aSett.top = (hP/2)-(aSett.height/2);
                    delete aSett.center;
                }
                $.each(aSett,function(i,v){
                    options+=','+i+'='+v;
                });
                options=options.substr(1);
                window.open(url,'win',options);
                return false;
            }
            else if(a.hasClass(x+'scroll')){
                if(!IsAnchor(url)) return false;
                var scroll=$.extend({},settings.scroll,a.classPre(x+'scroll',1));
                $('html,body').animate({scrollTop:$(url).offset().top+scroll.offsetY},scroll.speed);
                return false;
            }
            else if(a.hasClass(x+'notify')){
                if(IsAnchor(url)) return false;
                $.get(url,function(response){
                    var options=$.extend({},settings.notify,a.classPre(x+'notify',1));
                    switch(options.type){
                        case 'jGrowl':
                            if($.jGrowl){
                                var conf={};
                                if(options.life) conf['life']=options.life*1000;
                                else conf['sticky']=true;
                                $.jGrowl(response,conf);
                                break;
                            }
                        case 'growlUI':
                            if($.growlUI){
                                var life = (options.life) ? options.life*1000 : undefined;
                                $.growlUI('',response,life);
                                break;
                            }
                        default: alert(response);
                    }
                });
                return false;
            }
            else if(!IsAnchor(url)){
                var target=null;
                if(a.hasClass(x+'blank')) target='_blank';
                else if(a.hasClass(x+'parent')) target='_parent';
                else if(a.hasClass(x+'frame')) target=a.classPre('frame');
                else if(a.hasClass(x+'self') || confirmed) target='_self';
                if(target){
                    window.open(url,target);
                    return false;
                } 
            }
        };
        elements.unbind('click',$.fn.Aplus.Aplus_parser).click(Aplus_parser);
        //console.timeEnd('Aplus loading');
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
                    if(t[1]==null) t[1]=1;
                    else if(IsNumeric(t[1])) t[1]=parseInt(t[1]);
                    else if(t[1]=='true') t[1]=true;
                    else if(t[1]=='false') t[1]=false;
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
    function IsNumeric(input){
        return (input - 0) == input && input.length > 0;
    };
    function IsAnchor(url){
        return (url.toString().charAt(0)=='#') ? true : false;
    }
})(jQuery);
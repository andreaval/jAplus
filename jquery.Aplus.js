/*!
 * JQuery A+ (jAplus) plugin
 * Version 0.4.0b1
 * @requires jQuery v1.3.2 or later
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
            prefix: '',
            win: {width:400,height:400,scrollbars:0,toolbar:0},
            confirm: 'Are you sure you want to open the link?',
            confirmType: false
        },options);

        var elements=(this.is('a')) ? this : this.find('a[class]');
        var x=settings.prefix;
        
        elements.filter('.'+x+'confirm[title],.'+x+'dialog[title]').each(function(){
            var e=$(this);
            e.data('title',e.attr('title'));
            e.removeAttr('title');
        });

        elements.unbind('click').click(function(e){
            var a=$(this);
            var before=a.classPre(x+'before');
            if(before){
                if($.isFunction(eval(before))){
                    if(window[before](a)===false) return false;
                }
                else{
                    alert('function "'+before+'" not found!');
                    return false;
                }
            }
            if(a.hasClass(x+'confirm')){
                var msg=settings.confirm;
                var mask=a.classPre(x+'confirm-mask');
                if(!mask){
                    if(a.attr('href').charAt(0)=='#') mask=a.attr('href');
                    else if(a.data('title') && a.data('title').charAt(0)=='#'){
                        mask=a.data('title');
                    } 
                }
                else mask='#'+mask;
                if(mask){
                    msg=$(mask).html();
                    if(a.data('title')){
                       msg=msg.replace(/\[title\]/g,a.data('title'));
                    } 
                    msg=msg.replace(/\[href]/g,a.attr('href')); 
                    msg=msg.replace(/\[text]/g,a.text()); 
                }
                else if(a.data('title')) msg=a.data('title');
                
                switch(settings.confirmType){
                    case 'dialog': $("<div></div>").html(msg).dialog({   
                                        modal:true,
                                        resizable:false,
                                        buttons:{
                                            Ok:function(){
                                                if($(this).children('form').length==0){
                                                    $(this).wrapInner('<form action="'+a.attr('href')+'" method="get"></form>');
                                                }
                                                $(this).dialog("close");
                                                $(this).children('form').submit();
                                            },
                                            Cancel:function(){
                                                $(this).dialog("close");
                                            }
                                        }
                                    });
                                    return false;
                    break;
                    case 'custom': confirm(msg,function(){
                                        if($(msg).is('form') && $(msg).attr('id')){
                                            $('#'+$(msg).attr('id')).submit();
                                        }
                                        else window.location = a.attr('href');
                                });
                                return false;
                    break;
                    default: if(!confirm(msg)) return false;
                }
            }
            if(a.hasClass(x+'blank')){
                a.attr('target','_blank');
                return true;
            }
            if(a.hasClass(x+'parent')){
                a.attr('target','_parent');
                return true;
            }
            if(a.hasClass(x+'frame')){
                a.attr('target',a.classPre('frame'));
                return true;
            }
            if(a.hasClass(x+'dialog')){
            	if(jQuery.ui){
                    var options=a.classPre(x+'dialog',1);
                    var url=a.attr('href');
                    if(url.toString().charAt(0)!='#'){
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
            	else alert('class dialog required jqueryUI');
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
})(jQuery);
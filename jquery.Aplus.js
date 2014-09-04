/*!
 * JQuery A+ plugin
 * Version 0.8.4
 * @requires jQuery v1.5.0 or later
 *
 * Copyright (c) 2012-2014 Andrea Vallorani, andrea.vallorani@gmail.com
 * Released under the MIT license
 */
(function (factory) {
    if( typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else{
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function($) {
    /*jshint debug:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, unused:true, browser:true, devel:true, jquery:true, indent:4*/
    $.fn.Aplus = function(options){
        var IsAnchor = function(url){
            return (url && url.toString().charAt(0)==='#') ? true : false;
        };
        var HideTitle = function(el){
            el=$(el.target);
            if(el.is('[title]') && el.is('.'+x+'confirm,.'+x+'dialog,.'+x+'disabled')){
                el.data('title',el.attr('title')).removeAttr('title');
            }
        };
        var GetTitle = function(el){
            if(el.data('title')) return el.data('title');
            else if(el.is('[title]')) return el.attr('title');
            else return null;
        };
        options = $.extend(true,{
            prefix: '',
            win: {width:400,height:400,scrollbars:0,toolbar:0,check:true},
            confirm: 'Are you sure you want to open the link?',
            confirmType: false,
            disabledMsg: 'alert',
            scroll: {speed:300,offsetY:0},
            notify: {life:10,type:null},
            dialog: {dialogClass:'htmlplus-dialog'},
            ajax: {loadMsg:'<img src="loader.gif" />'}
        },options);
        var x=options.prefix;
        this.each(function(){
            var $this = $(this);
            if(!$this.is('a')){
                $this.delegate('a[class]','click',parser);
                $this.delegate('a[class]','mouseenter',HideTitle);
            }
            else if($this.is('[class]')){
                HideTitle(this);
                $this.click(parser);
            }
        });
        function parser(e){
            var a=$(this);
            if(a.hasClass(x+'disabled')){
                if(GetTitle(a) && options.disabledMsg==='alert') alert(GetTitle(a));
                return false;
            }
            if(a.hasClass(x+'print')){
                window.setTimeout(window.print,0);
                return false;
            }
            if(!a.is('[href]')) return;
            var url=a.attr('href');
            var confirmed=a.data('confirmed');
            if(confirmed) a.data('confirmed',false);
            else if(a.hasClass(x+'confirm')){
                var msg=options.confirm;
                var mask=a.classPre(x+'confirm-mask');
                if(!mask){
                    if(IsAnchor(url)) mask=url;
                    else if(IsAnchor(GetTitle(a))) mask=GetTitle(a);
                }
                else mask='#'+mask;
                if(mask && $(mask).length){
                    msg=$(mask).html();
                    if(GetTitle(a)){
                        msg=msg.replace(/\[title\]/g,GetTitle(a));
                    }
                    msg=msg.replace(/\[href]/g,url);
                    msg=msg.replace(/\[text]/g,a.text());
                }
                else if(GetTitle(a)) msg=GetTitle(a);

                if(options.confirmType!==false){
                    switch(options.confirmType){
                    case 'dialog':
                        if(!jQuery.ui) return false;
                        $("<div/>").html(msg).dialog({
                            modal:true,
                            resizable:false,
                            dialogClass:'htmlplus-dialog',
                            buttons:{
                                Ok:function(){
                                    if($(this).children('form').length===0){
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
                        if(typeof options.confirmType==='function'){
                            options.confirmType(a,msg,function(){
                                if($(mask+' form').length) $('form',this).submit();
                                 else a.data('confirmed',true).click();
                            });
                        }
                    }
                }
                else if(confirm(msg)){
                    a.unbind('click',parser).click(parser).data('confirmed',true);
                    return (a.triggerHandler('click')) ? true : false;
                }
                return false;
            }
            if(a.hasClass('ajax')){
                var ajaxSett=$.extend({},options.ajax,a.classPre(x+'ajax',1));
                if(typeof(ajaxSett.to)!=='undefined' && ajaxSett.to){
                    if(typeof(a.attr('id'))==='undefined') a.attr('id',(new Date()).getTime());
                    var aId = a.attr('id');
                    ajaxSett.to = '#'+ajaxSett.to;
                    ajaxSett.from = (typeof(ajaxSett.from)==='undefined' || !ajaxSett.from) ? null : '#'+ajaxSett.from;
                    var to=$(ajaxSett.to);
                    var localCache=to.children('div[data-rel="'+aId+'"]');
                    var toH=to.height();
                    var lastVis = to.children(':visible');
                    to.children().hide();
                    if(localCache.length){
                        localCache.show();
                    }
                    else{
                        var container=$('<div data-rel="'+aId+'" />');
                        container.html('<div class="loader" style="text-align:center;line-height:'+toH+'px;">'+ajaxSett.loadMsg+'</div>').appendTo(to);
                        $.ajax({url:url,dataType:'html'}).done(function(data){
                            data = $('<div>'+data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '')+'</div>');
                            if(ajaxSett.from){
                                var search = data.find(ajaxSett.from);
                                if(search.length){
                                    container.html(search.html());
                                    if(lastVis.is(':not(div[data-rel])')) lastVis.remove();
                                }
                                else{
                                    lastVis.show();
                                    container.remove();
                                    a.trigger("ajaxMismatch.aplus",{response:data.html()});
                                }
                            }
                            else container.html(data.html());
                            to.trigger("ajaxToComplete.aplus",{obj:container});
                            a.trigger("ajaxComplete.aplus",{response:data.html()});
                        }).fail(function(tS,eT){
                            lastVis.show();
                            container.remove();
                            a.trigger("ajaxError.aplus",{textStatus:tS,errorThrown:eT});
                        });
                    }
                }
                else{
                    $.ajax({url:url,dataType:'html'}).done(function(data){
                        a.trigger("ajaxComplete.aplus",{response:data});
                    }).fail(function(tS,eT){
                        a.trigger("ajaxError.aplus",{textStatus:tS,errorThrown:eT});
                    });
                }
                return false;
            }
            else if(a.hasClass(x+'dialog')){
                if(jQuery.ui){
                    var dSett=$.extend({},options.dialog,a.classPre(x+'dialog',1));
                    if(!IsAnchor(url)){
                        var frame;
                        if(a.hasClass(x+'dialog-ajax')){
                            frame=$('<div></div>');
                            frame.load(url);
                        }
                        else{
                            frame=$('<iframe src="'+url+'" style="padding:0;"></iframe>');
                            dSett.open=function(){
                                frame.css('width',$(this).parent().width());
                            };
                        }
                        dSett.dragStart=dSett.resizeStart=function(){
                            frame.hide();
                        };
                        dSett.dragStop=dSett.resizeStop=function(){
                            frame.show();
                        };
                        url=frame;
                    }
                    else url=$(url);
                    if(GetTitle(a)) dSett.title=GetTitle(a);

                    var wP=$(window).width();
                    var hP=$(window).height();
                    if(dSett.full){
                        dSett.width=wP-15;
                        dSett.height=hP;
                        dSett.position = [3,3];
                        if(typeof dSett.draggable==='undefined') dSett.draggable=false;
                    }
                    else{
                        if(dSett.w) dSett.width = dSett.w;
                        if(dSett.h) dSett.height = dSett.h;
                        if(dSett.l && dSett.t) dSett.position = [dSett.l,dSett.t];
                        if(dSett.width){
                            var w=dSett.width;
                            if(w.toString().charAt(w.length-1)==='p'){
                                w=parseInt(w,10)*(wP/100);
                            }
                            dSett.width=Math.min(w,wP);
                        }
                        if(dSett.height){
                            var h=dSett.height;
                            if(h.toString().charAt(h.length-1)==='p'){
                                h=parseInt(h,10)*(hP/100);
                            }
                            dSett.height=Math.min(h,hP);
                        }
                    }
                    url.dialog(dSett);
                }
                else alert('jqueryUI required!');
                return false;
            }
            else if(a.hasClass(x+'win')){
                e.preventDefault();
                if(!a.data('win-id')){
                    a.data('win-id','win_'+((a.is('[id]')) ? a.attr('id') : new Date().getTime()));
                }
                var winID=a.data('win-id');
                var wSett='';
                var aSett=$.extend({},options.win,a.classPre(x+'win',1));
                if(aSett.check) a.addClass(x+'disabled');
                var wPage=$(window).width();
                var hPage=$(window).height();
                if(aSett.fullpage){
                    aSett.width=wPage;
                    aSett.height=hPage;
                    delete aSett.fullpage;
                }
                else if(aSett.fullscreen){
                    aSett.width=screen.width;
                    aSett.height=screen.height;
                    delete aSett.fullscreen;
                }
                else{
                    var winW=aSett.width;
                    var winH=aSett.height;
                    if(winW.toString().charAt(winW.length-1)==='p'){
                        winW=parseInt(winW,10)*(wPage/100);
                    }
                    if(winH.toString().charAt(winH.length-1)==='p'){
                        winH=parseInt(winH,10)*(hPage/100);
                    }
                    aSett.width=Math.min(winW,wPage);
                    aSett.height=Math.min(winH,hPage);
                    if(aSett.center){
                        var screenX, screenY;
                        if(navigator.userAgent.match(/msie/i)){
                            screenX=window.screenLeft;
                            screenY=window.screenTop;
                        }
                        else{
                            screenX=window.screenX;
                            screenY=window.screenY;
                        }
                        aSett.left = (wPage/2)-(aSett.width/2)+screenX;
                        aSett.top = (hPage/2)-(aSett.height/2)+screenY;
                        delete aSett.center;
                    }
                }
                $.each(aSett,function(i,v){
                    wSett+=','+i+'='+v;
                });
                wSett=wSett.substr(1);
                var myWin=window.open('',winID,wSett);
                if(myWin.location.href==='about:blank'){
                    myWin.location.href = url;
                }
                myWin.focus();
                $(myWin.document).ready(function(){
                    if(aSett.check) a.removeClass(x+'disabled');
                });
                return false;
            }
            else if(a.hasClass(x+'scroll')){
                if(!IsAnchor(url)) return true;
                var scroll=$.extend({},options.scroll,a.classPre(x+'scroll',1));
                $('html,body').animate({scrollTop:$(url).offset().top+scroll.offsetY},scroll.speed);
                return false;
            }
            else if(a.hasClass(x+'notify')){
                if(IsAnchor(url)) return false;
                $.get(url,function(response){
                    var nSett=$.extend({},options.notify,a.classPre(x+'notify',1));
                    switch(nSett.type){
                    case 'jGrowl':
                        if($.jGrowl){
                            var conf={};
                            if(nSett.life) conf.life=nSett.life*1000;
                            else conf.sticky=true;
                            $.jGrowl(response,conf);
                        }
                        break;
                    case 'growlUI':
                        if($.growlUI){
                            var life = (nSett.life) ? nSett.life*1000 : undefined;
                            $.growlUI('',response,life);
                        }
                        break;
                    default: 
                        alert(response);
                    }
                });
                return false;
            }
            else if(!IsAnchor(url)){
                var target=null;
                if(a.hasClass(x+'blank')) target='_blank';
                else if(a.hasClass(x+'parent')) target='_parent';
                else if(a.classPre(x+'frame')) target=a.classPre(x+'frame');
                else if(a.hasClass(x+'self') || confirmed) target='_self';
                if(target){
                    window.open(url,target);
                    return false;
                } 
            }
        }
    };
    $.fn.classPre = function(prefix,all){
        var classes=this.attr('class').split(' ');
        prefix+='-';
        var l=prefix.toString().length;
        var value=(all) ? {} : false;
        $.each(classes,function(i,v){
            if(v.slice(0,l)===prefix){
                if(all){
                    var t = v.slice(l).split('-',2);
                    if(typeof t[1]==='undefined' || t[1]===null) t[1]=1;
                    else if(!isNaN(t[1])) t[1]=parseInt(t[1],10);
                    else if(t[1]==='true') t[1]=true;
                    else if(t[1]==='false') t[1]=false;
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
}));
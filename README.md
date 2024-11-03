# jQuery A+

A jQuery plugin to improve HTML &lt;A&gt; tag.

It is an unobtrusive script that adds useful features to 'A' tags allowing webpages to maintain compatibility with HTML/XHTML standards.

Is JavaScript disabled? No problem, the links will continue to work in the traditional way!

## Some basic examples

Ask for confirmation before opening a link
```html
<a href="demo/ok21.htm" class="confirm">Click Me</a>
```
Retrieve the URL content via ajax and display it in a dialog
```html
<a href="demo/ok21.htm" class="dialog-ajax" >Click Me</a>
```
Open a popup centered window
```html
<a href="demo/ok31.htm" class="win-center">Click Me</a>
```
Open link in a new window/tab
```html
<a href="demo/ok11.htm" class="blank">Click Me</a>
```

## Complet examples  list
https://japlus.vallorani.org/demo.html

## Changelog

**0.9.0** (cooming soon)

* jA+ can now create "dialog" also using HTML5 &lt;dialog&gt; tag (using same classes of jQueryUI dialog)
* jQuery 3.7+ full compatibility
* Added control to avoid duplicated instance of jAplus in same object
* Add: class **confirm-ui**
* Add: class **confirm-html5**
* Add: class **slide**
* Add: option **dialogType**
* Add: option **dialogCloseIcon**
* Mod: dialog.dialogClass has new default value: 'aplus-dialog'
* Mod: ajax.loadMsg has new default value: 'loading...'

**0.8.4** (2014-09-04)

* Fix: class confirm in conjunction with other classes may not work properly

**0.8.3** (2014-07-08)

* Fix: the method HideTitle doesn't hide the title attribute correctly

**0.8.2** (2014-06-30)

* Fix: error on ajax request when ajax-to param is empty
* Add: event **ajaxComplete.aplus**
* Add: event **ajaxError.aplus**
* Add: event **ajaxMismatch.aplus**

**0.8.1** (2014-06-26)

* Fix: attribute title is not hidden in the tags loaded via ajax

**0.8.0** (2014-06-24)

* Improved loading script up to 2x
* A+ works now for <A> tags loaded via ajax
* Added control to avoid multiple clicks while loading the popup (class **win**)
* Add: event **ajaxToComplete.aplus**
* Add: option **win.check**

**0.7.1** (2014-03-12)

* Add Package Manifest for JQuery Plugin Registry
* Removed unused option 

**0.7.0** (2014-03-11)

* Add: class **ajax**
* Add: class **ajax-to-**_value_
* Add: class **ajax-from-**_value_
* Fix: **win** class (don't assign correct name)
* Fix: **win-center** class (The pop-up window was not centered correctly if the browser was not in fullscreen mode)
* Remove: class **before-**_value_
* Make JSHint friendly
* Add AMD support

**0.6.0** (2013-02-01)

* Add: dialog options
* Add: class **win-fullscreen**
* Mod: no unbind('click') required to recall jAplus() on same objects
* Mod: optimize code

**0.5.1** (2012-12-03)

* Fix: A tag without href generates a script error

**0.5.0** (2012-10-16)

* Mod: improved performance
* Add: class **self**
* Add: class **notify**
* Add: class **notify-life**
* Add: class **notify-type**
* Add: option **notify.life**
* Add: option **notify.type**

**0.4.2** (2012-09-21)

* Fix: classes 'confirm blank' in conjuction with customType option don't work

**0.4.1** (2012-08-10)

* Fix: dialog class don't works

**0.4.0** (2012-07-31)

* Add: support for the prefixes
* Add: class **disabled**
* Add: class **print**
* Add: class **scroll**
* Add: option **disabledMsg**
* Add: option **scroll.speed**
* Add: option **scroll.offsetY**

**0.3.0** (2012-07-06)

* Add: class **before-**_functionName_
* Add: class **confirm-mask-**_element_id_
* Add: class **dialog** 
* Add: class **dialog-ajax**
* Add: class **dialog-full**
* Add: class **dialog-modal**
* Add: class **dialog-w-**_value_
* Add: class **dialog-h-**_value_
* Add: class **dialog-l-**_value_
* Add: class **dialog-t-**_value_
* Add: class **dialog-**_option-value_
* Add: support for the **title** attribute in conjuction with class dialog
* Add: support to percent values for **win-width-** and **win-height-** classes
* Add: mask support

**0.2.0** (2012-06-08)

* Add: support for the **title** attribute in conjuction with class confirm
* Add: class **win-center**
* Add: class **win-fullpage**
* Add: class **win-width-**_value_
* Add: class **win-height-**_value_
* Add: class **win-top-**_value_
* Add: class **win-left-**_value_
* Add: class **win-scrollbars**
* Add: class **win-toolbar**
* Add: class **before-**_value_
* Add: option **confirmType**
* Mod: rename class **popup** -> **win** 

**0.1.0** (2012-06-05)
First version

## TO-DO
- [ ] slide-ajax class

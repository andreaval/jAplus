jQuery A+
=========

A jQuery plugin to improve HTML &lt;A&gt; tag.

It is an unobtrusive script that adds useful features to 'A' tags allowing webpages to maintain compatibility with HTML standards.
The script syntax is compatible with all HTML / XHTML standards.

**For example, you can open link in a new window/tab (like target="_blank") without invalidating the HTML code.**

Is JavaScript disabled? No problem, the links will continue to work in the traditional way!

Website
-----------------------
http://japlus.simplit.it

Changelog
---------

**0.8.0** (2014-06-24)

* Improved loading script up to 2x
* A+ also works for A tags loaded via ajax
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

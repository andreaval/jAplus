jQuery A+
=========

*A jQuery plugin to improve HTML <**A**> tag*. 

It is an unobtrusive script that adds useful features to 'A' tags allowing webpages to maintain compatibility with HTML standards.
The script syntax is compatible with all HTML / XHTML standards (HTML 4.01, XHTML 1.0, HTML 5, etc.)

This plugin requires jQuery 1.2.3 and above to work. It has been tested on Internet Explorer 6/7/8, Firefox, Safari, Opera, and Chrome.

Dual licensed under the MIT and GPL licenses.

Installation
------------
Include script after the jQuery library:
     
    <script src="/path/to/jquery.Aplus.js"></script>

Run the script:
    
    $(function(){
       $('body').Aplus();
    });

Example
-------
Opens link in a new window or tab:

    <a href="index.htm" class="blank"></a>

Opens the link after the user confirms:

    <a href="index.htm" class="confirm" title="confirm your choice?"></a>

Opens the link in a centered window:

    <a href="index.htm" class="win win-center"></a>

Supported attributes and values
-------------------------------

* **class** attribute
	* __blank__ - Opens the linked document in a new window or tab
	* __confirm__ - Opens the linked document only after user confirmation (It may also be used in conjunction with one of the other values)
	* __frame__ - Opens the linked document in a named frame
		* __frame-__*framename* - Name of the frame where the link is open
	* __parent__ - Opens the linked document in the parent frame
	* __win__ - Opens the linked document in a new window popup
		* __win-center__ - Center window in the page
		* __win-fullpage__ - Same size of the page
		* __win-width-__*value* - Window width (in pixels)
		* __win-height-__*value* - Window height (in pixels)
		* __win-left-__*value* - The left position of the window (in pixels)
		* __win-top-__*value* - The top position of the window (in pixels)
		* __win-scrollbars__ - Show the window scrollbars
		* __win-toolbar__ - Show the window toolbar
	* __before-__*functionName* - Invokes the function before opening the link. (If return value===FALSE link does not open)

* **title** attribute
	* _message_ - text of the confirmation dialog (only used in conjunction with confirm class)

Options to run the script
-------------------------

name _type_ _default value_ Description

* win.width _int_ _400_ Window width
* win.height _int_ _400_ Window height
* win.scrollbars _int_ _0_ 1=Show scrollbars, 0=Hide scrolllbars
* win.toolbar _int_ _0_ 1=Show browser toolbar, 0=Hide toolbar
* win.left _int_ _0_ The left position of the window
* win.top _int_ _0_ The top position of the window
* confirm _string_ _'Are you sure you want to open the link?'_ Default confirm message
* confirmType _string] _''_ _empty_=normal confirm() function, custom=if the confirm function has been overridden

ToDo
----
* add support for the **dialog** value. It opens jqueryUI dialog or blockUI dialog

Changelog
---------
**0.2.0** (2012-06-08)

* Add support for the **title** attribute in conjuction with class confirm
* Renamed class **popup** -> **win** 
* Added value **win-center**
* Added value **win-fullpage**
* Added value **win-width-**_value_
* Added value **win-height-**_value_
* Added value **win-top-**_value_
* Added value **win-left-**_value_
* Added value **win-scrollbars**
* Added value **win-toolbar**
* Added value **before-**_value_
* Added option **confirmType**

**0.1.0** (2012-06-05)
First version
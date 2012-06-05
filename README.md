jQuery A+
=========

*A jQuery plugin to improve HTML <**A**> tag*. 

It is an unobtrusive script that adds useful features to 'A' tags allowing webpages to maintain compatibility with HTML standards.
The script is compatible with all HTML / XHTML standards (HTML 4.01, XHTML 1.0, HTML 5, etc.)

This plugin requires jQuery 1.2.3 and above to work. It has been tested on Internet Explorer 6/7/8, Firefox, Safari, Opera, and Chrome.

Dual licensed under the MIT and GPL licenses.

Installation
------------
Include script after the jQuery library:
```<script src="/path/to/jquery.Aplus.js"></script>```

Run the script:
```$(function(){
   $('body').Aplus();
});```

Example
-------
Opens link in a new window or tab:
```<a href="index.htm" class="blank"></a>```


Supported attributes and values
-------------------------------

-- **class** attribute

*Supported values:*

* __blank__ - Opens the linked document in a new window or tab
* __confirm__ - Opens the linked document only after user confirmation (It may also be used in conjunction with one of the other values)
* __frame__ - Opens the linked document in a named frame (Use the value **frame-**_framename_ to set the frame name)
* __parent__ - Opens the linked document in the parent frame
* __popup__ - Opens the linked document in a new window popup

Options to run the script
-------------------------
```$('body').Aplus({
    //popup params
    popup:{ width: 400, height: 400, scrollbars:0, toolbar:0, left: 0,top: 0 }
    //confirm message
    confirm: 'Are you sure you want to open the link?'
});```

ToDo
----
* customizing of the confirm message using the TITLE attribute
* add **dialog** to supported values. It opens jqueryUI dialog or blockUI dialog

Changelog
---------
v **0.1.0** (2012-06-05) - First version
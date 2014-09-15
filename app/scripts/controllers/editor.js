'use strict';

/**
 * @ngdoc function
 * @name blognihonioApp.controller:EditorCtrl
 * @description
 * # EditorCtrl
 * Controller of the blognihonioApp
 */
angular.module('blognihonioApp')
  .controller('EditorCtrl', function ($scope, EditorTool) {
  	window.$(".liveeditor").focus();
  	window.$(".liveeditor").focusout(function(){window.$(".liveeditor").focus});

  	//Load in the different functions
  	var functions = ['bold', 'italic','underline','unorderedlist','orderedlist','image','container']
  	for (var i = functions.length - 1; i >= 0; i--) {
  		var name = functions[i];
  		$scope[name] = EditorTool[name];
  	};

  	$scope.save = function(){
  		console.log(window.$(".liveeditor").html());
  	}
  })
  .factory('EditorTool', function(){

  	var EditorTool = function(){

  	};

	EditorTool.prototype.pasteHtmlAtCaret = function(html, selectPastedContent) {
		window.$(".liveeditor").focus();
    	var sel, range;
    	if (window.getSelection) {
    	    // IE9 and non-IE
    	    sel = window.getSelection();
    	    if (sel.getRangeAt && sel.rangeCount) {
    	        range = sel.getRangeAt(0);
    	        range.deleteContents();
	
    	        // Range.createContextualFragment() would be useful here but is
    	        // only relatively recently standardized and is not supported in
    	        // some browsers (IE9, for one)
    	        var el = document.createElement("div");
    	        el.innerHTML = html;
    	        var frag = document.createDocumentFragment(), node, lastNode;
    	        while ( (node = el.firstChild) ) {
    	            lastNode = frag.appendChild(node);
    	        }
    	        var firstNode = frag.firstChild;
    	        range.insertNode(frag);
	
    	        // Preserve the selection
    	        if (lastNode) {
    	            range = range.cloneRange();
    	            range.setStartAfter(lastNode);
    	            if (selectPastedContent) {
    	                range.setStartBefore(firstNode);
    	            } else {
    	                range.collapse(true);
    	            }
    	            sel.removeAllRanges();
    	            sel.addRange(range);
    	        }
    	    }
    	} else if ( (sel = document.selection) && sel.type != "Control") {
    	    // IE < 9
    	    var originalRange = sel.createRange();
    	    originalRange.collapse(true);
    	    sel.createRange().pasteHTML(html);
    	    if (selectPastedContent) {
    	        range = sel.createRange();
    	        range.setEndPoint("StartToStart", originalRange);
    	        range.select();
    	    }
    	}
	}

	EditorTool.prototype.getSelectionStart = function() {
	   var node = document.getSelection().anchorNode;
	   return (node.nodeType == 3 ? node.parentNode : node);
	}

	EditorTool.prototype.replaceSelectedText = function(replacementText) {
	    var sel, range;
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.rangeCount) {
	            range = sel.getRangeAt(0);
	            range.deleteContents();
	            range.insertNode(document.createTextNode(replacementText));
	        }
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        range.text = replacementText;
	    }
	}

	EditorTool.prototype.getSelectionHtml = function() {
	    var html = "";
	    if (typeof window.getSelection != "undefined") {
	        var sel = window.getSelection();
	        if (sel.rangeCount) {
	            var container = document.createElement("div");
	            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
	                container.appendChild(sel.getRangeAt(i).cloneContents());
	            }
	            html = container.innerHTML;
	        }
	    } else if (typeof document.selection != "undefined") {
	        if (document.selection.type == "Text") {
	            html = document.selection.createRange().htmlText;
	        }
	    }
	    return html;
	}

	EditorTool.prototype.doTextStyle = function(element, cssclass){
		var sel = window.getSelection();
		var cssclass = (cssclass) ? " class='"+cssclass+"'" : "";
		if (sel.getRangeAt(0).endOffset > 0) {
			var html = EditorTool.prototype.getSelectionHtml();
			EditorTool.prototype.pasteHtmlAtCaret("<"+element+cssclass+">"+html+"</"+element+">");
		} else {
			EditorTool.prototype.pasteHtmlAtCaret("<"+element+cssclass+">Text</"+element+">",true);
		}
	}

	EditorTool.prototype.bold = function(){
		EditorTool.prototype.doTextStyle("b");
	}

	EditorTool.prototype.italic = function(){
		EditorTool.prototype.doTextStyle("i");
	}

	EditorTool.prototype.underline = function(){
		EditorTool.prototype.doTextStyle("u");
	}

	EditorTool.prototype.image = function(){
		EditorTool.prototype.pasteHtmlAtCaret("</div></div><div class='blogframe'></div><div class='container'>",true);
	}

	EditorTool.prototype.container = function(){
		EditorTool.prototype.doTextStyle("div", "container");
	}

	EditorTool.prototype.unorderedlist = function(){
		var sel = window.getSelection();
		if (sel.getRangeAt(0).endOffset > 0) {
			var html = EditorTool.prototype.getSelectionHtml();
			EditorTool.prototype.pasteHtmlAtCaret("<ul><li>"+html+"</li></ul>");
		} else {
			EditorTool.prototype.pasteHtmlAtCaret("<ul><li>Item 1</li></ul>",true);
		}	
	}

	EditorTool.prototype.orderedlist = function(){
		var sel = window.getSelection();
		if (sel.getRangeAt(0).endOffset > 0) {
			var html = EditorTool.prototype.getSelectionHtml();
			EditorTool.prototype.pasteHtmlAtCaret("<ol><li>"+html+"</li></ol>");
		} else {
			EditorTool.prototype.pasteHtmlAtCaret("<ol><li>Item 1</li></ol>",true);
		}	
	}

	return new EditorTool();
  });

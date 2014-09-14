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
  	$scope.bold = EditorTool.bold;
  	$scope.italic = EditorTool.italic;
  	$scope.underline = EditorTool.underline;
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

	EditorTool.prototype.doTextStyle = function(element){
		var sel = window.getSelection();
		if (sel.getRangeAt(0).endOffset > 0) {
			var html = EditorTool.prototype.getSelectionHtml();
			EditorTool.prototype.pasteHtmlAtCaret("<"+element+">"+html+"</"+element+">");
		} else {
			EditorTool.prototype.pasteHtmlAtCaret("<"+element+">Text</"+element+">",true);
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

	return new EditorTool();
  });

"use strict";

var scriptLoader={scripts:[],progress:{pending:0,loaded:0,callBack:null},onLoaded:null,pageLoaded:!1,setup:function(){this.addEvent();return this},add:function(a,b){var c={src:a.src||"",type:a.type||"",async:a.async||!1,defer:a.async||!1===a.defer?!1:!0,callBack:a.callBack||"",status:"not-loaded"},d=this.scripts;"undefined"!==typeof b?"first"===b?d.unshift(c):isNaN(b)?d.push(c):d.splice(b,0,c):d.push(c);this.progress.pending++;!0===this.pageLoaded&&this.createScript(c);return this},showProgress:function(a,
b,c){return function(d){b.textContent=Math.round(d)+"%";a.style.width=d+"%";100<=d&&(document.body.classList.add("loaded"),b.classList.add("complete"),c())}},updateProgress:function(){var a=this.progress;a=Math.floor(a.loaded/a.pending*100);var b=this.progress.callBack;"function"===typeof b&&b(a);if(100<=a&&"function"===typeof this.onLoaded)this.onLoaded()},remove:function(a){for(var b=this.scripts,c=0;c<b.length;c++)b[c].src===a&&this.scripts.splice(c,1);return this},createScript:function(a){if(a&&
"object"===typeof a){var b=document,c=b.createElement("script");c.async=!0===a.async?!0:!1;c.defer=!0===a.defer?!0:!1;var d=this;c.onload=function(){d.progress.loaded++;d.updateProgress();a.status="loaded";"function"===typeof a.callBack&&a.callBack()};c.src=a.src;b.getElementsByTagName("head")[0].appendChild(c)}return this},loadScripts:function(){for(var a=this.scripts,b=0,c=a.length;b<c;b++)this.createScript(a[b])},addEvent:function(){var a=this,b=function(){a.pageLoaded=!0;a.loadScripts()};"function"===
typeof window.addEventListener?window.addEventListener("load",b,!1):window.attachEvent("onload",b);return this}}.setup();
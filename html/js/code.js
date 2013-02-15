
addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
		var formText = document.getElementsByTagName('textarea')[0];
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type == 'text' && theInput.className.match("cc")) {  
            /* Add event handlers */          
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);
            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }

		addEvent(formText, 'focus', clearDefaultText, false);
		addEvent(formText, 'blur', replaceDefaultText, false);
		if (formText.value != '') {
				formText.defaultText = formText.value;
		}
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
				target.style.color = "Black";
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
		target.style.color = "gray";
    }
}

function addEvent(obj, type, fn){
    if (obj.addEventListener)
        obj.addEventListener(type, fn, false);
    else if (obj.attachEvent)
    {
        obj["e"+type+fn] = fn;
        obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
        obj.attachEvent("on"+type, obj[type+fn]);
    }
}
function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

function calcBounty(e){
  e = window.event || e;
	e = e.charCode || e.keyCode;
	var curInfo = document.getElementsByName('infoa')[0];
	var curBounty = document.getElementsByName('money')[0];
	var tmp = curInfo.value;
  var score=0;
	var tt = curBounty.innerHTML.replace(",","");
  if(e==8 || e==46){
	  tmp = tmp.substring(0,tmp.length-1);
	  tmp = toUnicode(tmp);
  	for(i=0; i<tmp.length; i++){
  		score += tmp.charCodeAt(i)*512;
  	}
  }else if(e>=35 && e<=40){
	  tmp = toUnicode(tmp);
  	for(i=0; i<tmp.length; i++){
  		score += tmp.charCodeAt(i)*512;
  	}
  }else{
		tmp += String.fromCharCode(e);
		tmp = toUnicode(tmp);
		for(i=0; i<tmp.length; i++){
			score += tmp.charCodeAt(i)*512;
		}
  }
	curBounty.innerHTML = number_format(score);
	
}
function number_format (number, decimals, dec_point, thousands_sep) {
// Formats a number with grouped thousands
//
// version: 906.1806
// discuss at: http://phpjs.org/functions/number_format
// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +     bugfix by: Michael White (http://getsprink.com)
// +     bugfix by: Benjamin Lupton
// +     bugfix by: Allan Jensen (http://www.winternet.no)
// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
// +     bugfix by: Howard Yeend
// +    revised by: Luke Smith (http://lucassmith.name)
// +     bugfix by: Diogo Resende
// +     bugfix by: Rival
// +     input by: Kheang Hok Chin (http://www.distantia.ca/)
// +     improved by: davook
// +     improved by: Brett Zamir (http://brett-zamir.me)
// +     input by: Jay Klehr
// +     improved by: Brett Zamir (http://brett-zamir.me)
// +     input by: Amir Habibi (http://www.residence-mixte.com/)
// +     bugfix by: Brett Zamir (http://brett-zamir.me)
// *     example 1: number_format(1234.56);
// *     returns 1: '1,235'
// *     example 2: number_format(1234.56, 2, ',', ' ');
// *     returns 2: '1 234,56'
// *     example 3: number_format(1234.5678, 2, '.', '');
// *     returns 3: '1234.57'
// *     example 4: number_format(67, 2, ',', '.');
// *     returns 4: '67,00'
// *     example 5: number_format(1000);
// *     returns 5: '1,000'
// *     example 6: number_format(67.311, 2);
// *     returns 6: '67.31'
// *     example 7: number_format(1000.55, 1);
// *     returns 7: '1,000.6'
// *     example 8: number_format(67000, 5, ',', '.');
// *     returns 8: '67.000,00000'
// *     example 9: number_format(0.9, 0);
// *     returns 9: '1'
// *     example 10: number_format('1.20', 2);
// *     returns 10: '1.20'
// *     example 11: number_format('1.20', 4);
// *     returns 11: '1.2000'
// *     example 12: number_format('1.2000', 3);
// *     returns 12: '1.200'
var n = number, prec = decimals;

var toFixedFix = function (n,prec) {
    var k = Math.pow(10,prec);
    return (Math.round(n*k)/k).toString();
};

n = !isFinite(+n) ? 0 : +n;
prec = !isFinite(+prec) ? 0 : Math.abs(prec);
var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;

var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

var abs = toFixedFix(Math.abs(n), prec);
var _, i;

if (abs >= 1000) {
    _ = abs.split(/\D/);
    i = _[0].length % 3 || 3;

    _[0] = s.slice(0,i + (n < 0)) +
          _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
    s = _.join(dec);
} else {
    s = s.replace('.', dec);
}

var decPos = s.indexOf(dec);
if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
    s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
}
else if (prec >= 1 && decPos === -1) {
    s += dec+new Array(prec).join(0)+'0';
}
return s; }



function mouseOver(){
	document.getElementsByName('arrest')[0].style.background = "transparent";
}

function mouseOut(){
	document.getElementsByName('arrest')[0].style.background = "";
	document.getElementsByName('arrest')[0].style.background = "url('img/gon2.png');";
}


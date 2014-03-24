// Test Alert
//$(document).ready(function(){alert("Main JS Working");});

// Fight the FOUT!
$('html').addClass('nofout');

$(document).ready(function() {
  $('html').show();
});

// Drop Cap
//Grab first character for Drop Caps
$(".big-drop-cap").each(function() {
  var text = $(this).html();
  // RegEx version
  // $(this).html(text.replace(/^([A-Za-z0-9])/g,'<span class="caps">$1</span>'));
  var first = $('<span>'+text.charAt(0)+'</span>').addClass('dropcap');
  $(this).html(text.substring(1)).prepend(first);
});
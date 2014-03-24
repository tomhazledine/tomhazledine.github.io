// Test Alert
//$(document).ready(function(){alert("Main JS Working");});

// Fight the FOUT!
$('html').addClass('nofout');

$(document).ready(function() {
  $('html').show();
});

// Drop Cap
$(".big-drop-cap").each(function() {
  var text = $(this).html();
  // RegEx method: $(this).html(text.replace(/^([A-Za-z0-9])/g,'<span class="caps">$1</span>'));
  
  var first = $('<span>'+text.charAt(0)+'</span>').addClass('dropcap');// Span the 1st character
  var second = $('<span>'+text.charAt(1)+'</span>').addClass('dropcap-run-in');// Span the 2nd character
  $(this).html(text.substring(2)).prepend(first, second);// replace 1st and 2nd chars with new spaned versions
});
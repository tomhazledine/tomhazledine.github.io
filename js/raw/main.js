// Test Alert
//$(document).ready(function(){alert("Main JS Working");});

// Small-screen Nav Menu
$(window).resize(function(){
	if ($('.topNav ul').css("position") == "absolute" ){
		$('.topNav ul').removeClass('down');
	}
});
$(document).ready(function(){
  $('.menuTitle').click(function(){
    $('.topNav ul').toggleClass('down');
  });
});

/*
// Fight the FOUT!
$('html').addClass('nofout');

$(document).ready(function() {
  $('html').show();
});
*/

$(document).ready(function(){

  var targetElement = $('.big-drop-cap'),
      startingText = targetElement.text(),
      closeSpan = '</span>';

      firstLetter = startingText.charAt(0);
      firstLetterClass = firstLetter.toLowerCase();

      openSpanCap = '<span class=\"dropcap ' + firstLetterClass + '\">',
      openSpanRunIn = '</span><span class=\"runIn ' + firstLetterClass + '\">',

      spannedFirstLetter = openSpanCap + firstLetter + openSpanRunIn;
      textShifted = startingText.substr(1,startingText.length);
      cappedText = spannedFirstLetter + textShifted;

      // Make text into array split by spaces
      runInText = cappedText.split(' '),
      // Add end-span as 7th value in array
      runInText.splice(7,0,closeSpan),
      // Re-string
      runInText = runInText.join(' '),
      targetElement.html(runInText);
});

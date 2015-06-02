// 01. Test Alert
// 02. Small-screen Nav Menu
// 03. Fight the FOUT!
// 04. Dropcap and Run-in
// 05. Blockquote Run-in
// 06. Hide nav on scroll
// 07. Showcase Slider

// 01. Test Alert
//$(document).ready(function(){alert("Main JS Working");});

// 02. Small-screen Nav Menu
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


/*/ 03. Fight the FOUT!
$('html').addClass('nofout');

$(document).ready(function() {
  $('html').show();
});
//*/

// 04. Dropcap and Run-in
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
      runInText.splice(9,0,closeSpan),
      // Re-string
      runInText = runInText.join(' '),
      targetElement.html(runInText);
});

// 05. Blockquote Run-in
//*
$(document).ready(function(){
	var targetElement = $('blockquote'),
			startingText = targetElement.text(),
			openSpan = '<p><span class="runIn">'
			closeSpan = '</span>';

	// Make text into array split by spaces
	runInText = startingText.split(' '),
	// Add end-span as 7th value in array
	runInText.splice(0,0,openSpan),
	runInText.splice(9,0,closeSpan),
	// Re-string
	runInText = runInText.join(' '),
	targetElement.html(runInText);

	//targetElement.addClass('test');
});
//*/

// 06. Hide nav on scroll
//*
// Hide Header on on scroll down
// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('header').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();

//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;

//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $('header').removeClass('nav-down').addClass('nav-up');
// 				$('.topNav ul').removeClass('down');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-up').addClass('nav-down');
// 						$('.topNav ul').removeClass('down');
//         }
//     }

//     lastScrollTop = st;
// }
// $(window).resize(function(){
// 	$('header').removeClass('nav-up').addClass('nav-down');
// 	$('.topNav ul').removeClass('down');
// });

//*/

// 07. Showcase Slider
var showcaseSlider = $('.showcaseSlider'),
		showcaseButtons = $('.showcaseControl'),
		desktopButton = $('.showcaseControl.desktop'),
		tabletButton = $('.showcaseControl.tablet'),
		phoneButton = $('.showcaseControl.phone');

function desktopView(){
	showcaseSlider.removeClass('tablet phone').addClass('desktop');
	console.log("desktopView");
}
function tabletView(){
	showcaseSlider.removeClass('desktop phone').addClass('tablet');
	console.log("tabletView");
}
function phoneView(){
	showcaseSlider.removeClass('desktop tablet').addClass('phone');
	console.log("phoneView");
}

$(document).ready(function(){
	desktopButton.click(function(){
		desktopView();
		showcaseButtons.removeClass('selected');
		desktopButton.addClass('selected');
	});
	tabletButton.click(function(){
		tabletView();
		showcaseButtons.removeClass('selected');
		tabletButton.addClass('selected');
	});
	phoneButton.click(function(){
		phoneView();
		showcaseButtons.removeClass('selected');
		phoneButton.addClass('selected');
	});
});

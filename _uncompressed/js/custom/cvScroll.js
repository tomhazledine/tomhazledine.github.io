var cvWrapper = $('.cvWrapper');

var cVdidScroll;
var lastScrollTop = 0;
var delta = 5;

var backToTopButton = $('#backToTop');
var triggerHeight = 100;


setInterval(function() {
    $(window).scroll(function(event){
        cVdidScroll = true;
    });
}, 250);


setInterval(function() {
    if (cVdidScroll && cvWrapper.length) {
        // console.log(cVdidScroll);
        cVhasScrolled();
        cVdidScroll = false;
    }
}, 250);

function cVhasScrolled() {
    // console.log('running hasScrolled');
    var scrollTop = $(this).scrollTop();
    // console.log(scrollTop);

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .tuckedUp.
    // This is necessary so you never see what is "behind" the navbar.
    if (scrollTop > triggerHeight){
        // Scroll Down
        backToTopButton.addClass('visible');
    } else {
        // Scroll Up
        backToTopButton.removeClass('visible');
    }

    lastScrollTop = scrollTop;
}
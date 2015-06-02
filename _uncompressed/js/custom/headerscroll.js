var didScroll;
var lastScrollTop = 0;
var delta = 5;

var header = $('#mainHeader');
var navbarHeight = header.outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var scrollTop = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - scrollTop) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .tuckedUp.
    // This is necessary so you never see what is "behind" the navbar.
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight){
        // Scroll Down
        header.addClass('tuckedUp');
    } else if(scrollTop + $(window).height() < $(document).height()) {
        // Scroll Up
        header.removeClass('tuckedUp');
    }

    lastScrollTop = scrollTop;
}
$(window).resize(function(){
    $('header').removeClass('nav-up').addClass('nav-down');
    $('.topNav ul').removeClass('down');
});
var mainMenuToggle = $('.mainMenuToggle');
var mainMenu = $('.mainMenuWrapper');
var header = $('#mainHeader');

// Get window height
var windowHeight = $(window).height();

mainMenu.height(windowHeight);

mainMenuToggle.on('click',function(){
    button = $(this);
    if (button.hasClass('open')) {
        button.removeClass('open');
        mainMenu.removeClass('open');
        header.removeClass('tuckedUp');
        header.removeClass('mainMenuOpen');
    } else {
        button.addClass('open');
        mainMenu.addClass('open');
        header.addClass('mainMenuOpen');
    }
});
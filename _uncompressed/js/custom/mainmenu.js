var mainMenuToggle = $('.mainMenuToggle');
var mainMenu = $('.mainMenuWrapper');

// Get window height
var windowHeight = $(window).height();

mainMenu.height(windowHeight);

mainMenuToggle.on('click',function(){
    $(this).toggleClass('open');
    mainMenu.toggleClass('open');
});
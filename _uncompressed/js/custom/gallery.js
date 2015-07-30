var galleryToggles = $('.thumbnailMore');
var gallery = $('.fullscreenWrapper');
var galleryClose = $('.fullscreenClose');

galleryToggles.on('click',function openFullscreen(){
    gallery.addClass('open');
});

galleryClose.on('click',function openFullscreen(){
    gallery.removeClass('open');
});

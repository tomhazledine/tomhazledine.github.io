var galleryToggles = $('.thumbnailImage');
var gallery = $('.fullscreenWrapper');
var galleryClose = $('.fullscreenClose');
var galleryWrapper = $('#gallery');

if (galleryToggles.length) {
    galleryWrapper.slick({
        arrows:true,
        prevArrow: $('.nextPrev.prev'),
        nextArrow: $('.nextPrev.next')
    });

    galleryToggles.on('click',function openFullscreen(){
        gallery.addClass('open');
        var target = this.getAttribute("data-selector");
        console.log(target);
        galleryWrapper[0].slick.slickGoTo(parseInt(target));
    });

    galleryClose.on('click',function openFullscreen(){
        gallery.removeClass('open');
    });

    $(document).keyup(function(e){
        if (gallery.hasClass('open')) {
            if (e.keyCode == 27) {
                gallery.removeClass('open');
            }
        }
        // Keybindings for Slick
        if (e.keyCode == 37) {
            galleryWrapper[0].slick.slickPrev();
        } else if (e.keyCode == 39) {
            galleryWrapper[0].slick.slickNext();
        }
    });
}
var elem = document.querySelector('.main-carousel');
var reloadBtn = document.querySelector('.reload-btn');
var progressBar = document.querySelector('.progress-bar');

var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true
});

// vanilla JS
var flkty = new Flickity('.main-carousel', {
    hash: true,
    pageDots: false,
});


//flkty.reloadCells();


flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
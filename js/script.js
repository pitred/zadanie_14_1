var elem = document.querySelector('.main-carousel');
var reloadBtn = document.querySelector('.reload-btn');
var progressBar = document.querySelector('.progress-bar');

var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true,
    hash: true,
    pageDots: false,
});

reloadBtn.addEventListener('click', function () {
    flkty.select(0);
});


flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
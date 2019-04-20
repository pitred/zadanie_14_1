var elem = document.querySelector('.main-carousel');
var reloadBtn = document.querySelector('.reload-btn');
var progressBar = document.querySelector('.progress-bar');

var templateItem = document.getElementById('template-product-item').innerHTML;

Mustache.parse(templateItem);

var listItems = '';

for (var i = 0; i < cellData.length; i++) {
    console.log(cellData);
    listItems += Mustache.render(templateItem, cellData[i]);
}

results.insertAdjacentHTML('beforeend', listItems);


// carusel
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
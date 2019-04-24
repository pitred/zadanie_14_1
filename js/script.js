var elem = document.querySelector('.main-carousel');
var reloadBtn = document.querySelector('.reload-btn');
var progressBar = document.querySelector('.progress-bar');
var templateItem = document.getElementById('template-item').innerHTML;
var infos = document.getElementById('infos');

// Mustache
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

// Google Maps
window.initMap = function () {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: cellData[0].coords
        });

    var marker = [];
    for (var i = 0; i < cellData.length; i++) {
        marker[i] = new google.maps.Marker({
            position: cellData[i].coords,
            map: map
        });
        marker[i].addListener('click', function () {
            infos.innerHTML = 'Marked';
        });
    }
};
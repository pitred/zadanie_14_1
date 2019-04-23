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
    // The location of Uluru
    var uluru = {
        lat: -25.344,
        lng: 131.036
    };
    var coords2 = {
        lat: -25.363,
        lng: 134.044
    };
    var coords3 = {
        lat: -25.363,
        lng: 137.044
    };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
    // The marker, positioned at Uluru
    var markerOne = new google.maps.Marker({
        position: uluru,
        map: map
    });
    markerOne.addListener('click', function () {
        infos.innerHTML = 'Marker One';
    });

    var markerTwo = new google.maps.Marker({
        position: coords2,
        map: map
    });
    markerTwo.addListener('click', function () {
        infos.innerHTML = 'Marker Two';
    });

    var markerThree = new google.maps.Marker({
        position: coords3,
        map: map
    });
    markerThree.addListener('click', function () {
        infos.innerHTML = 'Marker Three';
    });
};
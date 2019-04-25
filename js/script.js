var elem = document.querySelector(".main-carousel");
var reloadBtn = document.querySelector(".reload-btn");
var progressBar = document.querySelector(".progress-bar");
var templateItem = document.getElementById("template-item").innerHTML;
var infos = document.getElementById("infos");

// Mustache
Mustache.parse(templateItem);

var listItems = "";

for (var i = 0; i < cellData.length; i++) {
    console.log(cellData);
    listItems += Mustache.render(templateItem, cellData[i]);
}

results.insertAdjacentHTML("beforeend", listItems);

// Carusel
var flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: true,
    hash: true,
    pageDots: false
});

reloadBtn.addEventListener("click", function () {
    flkty.select(0);
});

flkty.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + "%";
});

// Google Maps
window.initMap = function () {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: cellData[0].coords
    });

    var marker = [];
    for (var i = 0; i < cellData.length; i++) {
        marker[i] = new google.maps.Marker({
            position: cellData[i].coords,
            map: map
        });
        marker[i].addListener("click", markMove(i));
    }

    function markMove(i) {
        return function () {
            flkty.select(i);
        }
    }


    flkty.on('change', function (index) {
        smoothPanAndZoom(map, 7, cellData[index].coords);
    });
};

// Smooth function
var smoothPanAndZoom = function (map, zoom, coords) {

    var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
    jumpZoom = Math.min(jumpZoom, zoom - 1);
    jumpZoom = Math.max(jumpZoom, 3);

    smoothZoom(map, jumpZoom, function () {

        smoothPan(map, coords, function () {
            smoothZoom(map, zoom);
        });
    });
};

var smoothZoom = function (map, zoom, callback) {
    var startingZoom = map.getZoom();
    var steps = Math.abs(startingZoom - zoom);

    if (!steps) {
        if (callback) {
            callback();
        }
        return;
    }

    var stepChange = -(startingZoom - zoom) / steps;

    var i = 0;
    var timer = window.setInterval(function () {
        if (++i >= steps) {
            window.clearInterval(timer);
            if (callback) {
                callback();
            }
        }
        map.setZoom(Math.round(startingZoom + stepChange * i));
    }, 300);
};

var smoothPan = function (map, coords, callback) {
    var mapCenter = map.getCenter();
    coords = new google.maps.LatLng(coords);

    var steps = 12;
    var panStep = {
        lat: (coords.lat() - mapCenter.lat()) / steps,
        lng: (coords.lng() - mapCenter.lng()) / steps
    };

    var i = 0;
    var timer = window.setInterval(function () {
        if (++i >= steps) {
            window.clearInterval(timer);
            if (callback) callback();
        }
        map.panTo({
            lat: mapCenter.lat() + panStep.lat * i,
            lng: mapCenter.lng() + panStep.lng * i
        });
    }, 1000 / 30);
};
/**
 * Created by mprunell on 10/10/13.
 */
$(document).ready(function() {
    loadImages();
    initMap();
    mapButton();
});

function loadImages() {
    $.getJSON( '/images', function(images) {
        startSlideShow(images);
    });
}


function startSlideShow(images) {
    var backgrounds = [];
    $(images).each(function(index, image) {
        backgrounds.push({ src: '/images/' + image, fade: 1000 });
    });
    $.vegas('slideshow', {
        backgrounds: backgrounds
    })('overlay', {
        src:'/javascripts/vegas/overlays/03.png'
    });
}

function mapButton() {
    $('li.map').click(function(e) {
        $('#map-window').reveal({
            animation: 'fadeAndPop',
            animationspeed: 300,
            closeonbackgroundclick: true,
            dismissmodalclass: 'close-reveal-modal'
        });
    });
}

function initMap() {
    map = new OpenLayers.Map('basic-map');
    var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection('EPSG:4326');   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection('EPSG:900913'); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(-56.100311279296875, -34.89177445225364).transform( fromProjection, toProjection);
    var zoom           = 14;

    map.addLayer(mapnik);
    map.setCenter(position, zoom );
}

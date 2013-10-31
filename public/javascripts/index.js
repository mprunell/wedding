/**
 * Created by mprunell on 10/10/13.
 */
$(document).ready(function() {
    loadImages();
    initMap();
    infoButton();
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

function infoButton() {
    $('li.info').click(function(e) {
        $('#info-window').reveal({
            animation: 'fadeAndPop',
            animationspeed: 300,
            closeonbackgroundclick: true,
            dismissmodalclass: 'close-reveal-modal'
        });
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
    map.addLayer(mapnik);
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);

    var lonLat1 = new OpenLayers.LonLat(-56.0999006530762, -34.8913358947754)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );
    var size = new OpenLayers.Size(42,50);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('/javascripts/images/cross.png', size, offset)
    markers.addMarker(new OpenLayers.Marker(lonLat1, icon));
    var popup1 = new OpenLayers.Popup.FramedCloud("Popup",
        lonLat1, null,
        'Michigan 1629', null,
        true // <-- true if we want a close (X) button, false otherwise
    );

    var lonLat2 = new OpenLayers.LonLat(-56.02457, -34.85253)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );
    var size = new OpenLayers.Size(42,50);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('/javascripts/images/party.png', size, offset)
    markers.addMarker(new OpenLayers.Marker(lonLat2, icon));
    var popup2 = new OpenLayers.Popup.FramedCloud("Popup",
        lonLat2, null,
        'Avenida Racine 3080', null,
        true // <-- true if we want a close (X) button, false otherwise
    );

    var fromProjection = new OpenLayers.Projection('EPSG:4326');   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection('EPSG:900913'); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(-56.07010, -34.86914)
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );
    var zoom = 13;
    map.setCenter (position, zoom);
    map.addPopup(popup1);
    map.addPopup(popup2);
}

$(document).ready(function() {
    initMap();
})
function initMap() {
    map = new OpenLayers.Map('map');
    var mapnik         = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection('EPSG:4326');   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection('EPSG:900913'); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(-56.100311279296875, -34.89177445225364).transform( fromProjection, toProjection);
    var zoom           = 15;

    map.addLayer(mapnik);
    map.setCenter(position, zoom );
}

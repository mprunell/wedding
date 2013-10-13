/**
 * Created by mprunell on 10/10/13.
 */
$(document).ready(function() {
    loadImages();
    mapButton();
})

function loadImages() {
    $.getJSON( '/images', function(images) {
        startSlideShow(images);
    });
}

function startSlideShow(images) {
    var backgrounds = [];
    $(images).each(function(index, image) {
        backgrounds.push({ src: '/images/' + image, fade: 1000 })
    });
    $.vegas('slideshow', {
        backgrounds: backgrounds
    })('overlay', {
        src:'/javascripts/vegas/overlays/03.png'
    });
}

function mapButton() {
    $('li.map').click(function(e) {
        e.preventDefault();
        document.location.href = 'map';
    });
}
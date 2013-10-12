$(document).ready(function () {
    $.vegas('slideshow', {
        backgrounds:[
            { src:'/images/lore2.jpg', fade:1000 },
            { src:'/images/lore4.jpg', fade:1000 },
            { src:'/images/lore5.jpg', fade:1000 }
        ]
    })('overlay', {
          src:'/vegas/overlays/03.png'
    });
});

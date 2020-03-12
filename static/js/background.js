let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d'),
    image = new Image();


image.src = 'static/img/ark_map.jpg';
image.onload = function(e) {
    bg_context.drawImage(image, 0, 0);
};

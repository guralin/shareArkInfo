let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d'),
    image = new Image();

let mk_canvas = document.getElementById('marking-layer'),
    mk_context = mk_canvas.getContext('2d');

let mousedown = {};

image.src = 'static/img/ark_map.jpg';
image.onload = function(e) {
    bg_context.drawImage(image, 0, 0);
    createArc();
};

function createArc(x,y){
    mk_context.beginPath();
    mk_context.strokeStyle="rgba(255, 0, 0, 1)";
    mk_context.lineWidth = 2;
    mk_context.arc(x,y,10,0,Math.PI*2,true);
    mk_context.stroke();
}

// javascriptで取ってくるmousebottonの座標は画面左上端からなので、
// canvas上の座標に直す関数
function windowToCanvas(x, y){
    let bbox = bg_canvas.getBoundingClientRect();
    return { x: (x - bbox.left) * (bg_canvas.width / bbox.width),
        y : (y - bbox.top) * (bg_canvas.height / bbox.height)
    };
}

mk_canvas.onmousedown = function(e){
    let loc =windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    createArc(loc.x, loc.y);
};

var host = "ws://localhost:8080/pipe";
var ws = new WebSocket(host);
let mousedown = {};
let mk_canvas = document.getElementById('marking-layer'),
    mk_context = mk_canvas.getContext('2d');

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


ws.onmessage = function(loc){
    var location_list = JSON.parse(loc.data);
    console.log(location_list);
    //createArc(loc.x, loc.y);
    for(let i = 0; i < location_list.length; i++){
        createArc(location_list[i].x, location_list[i].y);
    }
}

mk_canvas.onmousedown = function(e){
    let loc =windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    createArc(loc.x, loc.y);
    ws.send(JSON.stringify(loc));
    
};


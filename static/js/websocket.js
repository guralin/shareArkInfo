var host = "ws://localhost:8080/pipe";
var ws = new WebSocket(host);

ws.onmessage = function(message){
        var message_data = JSON.parse(message.data);
        var time = message_data['time'];
        var message = message_data['message'];

        var string_txt = "[" + time + "] - " + message;
        var message_list = document.getElementById("rcv");
        message_list.innerHTML += "<li>" + string_txt + "</li>";
}

var btn= document.getElementById("sendBtn");
var text_content = document.getElementById("msg");
btn.addEventListener("click", function(){
        message = text_content.value;
        console.log(message);
        ws.send(message);
});


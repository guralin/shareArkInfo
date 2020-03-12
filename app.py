import json
import datetime
import time

from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler

from flask import Flask, request, render_template
app = Flask(__name__)


@app.route('/')
def index():
   return render_template('index.html')


ws_list = set()
#coordinates = 
messages_list = []

@app.route('/pipe')
def pipe():
    if request.environ.get('wsgi.websocket'):
        ws = request.environ['wsgi.websocket']
        ws_list.add(ws)
        while True:
            print("loop start")
            time.sleep(1)
            message = ws.receive()
            if message is None:
                break
            datetime_now = datetime.datetime.now()
            data = {
                'time': str(datetime_now),
                'message': message
            }
            messages_list.append(data)
            remove_list = set()
            for s in ws_list:
                try:
                    s.send(json.dumps(data))
                except Exception:
                    print("多分消えた")
                    remove_list.add(s)
                    return "",200
            for s in remove_list:
                ws_list.remove(s)
            print(messages_list)
        ws_list.remove(ws)
    return "",200
 
 
if __name__ == '__main__':
    app.debug = True
 
    host = 'localhost'
    port = 8080
 
    host_port = (host, port)
    server = WSGIServer(
        host_port,
        app,
        handler_class=WebSocketHandler
    )
    server.serve_forever()

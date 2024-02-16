# script_python.py
import http.server
import socketserver
from http import HTTPStatus
import json
import http.server
import socketserver

PORT = 5502

Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()


class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        with open('/main/bbdd/text/anuncio.txt', 'w') as f:
            f.write(json.dumps(data))

        self.send_response(HTTPStatus.OK)
        self.end_headers()

PORT = 5502

Handler = MyHandler  # Utiliza tu manejador personalizado
with socketserver.TCPServer(("/main/bbdd/text/anuncio.txt", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()

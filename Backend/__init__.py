from flask import Flask

from Backend.API import api

app = Flask(__name__)
api.init_app(app)

if __name__ == '__main__':
    # from waitress import serve
    # serve(app, host="localhost", port=4050)
    app.run(port=4050, debug=True)

#!/usr/bin/env python
from flask import (
    Flask, jsonify, abort, request, render_template, redirect,
    send_from_directory
)
from flask_seasurf import SeaSurf
from config import API_KEY, API_ROUTE
import requests
import json


app = Flask(__name__, static_folder="./static", template_folder="./templates")
app.config.from_object('config')
csrf = SeaSurf(app)


def getAssetSource():
    if app.debug:
        jsSource = "http://127.0.0.1:8080/static/js/bundle.js"
        cssSource = "http://127.0.0.1:8080/static/css/bundle.css"
    else:
        with open("webpack-assets.json", "r") as assetsFile:
            assetsJson = json.load(assetsFile)
        jsSource = assetsJson["main"]["js"]
        cssSource = assetsJson["main"]["css"]
    return jsSource, cssSource


@app.route('/static/<path:path>')
def sendStatic(path):
    return send_from_directory('static', path)


@app.route('/', methods=['GET'])
def index():
    jsSource, cssSource = getAssetSource()
    return render_template('index.html', cssSource=cssSource)


@app.route('/app', defaults={'path': ''})
@app.route('/app/<path:path>', methods=['GET'])
def webapp(path):
    jsSource, cssSource = getAssetSource()
    return render_template('app.html', jsSource=jsSource, cssSource=cssSource)


@app.route('/contact', methods=['GET'])
def contact():
    jsSource, cssSource = getAssetSource()
    return render_template('app.html', jsSource=jsSource, cssSource=cssSource)


@app.route('/contributors', methods=['GET'])
def contributors():
    jsSource, cssSource = getAssetSource()
    return render_template('app.html', jsSource=jsSource, cssSource=cssSource)


@app.route('/thanks', methods=['GET'])
def thanks():
    jsSource, cssSource = getAssetSource()
    return render_template('app.html', jsSource=jsSource, cssSource=cssSource)


@app.route('/download', methods=['GET'])
def download():
    return redirect(
        "https://play.google.com/store/apps/details?id=com.mmmoussa.iqra",
        code=302
    )


@app.route('/search', methods=['POST'])
def getSearchResult():
    if not request.json:
        abort(400)
    reqJSON = request.json
    reqJSON['apikey'] = API_KEY
    res = requests.post(API_ROUTE + '/api/v3.0/search', json=reqJSON)
    return jsonify(res.json())


@app.route('/translations', methods=['POST'])
def updateTranslations():
    if not request.json:
        abort(400)
    reqJSON = request.json
    reqJSON['apikey'] = API_KEY
    res = requests.post(API_ROUTE + '/api/v3.0/translations', json=reqJSON)
    return jsonify(res.json())


@app.errorhandler(400)
def badRequest(error):
    jsSource, cssSource = getAssetSource()
    return render_template('error.html', cssSource=cssSource)


@app.errorhandler(404)
def notFound(error):
    jsSource, cssSource = getAssetSource()
    return render_template('error.html', cssSource=cssSource)


if __name__ == '__main__':
    app.run(debug=True, threaded=True)

from textblob import TextBlob
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
feedback = -1


@app.route("/testHealth")
def hello():
    return "Hello from python sentiment analysis flask app!"


@app.route("/analyse/sentiment", methods=['POST'])
def analyse_sentiment():
    sentence = request.get_json()['sentence']
    polarity = TextBlob(sentence).sentences[0].polarity
    global feedback
    feedback = polarity
    return jsonify(
        sentence=sentence,
        polarity=polarity
    )


@app.route("/testComms", methods=['GET'])
def verify_comms_local():
    # print("Hello")
    response = requests.get("http://java:8080/testHealth")
    return response.text


@app.route("/analyse/test", methods=['POST'])
def analyse_test():
    sentence = request.get_json()['sentence']
    polarity = TextBlob(sentence).sentences[0].polarity
    return jsonify(
        sentence=sentence,
        polarity="Connected!"
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

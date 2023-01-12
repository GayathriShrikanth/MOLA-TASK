from urllib import response
from flask import Flask, request
from flask import render_template, jsonify
from langdetect import detect, DetectorFactory
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
DetectorFactory.seed = 0
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello():
    if(request.data):
        json = request.get_json()
        

@app.route('/api/language-detection', methods=['POST'])
@cross_origin()
def detectLanguage():
    if(request.data):
        json = request.get_json()
        for i in range(len(json['list'])):
            if detect(json['list'][i]['tweet_text'])=='en':
                json['list'][i]['is_english'] = 'True'
            else:
                json['list'][i]['is_english'] = 'False' 
        return json          
    else:
        return 'Error'



@app.route('/api/sentiment-score', methods=['POST'])
@cross_origin()
def detectSentiment():
    if(request.data):
        json = request.get_json()
        sentiment = SentimentIntensityAnalyzer()
        for i in range(len(json['list'])):
            json['list'][i]['sentiment_score'] = sentiment.polarity_scores(json['list'][i]['tweet_text'])
            del json['list'][i]['sentiment_score']['compound']
            json['list'][i]['detected_mood'] = max(zip(json['list'][i]['sentiment_score'].values(), json['list'][i]['sentiment_score'].keys()))[1]
            if json['list'][i]['sentiment_score']['pos']>0.2:
                json['list'][i]['detected_mood'] = "pos"
            elif json['list'][i]['sentiment_score']['neg']>0.2:
                json['list'][i]['detected_mood'] = "neg"
        return json
    else:
        return 'Content-Type not supported!'



if __name__ == '__main__':
    # server = Server(app.wsgi_app)
    # server.serve()
    app.run(debug=True)
    
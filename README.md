# MOLA-TASK
Technical Assessment for MOLA LAS USC

Name: Gayathri Shrikanth    
MS in Computer Science   
Graduation: May 2023   
Relevant Coursework taken: Web Technologies (CSCI 571), Applied Natural Language Processing (CSCI 544), Machine Learning (DSCI 552), DeepLearning and its Applications, Artificial Intelligence, Data Structures and Algorithms.

## Technical Assesment Details   
#### How to run the code   
* Upload the Extension folder above to chrome://extensions/.   
* Open https://twitter.com/home.    
* The Detected Mood will appear for every tweet on the timeline within 5 seconds after page loading.   
* Code for the backend can be found in the Backend folder.   
* Links to the deployed API's are as follows   
  1. https://molalabs.uw.r.appspot.com/api/language-detection   
  2. https://molalabs.uw.r.appspot.com/api/sentiment-score   

### Notes
Sentiment Analysis was performed in the backend using the vaderSentiment library.   
Please Note that additional conditions have been added to calculate detected mood. It was observed that most tweets were classeified as Neutral as it had the highest score in most cases even though the tweet was a positive or negative tweet.
**Incsae the score for positive or negative is greater than 0.2 the tweet was classified as pos or negative respectively irrespective of the score received by neutral.**

### How it works?
REST API's were made and 2 end points were created in Flask.    
The langdetect library in python has been used for language-detection and the VaderSentiment python library has been used to calculate scores for sentiment analysis.   
The backend was then deployed on Google cloud app engine.   
The Extension has been created using Google Manifest V3.   

### Example Output


#### API Endpoint 1: Language Detection on Postman for sample input   
```
{
    "list": [
        {
            "is_english": "True",
            "tweet_text": "Stats on Twitter World Cuvzsfvszfbp"
        },
        {
            "is_english": "True",
            "tweet_text": "As the saying goes, be careful what you wish, as you might get it"
        },
        {
            "is_english": "False",
            "tweet_text": "شب یلدا مبارک! ❤️"
        }
    ]
}
```   
#### API Endpoint 2: Sentiment Analysis  
```
{
    "list": [
        {
            "detected_mood": "neu",
            "sentiment_score": {
                "neg": 0.0,
                "neu": 1.0,
                "pos": 0.0
            },
            "tweet_text": "Stats on Twitter World Cuvzsfvszfbp"
        },
        {
            "detected_mood": "pos",
            "sentiment_score": {
                "neg": 0.0,
                "neu": 0.736,
                "pos": 0.264
            },
            "tweet_text": "As the saying goes, be careful what you wish, as you might get it"
        },
        {
            "detected_mood": "neu",
            "sentiment_score": {
                "neg": 0.0,
                "neu": 1.0,
                "pos": 0.0
            },
            "tweet_text": "شب یلدا مبارک! ❤️"
        }
    ]
}
```
#### Sample Twitter Output
![image](https://user-images.githubusercontent.com/47116032/212029278-7611eae6-e422-44b9-aab6-2ab218fa4b7e.png)








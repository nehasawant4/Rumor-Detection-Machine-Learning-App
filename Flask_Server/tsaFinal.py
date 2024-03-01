import re

import tweepy
from pytrends.request import TrendReq
from textblob import TextBlob
from tweepy import OAuthHandler


def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet).split())


def get_tweet_sentiment(tweet):
    analysis = TextBlob(clean_tweet(tweet))
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'


def get_tweets(query, count=10):
    consumer_key = 'MIAK5jQMu8sIYEmqqFuShfg9t'
    consumer_secret = 'FXGvuXKVc2oMq7pFOkh7FjaOLWAKzuKu5basVLNMmoI3hZ9rQj'
    access_token = '1758652554270081024-gk8X88DEpIMtDac3ymf8lBlmh556hc'
    access_token_secret = 'apyruZdYG5pdDUR45dYEk3PUiTgz0NEdjgUgWfRXxvAVo'

    try:
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
    except:
        print("Error: Authentication Failed")

    tweets = []
    try:
        fetched_tweets = api.search(q=query, count=count)
        for tweet in fetched_tweets:
            parsed_tweet = {}
            parsed_tweet['text'] = tweet.text
            parsed_tweet['sentiment'] = get_tweet_sentiment(tweet.text)

            if tweet.retweet_count > 0:
                if parsed_tweet not in tweets:
                    tweets.append(parsed_tweet)
            else:
                tweets.append(parsed_tweet)
        return tweets
    except tweepy.TweepError as e:
        print("Error : " + str(e))


def supreme(s):
    consumer_key = 'MIAK5jQMu8sIYEmqqFuShfg9t'
    consumer_secret = 'FXGvuXKVc2oMq7pFOkh7FjaOLWAKzuKu5basVLNMmoI3hZ9rQj'
    access_token = '1758652554270081024-gk8X88DEpIMtDac3ymf8lBlmh556hc'
    access_token_secret = 'apyruZdYG5pdDUR45dYEk3PUiTgz0NEdjgUgWfRXxvAVo'

    try:
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
    except:
        print("Error: Authentication Failed")


    tweets = get_tweets(query=s, count=200)

    if tweets is None:
        print("Error: No tweets were found or an error occurred while fetching tweets.")
    return [], 0, [], 0, [], 0

    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']

    ppos = 100 * len(ptweets) / len(tweets)
    # print("Positive tweets percentage: {} %".format(ppos))

    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    pneg = 100 * len(ntweets) / len(tweets)
    # print("Negative tweets percentage: {} %".format(pneg))

    pneu = (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets)
    neutweets = [tweet for tweet in tweets if tweet['sentiment'] == 'neutral']
    # print("Neutral tweets percentage: {} % \ ".format(100 * (pneu)))

    return ptweets, ppos, ntweets, pneg, neutweets, pneu


def getTrends():
    pytrends = TrendReq(hl='en-US', tz=360)
    return pytrends.trending_searches(pn='india').to_dict()


def getAnalysis(query,ck="", cs="", at="", ats=""):
    consumer_key = ck
    consumer_secret = cs
    access_token = at
    access_token_secret = ats
    try:
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=True)
    except:
        print("Error: Authentication Failed")
    analysis = supreme(query)
    d = {'positiveTweets': analysis[0], 'pp': analysis[1], 'negativeTweets': analysis[2],
         'np': analysis[3], 'neutralTweets': analysis[4], 'neup': analysis[5]}
    return d


if __name__ == '__main__':
    consumer_key = 'MIAK5jQMu8sIYEmqqFuShfg9t'
    consumer_secret = 'FXGvuXKVc2oMq7pFOkh7FjaOLWAKzuKu5basVLNMmoI3hZ9rQj'
    access_token = '1758652554270081024-gk8X88DEpIMtDac3ymf8lBlmh556hc'
    access_token_secret = 'apyruZdYG5pdDUR45dYEk3PUiTgz0NEdjgUgWfRXxvAVo'

    try:
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
    except:
        print("Error: Authentication Failed")

    topTrends = getTrends()
    analysis = supreme(topTrends[0])
    d = {'positive tweets': analysis[0], 'pp': analysis[1], 'negative tweets': analysis[2],
         'np': analysis[3], 'neutral tweets': analysis[4], 'neup': analysis[5]}
    print(d)

#    print(supreme(topTrends[0]))

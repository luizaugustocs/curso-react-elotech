import firebase from 'firebase';
import * as AuthService from './AuthService';

export const newTweet =  (tweetContent) => {
    const currentUserId = AuthService.getCurrentUser().uid;
    const parsedTweet = {
        content: tweetContent,
        author: currentUserId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    return firebase.firestore().collection(`/tweets`)
        .add(parsedTweet)
};

export const getUserTweets = (user, lastTweet) => {

    const query = firebase.firestore().collection(`/tweets`)
        .where('author', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .limit(20);

    return (lastTweet ? query.startAfter(lastTweet) : query)
        .get()
        .then(snapshot => snapshot.docs)
        .then(tweets => tweets.filter(tweet => tweet.exists))
};

export const getUserFeed = (user, lastTweet) => {
    const query = firebase.firestore().collection(`/users/${user.uid}/feed/`)
        .orderBy('timestamp', 'desc')
        .limit(20);

    return (lastTweet ? query.startAfter(lastTweet) : query)
        .get()
        .then(snapshot => snapshot.docs)
        .then(tweets => Promise.all(tweets.map(tweet => firebase.firestore().doc(`/tweets/${tweet.id}`).get())))
        .then(tweets => tweets.filter(tweet => tweet.exists))
};

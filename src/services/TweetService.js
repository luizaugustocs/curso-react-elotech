// @flow
import firebase from 'firebase';
import * as AuthService from './AuthService';

export const newTweet = (tweetContent: string): Promise<$npm$firebase$firestore$DocumentReference> => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        return Promise.reject();
    }
    const parsedTweet = {
        content: tweetContent,
        author: currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    return firebase.firestore().collection(`/tweets`).add(parsedTweet)
};

export const getUserTweets = (user: UserData, lastTweet?: $npm$firebase$firestore$DocumentReference): Promise<Array<$npm$firebase$firestore$DocumentSnapshot>> => {

    const query = firebase.firestore().collection(`/tweets`)
        .where('author', '==', user.uid)
        .orderBy('timestamp', 'desc')
        .limit(20);

    return (lastTweet ? query.startAfter(lastTweet) : query)
        .get()
        .then(snapshot => snapshot.docs)
        .then(tweets => tweets.filter(tweet => tweet.exists))
};

export const getUserFeed = (user: UserData, lastTweet?: $npm$firebase$firestore$DocumentReference) : Promise<Array<$npm$firebase$firestore$DocumentSnapshot>> => {
    const query = firebase.firestore().collection(`/users/${user.uid}/feed/`)
        .orderBy('timestamp', 'desc')
        .limit(20);

    return (lastTweet ? query.startAfter(lastTweet) : query)
        .get()
        .then(snapshot => snapshot.docs)
        .then(tweets => Promise.all(tweets.map(tweet => firebase.firestore().doc(`/tweets/${tweet.id}`).get())))
        .then(tweets => tweets.filter(tweet => tweet.exists))
};

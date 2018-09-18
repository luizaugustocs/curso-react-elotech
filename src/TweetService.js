import firebase from 'firebase';
import * as AuthService from './AuthService';

export const newTweet = async (tweetContent) =>  {
    const currentUser = AuthService.getCurrentUser();


    const parsedTweet = {
        content: tweetContent.text,
        photoURL: tweetContent.url,
        author: currentUser.uid,
        authorName: currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    const newTweetRef = await firebase.firestore().collection(`/tweets`)
        .add({});
    await newTweetRef.set({...parsedTweet, id: newTweetRef.id});

    await firebase.firestore().doc(`/users/${currentUser.uid}/tweets/${newTweetRef.id}`).set({timestamp: parsedTweet.timestamp});

    return await firebase.firestore().collection(`/users/${currentUser.uid}/followers`).get()
        .then(snapshot =>
            snapshot.forEach( async follower => {
                await firebase.firestore().doc(`/users/${follower.id}/feed/${newTweetRef.id}`).set({timestamp: parsedTweet.timestamp})

            }))
};

export const getUserTweets = (user, lastTweet) => {

    const query = firebase.firestore().collection(`/tweets`)
        .where('author', '==',user.uid)
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
}
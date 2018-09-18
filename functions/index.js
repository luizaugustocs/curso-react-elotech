const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onTweet = functions.firestore.document('/tweets/{tweetId}')
    .onCreate(async (snapshot, context) => {
        const newTweet = snapshot.data();
        const tweetId = context.params.tweetId;


        functions.firestore.document(`/users/${newTweet.author}/tweets/${tweetId}`).ref

    })
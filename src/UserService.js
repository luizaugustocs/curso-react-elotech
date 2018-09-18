import firebase from 'firebase';
import * as AuthService from './AuthService';

export const followUser = async userToFollow => {
    const currentUser = AuthService.getCurrentUser();
    await firebase.firestore().doc(`/users/${userToFollow.uid}/followers/${currentUser.uid}`)
        .set({timestamp: firebase.firestore.FieldValue.serverTimestamp()})
        .then(result => {
            console.log({result})
        });
};
import firebase from 'firebase';
import * as AuthService from './AuthService';

export const followUser = userToFollow => {
  const currentUser = AuthService.getCurrentUser();
  return firebase.firestore().doc(`/users/${userToFollow.uid}/followers/${currentUser.uid}`)
    .set({ timestamp: firebase.firestore.FieldValue.serverTimestamp() })
};

export const updateUserData = ({ displayName = '', userName = '', photoURL = '' }) => {
  const currentUser = AuthService.getCurrentUser();
  const parsedValues = {
    displayName, userName, photoURL
  };
  return firebase.firestore().doc(`/users/${currentUser}`).set(parsedValues, { merge: true })
};

export const getUserData = user => {
  return firebase.firestore().doc(`/users/${user.uid}`).get()
    .then(snapshot => snapshot.data)
    .then(user => ({
      uid: user.uid, userName: user.userName, displayName: user.displayName, photoURL: user.photoURL
    }))
};

export const createUser = ({ displayName, userName, photoURL, email, password }) => {

  const userData = {
    displayName, userName, photoURL, email
  }

  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => firebase.firestore().doc(`/users/${user.uid}`).set(userData))

}

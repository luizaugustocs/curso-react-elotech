// @flow
import firebase from 'firebase';

export const onAuthChange = (callback: (?$npm$firebase$auth$User) => void | Promise<void>): void => {
    firebase.auth().onAuthStateChanged(callback);
};

export const loginWithGoogle = () : Promise<$npm$firebase$auth$User> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(credentials => credentials.user)
};

export const getCurrentUser = (): ?$npm$firebase$auth$User => firebase.auth().currentUser;

export const logout = () : Promise<void> => firebase.auth().signOut();

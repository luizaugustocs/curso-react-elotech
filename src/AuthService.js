import firebase from 'firebase';



export const loginWithUserEmailandPassword = (email, password) => {
    console.log({email, password});
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(getCurrentUser)
};

export const loginWithGoogle = () => {

    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithRedirect(provider)
};

export const getCurrentUser = () => firebase.auth().currentUser;

export const logout = () => firebase.auth().signOut();

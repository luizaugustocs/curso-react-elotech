// @flow
import firebase from 'firebase';
import * as AuthService from './AuthService';

export const followUser = (userToFollow: UserData): Promise<void> => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser)
        return Promise.reject();
    return firebase.firestore().doc(`/users/${userToFollow.uid}/followers/${currentUser.uid}`)
        .set({timestamp: firebase.firestore.FieldValue.serverTimestamp()})
};

export const updateUserData = (userData: UpdateUser): Promise<void> => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser)
        return Promise.reject();
    return firebase.firestore().doc(`/users/${currentUser.uid}`).set(userData, {merge: true})
};

export const getUserData = (userId: string): Promise<UserData> =>
    firebase.firestore().doc(`/users/${userId}`).get()
        .then(user => user.data());

export const searchUser = (searchText?: string = ''): Promise<Array<UserData>> =>
    firebase.firestore().collection('/users')
        .get()
        .then(users =>
            users.docs
                .map(user => (user.data() : UserData))
                .filter((user: UserData) => {
                    return (user.userName && user.userName.includes(searchText)) || (user.displayName && user.displayName.includes(searchText))
                })
        );

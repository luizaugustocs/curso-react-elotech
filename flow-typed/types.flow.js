declare type UpdateUser = {
    displayName: string,
    userName: string,
    photoURL: string
}

declare type UserData = {
    uid: string,
    userName: ?string,
    displayName: ?string,
    photoURL: ?string,
    email: string
}

declare type Tweet = {
    uid: string,
    content: string,
    author: string,
    timestamp: Timestamp,
    authorName: ?string,
    authorUserName: ?string
}

declare type Timestamp = {
    seconds: $ReadOnly<number>;
    nanoseconds: $ReadOnly<number>;
    toDate(): Date;
    toMillis(): number;
    isEqual(other: Timestamp): boolean;
}
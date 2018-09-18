import React, {Component} from 'react';
import './App.css';
import * as AuthService from './AuthService'
import * as TweetService from './TweetService'
import * as UserService from './UserService'
import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);
firebase.firestore().settings({
     timestampsInSnapshots: true
});

class App extends Component {

    state =  {
        user: undefined,
        tweets: []
    };

    componentDidMount() {
        console.log('didmount');
        firebase.auth().onAuthStateChanged(user => {
            console.log('changed', user)
            this.setState({user})
        });
    }

    loginEmail = () => {
        return AuthService.loginWithUserEmailandPassword('a@a.com', '123456')
    };

    loginGoogle = () => {
        AuthService.loginWithGoogle()
    };

    post = () => {
        TweetService.newTweet({
            text: 'teste'
        }).then(() => ' postado')
    };

    get = () => {
        TweetService.getUserTweets(this.state.user)
            .then(result => {
               this.setState({tweets: result})
            })
    };

    follow =() => {
        UserService.followUser({uid: 'xZNtwPqijaMzpZ9Iw4e9y3yY0le2'})
    }

    logout = () => {
        AuthService.logout().then(() => this.setState({user: undefined}))
    }


    feed = () => {
        TweetService.getUserFeed(this.state.user)
            .then((result) => this.setState({tweets: result}))
    };
    render() {
       const {user, tweets} = this.state;
console.log({user})

        return (
            <h1>
                {user ? <button onClick={this.logout}>logout</button> : (
                <React.Fragment>
                    <button onClick={this.loginEmail}>loginEmail</button>
                <button onClick={this.loginGoogle}>loginGoogle</button>
                </React.Fragment>
                )}
                <button onClick={this.post}>post</button>
                <button onClick={this.get}>get</button>
                <button onClick={this.follow}>follow</button>
                <button onClick={this.feed}>feed</button>

                {user && user.displayName}

                {tweets.length === 0 ? 'empty feed' : ' feed with ' + tweets.length}
                {tweets.map(tweet => {
                    console.log(tweet.data().timestamp)
                    return <div key={tweet.data().id}>
                        <h3>{tweet.data().content}</h3>
                        <h5>{tweet.data().authorName}</h5>
                        <h5>{tweet.data().timestamp.toDate().toISOString()}</h5>
                    </div>
                })}
            </h1>
        );
    }
}

export default App;

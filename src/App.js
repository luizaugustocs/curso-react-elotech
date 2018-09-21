import React from 'react';
import './App.css';
import * as AuthService from './services/AuthService'
import * as TweetService from './services/TweetService'
import * as UserService from './services/UserService'
import {Button, Col, Container, Navbar, Row, ButtonToolbar, ListGroup} from 'react-bootstrap';

class App extends React.Component {

    state = {
        user: undefined,
        tweets: []
    };

    componentDidMount() {
        AuthService.onAuthChange(user => this.setState({user}));
    }

    loginGoogle = () => {
        AuthService.loginWithGoogle()
    };

    post = () => {
        TweetService.newTweet(43).then(() => ' postado')
    };

    get = () => {
        TweetService.getUserTweets(this.state.user)
            .then(result => {
                console.log(result);
                this.setState({tweets: result})
            })
    };

    follow = () => {
        UserService.followUser({uid: 'xZNtwPqijaMzpZ9Iw4e9y3yY0le2'})
            .then(() => console.log('follow'))
    };

    logout = () => {
        AuthService.logout().then(() => this.setState({user: undefined}))
    };


    feed = () => {
        TweetService.getUserFeed(this.state.user)
            .then((result) => this.setState({tweets: result}))
    };

    getUserData = (userId) => {
        UserService.getUserData(userId)
            .then((user) => console.log(user.data()))
    };

    search = () => {
        UserService.searchUser()
            .then(users => {
                console.log(users);
                users.map(console.log)
            })
    };

    render() {
        const {user, tweets} = this.state;

        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Twitter</Navbar.Brand>
                </Navbar>
                <Container fluid style={{marginTop: 10}}>
                    <Row>

                        <Col md={6}>
                            <ButtonToolbar>
                            <Button type="button" variant="primary" onClick={this.post}>post</Button>
                            <Button type="button" variant="primary" onClick={this.get}>get</Button>
                            <Button type="button" variant="primary" onClick={this.follow}>follow</Button>
                            <Button type="button" variant="primary" onClick={this.feed}>feed</Button>
                            <Button type="button" variant="primary" onClick={this.search}>search</Button>
                            </ButtonToolbar>
                        </Col>
                        <Col md={{span: 2, offset: 4}} style={{alignSelf: 'flex-end'}}>
                            {user ? <Button type="button" variant="danger" onClick={this.logout}>Logout</Button> : (
                                    <Button type="button" variant="success" onClick={this.loginGoogle}>Login</Button>
                            )}
                        </Col>
                    </Row>


                    <h3>{user && user.displayName}</h3>

                    {tweets.length === 0 ? 'empty feed' : ' feed with ' + tweets.length}

                    <ListGroup>
                    {tweets.map(tweet => {
                        console.log(tweet.data().timestamp);
                        return <ListGroup.Item key={tweet.data().uid}>
                            <Row>
                                <Col md={3}>
                                    <h5>{tweet.data().authorName}</h5>
                                </Col>
                                <Col md={3}>
                                    <a onClick={() => this.getUserData(tweet.data().author)}>{`@${tweet.data().authorUserName}`}</a>
                                </Col>
                                <Col md={3}>
                            <h5>{tweet.data().timestamp.toDate().toISOString()}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                            <h3>{tweet.data().content}</h3>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    })}
                    </ListGroup>
                </Container>

            </div>
        );
    }
}

export default App;

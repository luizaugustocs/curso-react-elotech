import React, { Component } from 'react';
import { Input, CardList } from '../components';

class Home extends Component {
  state = {
    tweet: '',
    tweetList: [
      { id: 1, tweet: 'Tweet 01' },
      { id: 2, tweet: 'Tweet 02' },
      { id: 3, tweet: 'Tweet 03' },
    ],
    dataTweet: new Date().toJSON()
  }

  handleChange = e => {
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { tweet, dataTweet, tweetList } = this.state;
    const newObj = { id: Math.random(), tweet, dataTweet };
    const newList = [newObj, ...tweetList];

    this.setState({ tweetList: newList });
  }

  render() {
    const { tweet, tweetList } = this.state;

    return (
      <div className="container">
        <div>
          <form onSubmit={this.handleSubmit}>
            <span className="float-right">{tweet.length}/100</span>
            <Input
              name="tweet"
              onChange={this.handleChange}
              value={tweet}
            />
            <button className="btn btn-primary" style={{ marginTop: 10 }}>
              Tweetar
            </button>
          </form>
        </div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <CardList list={tweetList} />
        </div>
      </div>
    );
  }
}

export default Home;

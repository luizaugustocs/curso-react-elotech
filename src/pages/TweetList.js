import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Card } from '../components/';

class TweetList extends Component {
  render() {
    const { list } = this.props;

    return (
      list.map(tweet => {
        return (
          <ListGroup>
            <Card key={tweet.id} tweet={tweet.tweet} />
          </ListGroup>
        );
      })
    );
  }
}

export default TweetList;

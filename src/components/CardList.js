import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Card } from '.';

const CardList = ({ list }) => {
  return (
    list.map(tweet => {
      return (
        <ListGroup>
          <Card key={tweet.id} tweet={tweet.tweet} />
        </ListGroup>
      );
    })
  );
};

export { CardList };

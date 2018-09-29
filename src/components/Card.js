import React from 'react';
import './Card.css';

const imgUrl = `
  https://www.imgworlds.com/wp-content/themes/IMG/img/phase3/slides/lostvalley-raptor.png
`;

const Card = ({ username, tweet }) => {

  return (
    <div className="cardContainer">
      <div className="cardHeader">
        <img
          alt="img"
          src={imgUrl}
          height={50}
          width={50}
        />
        <p>@username_test</p>
      </div>
      <div className="cardContent">
        <p>{tweet}</p>
      </div>
      <div className="cardFooter">
        <p>{new Date().toJSON()}</p>
      </div>
    </div>
  );
};

export { Card };

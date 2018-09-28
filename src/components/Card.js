import React from 'react';

const imgUrl = 'https://www.imgworlds.com/wp-content/themes/IMG/img/phase3/slides/lostvalley-raptor.png';

const Card = ({ username, tweet }) => {

  return (
    <div style={{ height: 250, width: 250, backgroundColor: '#f5f5f5', border: '1px solid black'}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <img src={imgUrl} alt="img" width={50} height={50} style={{ margin: 10 }} />
        <p style={{ alignSelf: 'center'}}>{username}</p>
      </div>
      <p>{tweet}</p>
    </div>
  );
};

export { Card };

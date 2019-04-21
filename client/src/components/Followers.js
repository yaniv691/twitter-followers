import React from 'react';
import Follower from './Follower';
import Table from 'react-bootstrap/Table';
function Followers(props) {
  if (!props.followers) {
    return (<div className="text-center"><span className="emoji" role="img" aria-label="facepalm">🤷🏻‍♂️</span>Oops, no such user.</div>);
  }
  if (props.followers.length === 0) {
    return (<div className="text-center"><span className="emoji" role="img" aria-label="disappointed">😞</span>{props.screenNameInput} doesn't have any followers yet.</div>);
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th onClick={() => props.sortFunction('name')}>Account Name</th>
          <th onClick={() => props.sortFunction('screen_name')}>Screen Name</th>
        </tr>
      </thead>
      <tbody>
        {props.followers.map(follower => <Follower key={follower.id} followerDetails={follower} />)}
      </tbody>
    </Table>
  );
}

export default Followers;
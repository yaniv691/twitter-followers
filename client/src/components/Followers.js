import React from 'react';
import Follower from './Follower';
import Table from 'react-bootstrap/Table';
function Followers(props) {
  if (!props.users) {
    return (<div className="text-center"><span className="emoji" role="img" aria-label="facepalm">🤷🏻‍♂️</span>Oops, no such user.</div>);
  }
  if (props.users.length === 0) {
    return (<div className="text-center"><span className="emoji" role="img" aria-label="disappointed">😞</span>{props.screenNameInput} doesn't have any followers yet.</div>);
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th onClick={() => props.sortFunction('name')} className="sortable">Account Name</th>
          <th onClick={() => props.sortFunction('screen_name')} className="sortable">Screen Name</th>
          <th>Following</th>
          <th>Followers</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user => <Follower key={user.id} followerDetails={user} />)}
      </tbody>
    </Table>
  );
}

export default Followers;
import React from 'react';
import Follower from './Follower';

function Followers(props) {
  return (
    <div className="followers-list">
      {props.followers.map(follower => <Follower key={follower.id} followerDetails={follower} />)}
    </div>
  )
}

export default Followers;
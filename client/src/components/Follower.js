import React from 'react';

export default function Follower(props) {
  return (
    <div className="follower">
      <img src={props.followerDetails.profile_image_url} alt={`${props.followerDetails.name} Twitter Profile Avatar`} />
      <div className="follower__name">
        <a href={`https://twitter.com/${props.followerDetails.screen_name}`} target="_blank" rel="noopener noreferrer">
          {props.followerDetails.name}
        </a>
        <br />
        @{props.followerDetails.screen_name}
      </div>
    </div>
  );
}


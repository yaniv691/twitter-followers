import React from 'react';
export default function Follower(props) {
  return (
    <tr>
      <td><img src={props.followerDetails.profile_image_url} alt={`${props.followerDetails.name} Twitter Profile Avatar`} /></td>
      <td>{props.followerDetails.name}</td>
      <td><a href={`https://twitter.com/${props.followerDetails.screen_name}`} target="_blank" rel="noopener noreferrer">
        @{props.followerDetails.screen_name}
      </a></td>

    </tr>
  );
}

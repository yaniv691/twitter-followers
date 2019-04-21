import React from 'react';
import Button from 'react-bootstrap/Button';
function Navigation(props) {
  return (
    <div className="navigation">
      <Button disabled={props.prevCursor === "0"} onClick={() => props.navigateFollowers('prevCursor')}>&larr; Previous</Button>
      <Button disabled={props.nextCursor === "0"} onClick={() => props.navigateFollowers('nextCursor')} className="float-right">Next &rarr;</Button>
    </div>
  );
}

export default Navigation;
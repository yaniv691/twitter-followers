import React from 'react';
import Follower from './Follower';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Followers extends React.Component {
  sortByName = () => {
    this.props.sortFunction('name');
  }

  sortByScreenName = () => {
    this.props.sortFunction('screen_name');
  }

  render() {
    if (!this.props.users) {
      return (
        <div className="text-center">
          <span className="emoji" role="img" aria-label="facepalm">🤷🏻‍♂️</span>
          Oops, no such user.
        </div>
      );
    }

    if (this.props.users.length === 0) {
      return (
        <div className="text-center">
          <span className="emoji" role="img" aria-label="disappointed">😞</span>
          {this.props.screenNameInput} doesn't have any followers yet.
        </div>
      );
    }

    return (
      <div className="followers-list-container">
        <small>Sort by:</small>
        <ButtonGroup size="sm" >
          <Button variant="link" onClick={this.sortByName}>Account Name</Button>
          <Button variant="link" onClick={this.sortByScreenName}>Screen Name</Button>
        </ButtonGroup>
        <Table striped hover responsive className="followers-list">
          <thead>
            <tr>
              <th></th>
              <th onClick={this.sortByName} className="sortable">Account Name</th>
              <th onClick={this.sortByScreenName} className="sortable">Screen Name</th>
              <th>Following</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => <Follower key={user.id} followerDetails={user} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Followers;
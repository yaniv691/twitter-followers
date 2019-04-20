import React, { Component } from 'react';
import './App.scss';
import Follower from './components/Follower';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class App extends Component {
  state = {
    followers: [],
    screenNameInput: '',
    isLoading: false,
    nextCursor: '',
    prevCursor: '',
  };
  sortFollowersList = (key) => {
    const followers = this.state.followers;
    followers.sort((a, b) => {
      const lowerCaseA = a[key].toLowerCase();
      const lowerCaseB = b[key].toLowerCase();
      return lowerCaseA === lowerCaseB ? 0 : lowerCaseA < lowerCaseB ? -1 : 1;
    });
    this.setState({ followers: followers });
  }
  callApi = async (screenName, cursor) => {
    this.setState({
      isLoading: true
    });
    let params = `screenName=${screenName}`;
    if (cursor) {
      params += `&cursor=${cursor}`;
    }
    const response = await fetch(`/api/followers?${params}`);
    const body = await response.json();
    this.setState({
      isLoading: false
    });
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getFollowers = (cursorKey = -1) => {
    this.callApi(this.state.screenNameInput, this.state[cursorKey])
      .then(response => {
        this.setState({
          followers: response.users,
          nextCursor: response.next_cursor,
          prevCursor: response.previous_cursor
        })
      })
      .catch(err => console.log(err));
  }

  navigateFollowers = (cursorKey) => {
    this.getFollowers(cursorKey);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getFollowers();
  }

  handleScreenNameChange = (event) => {
    this.setState({
      screenNameInput: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Twitter username"
              aria-label="Twitter username"
              aria-describedby="basic-addon2"
              value={this.state.screenNameInput}
              name="screen_name_input"
              onChange={this.handleScreenNameChange}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>

        <button onClick={() => this.sortFollowersList('screen_name')}>Sort by Screen Name</button>
        <button onClick={() => this.sortFollowersList('name')}>Sort by Account Name</button>
        {this.state.isLoading && <div>Loading...</div>}
        {!this.state.isLoading && <div className="followers-list">
          {this.state.followers.map(follower => <Follower key={follower.id} followerDetails={follower} />)}
        </div>}

        {Number(this.state.prevCursor) !== 0 && <button onClick={() => this.navigateFollowers('prevCursor')}>Previous</button>}
        {Number(this.state.nextCursor) !== 0 && <button onClick={() => this.navigateFollowers('nextCursor')}>Next</button>}
      </div>
    );
  }
}

export default App;

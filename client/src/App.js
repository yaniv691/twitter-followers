import React, { Component } from 'react';
import './App.scss';

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
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.screenNameInput} name="screen_name_input" onChange={this.handleScreenNameChange} />
          <button>Submit</button>
        </form>
        <button onClick={() => this.sortFollowersList('screen_name')}>Sort by Screen Name</button>
        <button onClick={() => this.sortFollowersList('name')}>Sort by Account Name</button>
        {this.state.isLoading && <div>Loading...</div>}
        <div className="followers-list">
          {this.state.followers.map(follower => <div key={follower.id} className="follower">
            <img src={follower.profile_image_url} alt={`${follower.name} Twitter Profile Avatar`} />
            <a href={`https://twitter.com/${follower.screen_name}`} target="_blank" rel="noopener noreferrer">{follower.name}</a>
            @{follower.screen_name}
          </div>)}
        </div>
        {Number(this.state.prevCursor) !== 0 && <button onClick={() => this.navigateFollowers('prevCursor')}>Previous</button>}
        {Number(this.state.nextCursor) !== 0 && <button onClick={() => this.navigateFollowers('nextCursor')}>Next</button>}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    followers: [],
    screenNameInput: '',
    isLoading: false
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
  callApi = async (screenName) => {
    this.setState({
      isLoading: true
    });
    const response = await fetch(`/api/followers?screenName=${screenName}`);
    const body = await response.json();
    this.setState({
      isLoading: false
    });
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Screen name submitted is:', this.state.screenNameInput);
    this.callApi(this.state.screenNameInput)
      .then(res => {
        this.setState({ followers: res.users })
      })
      .catch(err => console.log(err));
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
      </div>
    );
  }
}

export default App;

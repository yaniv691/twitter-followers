import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    followers: [],
    post: '',
    responseToPost: '',
  };
  componentDidMount() {
    const followers = JSON.parse(localStorage.getItem('followers'));
    if (!followers) {
      this.callApi()
        .then(res => {
          localStorage.setItem('followers', JSON.stringify(res.users));
          this.setState({ followers: res.users })
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ followers: followers })
    }
  }
  sortFollowersList = (key) => {
    const followers = this.state.followers;
    followers.sort((a, b) => {
      const lowerCaseA = a[key].toLowerCase();
      const lowerCaseB = b[key].toLowerCase();
      return lowerCaseA === lowerCaseB ? 0 : lowerCaseA < lowerCaseB ? -1 : 1;
    });
    this.setState({ followers: followers });
  }
  callApi = async () => {
    const response = await fetch('/api/followers');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    console.log(this.state.followers);
    return (
      <div className="App">
        <button onClick={() => this.sortFollowersList('screen_name')}>Sort by Screen Name</button>
        <button onClick={() => this.sortFollowersList('name')}>Sort by Account Name</button>
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

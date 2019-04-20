import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
        <ol>
          {this.state.followers.map(follower => <li key={follower.id}>
            <img src={follower.profile_image_url} alt={`${follower.name} Twitter Profile Avatar`} />
            Name: {follower.name} ||| Screen Name: {follower.screen_name}
          </li>)}
        </ol>
      </div>
    );
  }
}

export default App;

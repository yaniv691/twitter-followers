import React from 'react';
import { connect } from 'react-redux';

import 'bootstrap-css-only/css/bootstrap.min.css';
import './App.scss';

import Followers from './components/Followers';
import Navigation from './components/Navigation';
import UserForm from './components/UserForm';

import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

import axios from 'axios';
import store from "./store";


class App extends React.Component {
  state = {
    screenNameInput: '',
    isLoading: false,
    firstQuerySent: false,
  };

  sortFollowersList = (key) => {
    const users = this.props.users;
    users.sort((a, b) => {
      const lowerCaseA = a[key].toLowerCase();
      const lowerCaseB = b[key].toLowerCase();
      return lowerCaseA === lowerCaseB ? 0 : lowerCaseA < lowerCaseB ? -1 : 1;
    });
    store.dispatch({
      type: 'SORT_FOLLOWERS',
      sortBy: key,
      users
    })
  }

  fetchFollowers = (screenName, cursor = -1) => {
    let params = `screenName=${screenName}`;
    if (cursor) {
      params += `&cursor=${cursor}`;
    }
    axios.get(`/api/followers?${params}`).then(response => {
      store.dispatch({
        type: 'FOLLOWERS_RECEIVED',
        users: response.data.users,
        prevCursor: response.data.previous_cursor_str,
        nextCursor: response.data.next_cursor_str
      });
    })
  }

  navigateFollowers = (cursorKey) => {
    this.fetchFollowers(this.state.screenNameInput, this.props[cursorKey]);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchFollowers(this.state.screenNameInput);
  }

  handleScreenNameChange = (event) => {
    this.setState({
      screenNameInput: event.target.value
    });
  }

  render() {
    return (
      <Container className="app-container">
        <UserForm
          submitHandler={this.handleSubmit}
          changeHandler={this.handleScreenNameChange}
          screenNameInput={this.state.screenNameInput}
        />
        <div className="main">
          {(this.state.firstQuerySent && this.state.isLoading) &&
            <Spinner variant="primary" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          {/* {(this.state.firstQuerySent && !this.state.isLoading) && */}
          <Followers users={this.props.users} sortFunction={this.sortFollowersList} screenNameInput={this.state.screenNameInput} />
          {/* } */}
        </div>
        {/* {(this.state.firstQuerySent && this.props.followers && this.props.followers.length > 0) && */}
        <Navigation prevCursor={this.props.prevCursor} nextCursor={this.props.nextCursor} navigateFollowers={this.navigateFollowers} />
        {/* } */}
      </Container>
    );
  }
}

const mapStateToProps = function (store) {
  console.log(store);
  return {
    users: store.followersState.users,
    prevCursor: store.followersState.prevCursor,
    nextCursor: store.followersState.nextCursor,
    sortBy: store.followersState.sortBy
  };
}

export default connect(mapStateToProps)(App);
import React, { Component } from 'react';
import './App.scss';
import Followers from './components/Followers';
import Navigation from './components/Navigation';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class App extends Component {
  state = {
    followers: [],
    screenNameInput: '',
    isLoading: false,
    firstQuerySent: false,
    nextCursor: '0',
    prevCursor: '0',
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
      isLoading: true,
      firstQuerySent: true,
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
    console.log(body);
    return body;
  };

  getFollowers = (cursorKey = -1) => {
    this.callApi(this.state.screenNameInput, this.state[cursorKey])
      .then(response => {
        this.setState({
          followers: response.users,
          nextCursor: response.next_cursor_str,
          prevCursor: response.previous_cursor_str
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
      <Container>
        <div className="App">
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Enter a Twitter username"
                aria-label="Enter a Twitter username"
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
          <div className="main">
            {(this.state.firstQuerySent && this.state.isLoading) &&
              <Spinner variant="primary" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
            {(this.state.firstQuerySent && !this.state.isLoading) &&
              <Followers followers={this.state.followers} sortFunction={this.sortFollowersList} screenNameInput={this.state.screenNameInput} />
            }
          </div>


          {this.state.firstQuerySent &&
            <Navigation prevCursor={this.state.prevCursor} nextCursor={this.state.nextCursor} navigateFollowers={this.navigateFollowers} />
          }
        </div>
      </Container>
    );
  }
}

export default App;

# Twitter Followers

Simple application that shows a list of followers for a requested Twitter user

## Getting Started

The app utilized a Node.js/Express for the server and React for the client.

### Prerequisites

First off, make sure you have Node.js installed on your computer. Node.js can be downloaded from [nodejs.org](https://nodejs.org/en/)


### Installing

To get your development environment up and running, start by cloning the repo locally on your computer

```
git clone https://github.com/yaniv691/twitter-followers.git
```

Change into the project's directory and install the backend server's dependencies.

```
cd twitter-followers
npm install
```

After installation is complete, add the Twitter API keys and secrets in the `server.js` file, in the relevant places.

```
const client = new Twitter({
  consumer_key: '', // Consumer API key goes here
  consumer_secret: '', // Consumer API secret key goes here
  access_token_key: '', // Access token goes here
  access_token_secret: '' // Access token secret goes here
});
```

Start the local backend server.

```
node server.js
```

Inside the project's directory, change into the client directory, install dependencies and 

```
cd client
npm install
```

After installation is complete, start the frontend server in a new terminal window/tab, so both backend and frontend servers can run simultaneously.
```
npm start
```

Finally, open [http://localhost:3000/](http://localhost:3000/) to see your app.


## Built With

* [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework
* [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.
* [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps.
* [Twitter for Node.js](https://www.npmjs.com/package/twitter) - An asynchronous client library for the Twitter REST and Streaming API's.


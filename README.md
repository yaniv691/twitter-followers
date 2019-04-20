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

Change into the project's directory and install the backend server's dependencies. After installation is complete, start the local backend server

```
cd twitter-followers
npm install
...
node server.js
```

Inside the project's directory, change into the client directory, install dependencies and start the frontend server. This should preferably be done in a new terminal window, so both backend and frontend servers run simultaneously.

```
cd client
npm install
...
npm start
```

Finally, open [http://localhost:3000/](http://localhost:3000/) to see your app.


## Built With

* [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework
* [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.
* [Twitter for Node.js](https://www.npmjs.com/package/twitter) - An asynchronous client library for the Twitter REST and Streaming API's.


const express = require('express');
const Twitter = require('twitter');
const app = express();
const port = 5000;

const client = new Twitter({
  consumer_key: '', // Consumer API key goes here
  consumer_secret: '', // Consumer API secret key goes here
  access_token_key: '', // Access token goes here
  access_token_secret: '' // Access token secret goes here
});


app.get('/api/followers', function (req, res) {
  const params = { screen_name: req.query.screenName, count: req.query.count };
  if (req.query.cursor) {
    params.cursor = req.query.cursor;
  }
  client.get('followers/list', params, function (error, followers, response) {
    if (!error) {
      console.log(followers);
    }
    res.send(followers)
  });
})

app.listen(port, () => console.log(`Listing on port ${port}`));
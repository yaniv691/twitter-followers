const express = require('express');
const Twitter = require('twitter');
const app = express();
const port = 5000;

const client = new Twitter({
  consumer_key: 'URkiDH9wltyCdxUgRVMbw5ztK',
  consumer_secret: 'fnsfVoSI5RM25Lm6V2C6SHNUXe3WK95TOiivLOidKvijInrkMU',
  access_token_key: '953647069289418752-fpZDbO7W5xTOTiS8gF6OdI0yRN00XOO',
  access_token_secret: 'A2phYmS2wF1xTWQ81Ayh7lasGcyBsFuKEuf71aX8PdVNg'
});


app.get('/api/followers', function (req, res) {
  const params = { screen_name: req.query.screenName, count: 30 };
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
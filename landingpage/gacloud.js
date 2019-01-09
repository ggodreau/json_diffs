const request = require('request');
const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const app = express()

app.use(cors({ origin: true }))

// landing page
// the new Buffer could use some cleaning
// https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding
app.get("/", (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(new Buffer('<link rel="shortcut icon" href="https://raw.githubusercontent.com/ggodreau/json_diffs/landingpage/assets/troll.png" /><span><img src="https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png"><h1>myGA Diff Tool</h1></span><form action="https://us-central1-imag-178020.cloudfunctions.net/pyfunc" method="get" enctype="application/json">JSON Path #1: <input type="text" name="id1" placeholder="string-functions-and-case-396.json"><br>JSON Path #2: <input type="text" name="id2" placeholder="string-functions-and-case-3529.json"><br><br><input type="submit" value="diff it up"></form>'));
});

// this is the posting route, kept here for reference
// this is not used though
//app.post('*', (req, res) => {
//  let mes2 = req.body.text;
//  res.set('Content-Type', 'text/plain');
//  res.status(200).send(mes2);
//});

// remove express trailing slash requirement from inbound url
// express requires trailing slash on the default endpoint, yuck
const landing = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return app(request, response)
})

module.exports = {
  landing
}

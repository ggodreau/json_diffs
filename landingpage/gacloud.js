const request = require('request');
const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');

const app = express()
let chainer = 'https://us-central1-imag-178020.cloudfunctions.net/chainer'

app.use(cors({ origin: true }))
app.get("/", (req, res) => {
  let mes = req.query.message;
  if ( mes == null ){
    res.set('Content-Type', 'text/html');
    res.status(200).send(new Buffer('<link rel="shortcut icon" href="https://raw.githubusercontent.com/ggodreau/json_diffs/landingpage/assets/troll.png" /><span><img src="https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png"><h1>trollin</h1></span><form action="https://us-central1-imag-178020.cloudfunctions.net/pyfunc" method="get" enctype="application/json"><input type="text" name="id1" placeholder="first url"><input type="text" name="id2" placeholder="second url"><input type="submit" value="send it"></form>'));
  }
  else {
    callChainer(req, res, mes);
  }
});

// the call the form submission goes to
app.post('*', (req, res) => {
  let mes2 = req.body.text;
  res.set('Content-Type', 'text/plain');
  res.status(200).send(mes2);
});

// remove express trailing slash requirement from inbound url
const landing = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}` // prepend '/' to keep query params if any
  }
  return app(request, response)
})

module.exports = {
  landing
}

// call external api
callChainer = (req, res, mes) => {
  request(chainer, function (err, response, body) {
    if(err){
      res.status(200).send('shit got fucked');
    } 
    else {
      res.status(200).send(body);
    }
  }
)};

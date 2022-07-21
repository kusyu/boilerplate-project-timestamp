// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
 // console.log(req.params.date);
  let dt_obj = new Date();
  let dt_utc = dt_obj.toUTCString();
  res.json({unix: dt_obj.getTime(),
           utc: dt_utc});
});


app.get("/api/:date?", function (req, res) {
  console.log(req.params.date);
  let dt_obj = new Date(req.params.date);
  if (!Date.parse(req.params.date)) {
    dt_obj = new Date(parseInt(req.params.date));

    if (dt_obj === NaN) {
      res.json({error: "Invalid Date"});
    }
  }
  let dt_utc = dt_obj.toUTCString();
  res.json({unix: dt_obj.getTime(),
           utc: dt_utc});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

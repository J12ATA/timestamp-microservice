// server.js where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.set('view engine', 'pug');

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.render('index', { fullUrl });
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});``
});

app.get('/api/timestamp/:date_string?', (req, res) => {
  const date_string = req.params.date_string;
  let date;
  if(!date_string) {
    date = new Date();
  } else if (!isNaN(date_string)) {
    date = new Date(parseInt(date_string));
  } else {
    date = new Date(date_string);
  }
  date.toString() === 'Invalid Date'
    ? res.json({ error: date.toString() })
    : res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
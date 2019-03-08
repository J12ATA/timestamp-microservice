const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.static('public'));
app.use(cors());

app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

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
  if (date.toString() === 'Invalid Date') return res.json({ error: date.toString() });
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.use((req, res, next) => { // catch 404 and forward to error handler
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => { // Error Handler
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
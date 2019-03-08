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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
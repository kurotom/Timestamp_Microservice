let express = require("express");
let app = express();



app.get('/', (req, res) => {
  let absPath = __dirname + '/views/index.html';
  res.sendFile(absPath);
});

app.get('/api/', (req, res) => {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/:date?', (req, res) => {
  let query = req.params.date;
  let date;

  if (query.length === 10) {
    date = new Date(query);
    console.log(query, date);
    if (date.toString()  !== 'Invalid Date') {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    } else {
      res.json({error: "Invalid Date"});
    }
  } else if (query.length === 13) {
    date = new Date(parseInt(query));
    reg = /\d+/;
    match = query.match(reg)[0].length;
    if (match === 13) {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    } else {
      res.json({error: "Invalid Date"})
    }
  } else {
    res.json({error: "Invalid Date"})
  }
});

app.use('/assets', express.static(__dirname + '/public'));

module.exports = app;

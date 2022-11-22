let express = require("express");
let app = express();



app.get('/', (req, res) => {
  let absPath = __dirname + '/views/index.html';
  res.sendFile(absPath);
});

// app.get('/api/', (req, res) => {
//   console.log(req.params)
// });

app.get('/api/:date?', (req, res) => {
  let date_string = req.params.date;
  let date;

  if (date_string.length === 0) {
    let date = new Date();
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else if (date_string.length === 10) {
    date = new Date(date_string);
    console.log(date_string, date);
    if (date.toString()  !== 'Invalid Date') {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    } else {
      res.json({error: "Invalid Date"});
    }
  } else if (date_string.length === 13) {
    date = new Date(parseInt(date_string));
    reg = /\d+/;
    match = date_string.match(reg)[0].length;
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

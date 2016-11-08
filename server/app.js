// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "Bruce Springstein",
    title: "Born in the U.S.A."
  }
];

// Prevent user from adding duplicate songs

function checkDuplicate(songs, newSong){
  for (var i = 0; i < songs.length; i++) {
    if(newSong.title == songs[i].title && newSong.artist == songs[i].artist){
      return true;
      }
    }
  return false;
  }

  function checkForBlankField(newSong){
    if(newSong.title == "" || newSong.artist == ""){
      return true;
    }
  }

  function addDate(newSong, date){
    newSong.dateAdded = date;
  }

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  var currentDate = new Date();
  //songs.push(newSong);
  if(checkForBlankField(newSong)){
    res.sendStatus(400);
  } else {
      if(checkDuplicate(songs, newSong)){
        console.log("duplicate");
        res.sendStatus(400);
      } else {
        console.log("NOT a duplicate");
          addDate(newSong, currentDate);
          console.log(newSong);
          songs.push(newSong);
          res.sendStatus(201);
      }
    }
  // created new resource

});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});

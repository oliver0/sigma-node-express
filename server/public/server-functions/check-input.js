// Prevent user from adding duplicate songs
function checkDuplicate(songs, newSong){
  for (var i = 0; i < songs.length; i++) {
    if(newSong.title == songs[i].title && newSong.artist == songs[i].artist){
      return true;
      }
    }
  return false;
  }

// Prevent user from adding blank fields
function checkForBlankField(newSong){
  if(newSong.title == "" || newSong.artist == ""){
      return true;
    }
  }

module.exports.checkDuplicate = checkDuplicate;
module.exports.checkForBlankField = checkForBlankField;

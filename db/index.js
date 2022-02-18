const fs = require('fs');
const path = require('path');

class NoteActions{

  getNotes() {
    return new Promise ((resolve, reject) => {
      fs.readFile("db/db.json", "utf8", function (err, data) {
        if(err) {
          console.log(err);
          resolve([])
        }
        resolve(JSON.parse(data));
      })
    })
  };
  
  addNote (noteObj) {
    return new Promise((resolve, reject) => {
      fs.writeFile('db/db.json', JSON.stringify(noteObj), function (err, data) {
        if(err) {
          console.log(err);
          resolve('Failed to add note')
        }
        resolve("Success in adding new note");
    })
    });
  };
  // deleteNote(noteObj) {
    //loop through each note object and check and make sure != id
    //first read db (getnotes) then pass note object to be deleted (use filter method to check Ids of current notes)
    //.filter(note => note.id != id)
  // };
};
module.exports = new NoteActions();
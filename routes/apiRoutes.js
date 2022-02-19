const router = require('express').Router();
const dbNotes = require('../db/index');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const db = require('../db/index');

// GET /api/notes should read the db.json file and return all saved notes as JSON.

router.get('/notes', (req, res) => {
  dbNotes
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

router.post('/notes', (req, res) => {
  const  {title, text} = req.body;
  dbNotes
    .getNotes()
    .then((notes) => {
      const parsedNotes = notes;
      // console.log(notes);
      const newNote = {
        title: title,
        text: text,
        id: uuidv4()
      }
      // console.log(newNote)
      parsedNotes.push(newNote);
      // console.log(parsedNotes);
      dbNotes.addNote(parsedNotes)
      .then (result => {
        console.log(res.json(result));
      })
    })
    // .addNote(req.body)
    // .then((note) => res.json(note))
    // .catch((err) => res.status(500).json(err));
});


//FOR THE FUTURE IF I EVER DECIDE TO TRY AND ADD DELETE FUNCTION
// //DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// router.delete('/notes/:id', (req, res) => {
//   dbNotes
//     .deleteNote(req.params.id)
//     .then(() => res.json({ ok: true }))
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
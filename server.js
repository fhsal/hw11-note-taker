  
// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app and using process.env port so that Heroku can assign port or use 3000 (locally)

const app = express();
const PORT = process.env.PORT || 3300;

// setting up express and routes 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// database route

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// retrieve note from db.JSON based upon selected id 

app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

// home page

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// posting new notes using a ID # using a random number generator, updating 
// existing notes and then appending new note and re-saving the JSON to db

app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteID =     Math.floor(Math.random()*1000);
    newNote.id = noteID;
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

// delete note based upon filtering the savedNotes array excluding the ID of the selected note 

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;

    console.log('current local notes: ' + JSON.stringify(savedNotes))
    console.log('note to be deleted = id# ' +  (noteID))
    
    savedNotes = savedNotes.filter(selectedNote => {
        return selectedNote.id != noteID;
    })

    console.log('updated local notes: ' + JSON.stringify(savedNotes));

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  


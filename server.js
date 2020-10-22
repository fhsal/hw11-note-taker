  
// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


// Initialize express app
const app = express();
const PORT = 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
const mainDir = path.join(__dirname, "/public");

app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    // let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

// posting new notes using a ID # using the index, updating 
// existing notes and then appending new note and re-saving the JSON to db


app.post("/api/notes", function(req, res) {
    // let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let noteID = savedNotes.length;
    // let noteID =     Math.floor(Math.random()*1000);
    newNote.id = noteID;
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    // let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    savedNotes = savedNotes.splice(noteID, 1);



    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})







// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  





// module.exports = app => {

//     // Setup notes variable
//     fs.readFile("db/db.json","utf8", (err, data) => {

//         if (err) throw err;

//         var notes = JSON.parse(data);

//         // API ROUTES
//         // ========================================================
    
//         // Setup the /api/notes get route
//         app.get("/api/notes", function(req, res) {
//             // Read the db.json file and return all saved notes as JSON.
//             res.json(notes);
//         });

//         // Setup the /api/notes post route
//         app.post("/api/notes", function(req, res) {
//             // Receives a new note, adds it to db.json, then returns the new note
//             let newNote = req.body;
//             notes.push(newNote);
//             updateDb();
//             return console.log("Added new note: "+newNote.title);
//         });

//         // Retrieves a note with specific id
//         app.get("/api/notes/:id", function(req,res) {
//             // display json for the notes array indices of the provided id
//             res.json(notes[req.params.id]);
//         });

//         // Deletes a note with specific id
//         app.delete("/api/notes/:id", function(req, res) {
//             notes.splice(req.params.id, 1);
//             updateDb();
//             console.log("Deleted note with id "+req.params.id);
//         });

//         // VIEW ROUTES
//         // ========================================================

//         // Display notes.html when /notes is accessed
//         app.get('/notes', function(req,res) {
//             res.sendFile(path.join(__dirname, "../public/notes.html"));
//         });
        
//         // Display index.html when all other routes are accessed
//         app.get('*', function(req,res) {
//             res.sendFile(path.join(__dirname, "../public/index.html"));
//         });

//         //updates the json file whenever a note is added or deleted
//         function updateDb() {
//             fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
//                 if (err) throw err;
//                 return true;
//             });
//         }

//     });

// }

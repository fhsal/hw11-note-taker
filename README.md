## HW 11 - Express Note Taker

## Summary

This assignment involved building routes and supplementing code already provided for a note-taking application so that it is fully functional and can be deployed on Heroku. 

The front-end code had already been built and a directory structure for the html, js and db object files was provided.  Functionally, the provided code enabled entry, saving and display of notes, but lacked the ability to delete a selected note - which had to be added as part of building the back-end and integration. 

The application uses Express and is deployed on Heroku and this link:  https://fhs-note-taker.herokuapp.com/ .    Here is a screen shot of the working application :

![img](https://github.com/fhsal/hw11-note-taker/blob/master/note-taker-screenshot.jpg)

Several components are used in the application, built around the structure provided where html, js and data are stored within a pre-defined folder structure, they are:

(1) Notes are stored in a JSON file called 'db' - this was extended to include a note 'id' so that individual notes could be targeted for deletion.  The id is created from a random number generator, to avoid problems with using other potential approaches, such as index which have the potential to be duplicated as one works with the app.  A route was built to get and post to this folder and JSON file. 

(2) The html and js to drive the front-end are in their own folder structure and remain unchanged.  Routes were built to get and post to these folders and files. 

(3) The dependencies for fs, express and path were added and ports for local and Heroku established

(4) The create/save/post function was built using a randomly generated numeric ID - which is appended to the existing set of notes and saved into the db.JSON file.  

(5) Notes are displayed by being retrievd from the db.JSON using the get route created. 

(6) The delete function was created using the id passed from the front-end to target filtering the notes read from the db.JSON file, which then saves the updated file afterwards. 

****************************************  

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.

## Acceptance Criteria

Application should allow users to create and save notes.

Application should allow users to view previously saved notes.

Application should allow users to delete previously saved notes.



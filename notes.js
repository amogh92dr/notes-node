const _ = require('lodash');
const fs = require('fs');

var fetchNotes = ()=>{
  try {
    return JSON.parse(fs.readFileSync('./playground/data-notes.json'));
  } catch(e){
    return [];
  }
};
var saveNotes = (notes) =>{
fs.writeFileSync('./playground/data-notes.json',JSON.stringify(notes));
}
var addNote = (title,body)=>{
var notes = fetchNotes();
var note = {
  title: title,
  body: body
};

var duplicateNotes = notes.filter((note) => note.title === title);
if(duplicateNotes.length === 0){
  notes.push(note);
  saveNotes(notes);
  return true;
}
else
  return false;
},
getAll = ()=>{
  return fetchNotes();
},
getNote = (title)=>{
var notes = fetchNotes()
var note = _.find(notes, function(o) { return o.title === title });
return note ? note : false;
},
removeTitle = (title)=>{
  var notes = fetchNotes();
  newnotes = notes.filter((note) => note.title != title);
  saveNotes(newnotes);
  return notes.length !== newnotes.length;
},
logNote = (notes)=>{
  debugger;
  console.log('-----');
  console.log(notes.title);
  console.log(notes.body);
}

module.exports = {
  addNote,
  getAll,
  removeTitle,
  getNote,
  logNote
}

const fs = require('fs');
const {addNote, getAll, getNote, removeTitle,logNote} = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');
const titleOptions =  {
  describe: "Title of the note",
  alias: "t",
  demand: true
}
const bodyOptions = {
  describe: "Body of the note",
  alias: "b",
  demand: true
}
const argv = yargs
.command('add','Add a note',{
  title: titleOptions,
  body: bodyOptions
})
.command('list','List all the saved notes')
.command('read','Read a specific note',{
  title: titleOptions
})
.command('remove','Delete a specific note',{
  title: titleOptions
})
.argv;
const command = process.argv[2];
switch (command)
{
  case 'list':var notes = getAll();
    notes.forEach(note => console.log(note.title));
    break;
  case 'add':var addStatus = addNote(argv.title, argv.body);
      addStatus? console.log('Added the note Successfully'): console.log('Could not add the file');
    break;
  case 'remove': var removeStatus = removeTitle(argv.title);
    removeStatus? console.log('Removed the note Successfully'): console.log('Note not found');
    break;
  case 'read': var note = getNote(argv.title);
      if(note){
        logNote(note);
      }
      else
        console.log('Note not found');
    break;
  default: console.log('Command not recognized');
    break;
}

import { makeId } from './utilService.js';
import { storageService } from './storageService.js';
import getDefaultNotes from './defaultNotesService.js';

export default {
  query,
  save,
};

const STORAGE_KEY = 'notes';
const gDefaultNotes = getDefaultNotes();
let gNotes = null;
createNotes();

function createNotes() {
  gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
  storageService.store(STORAGE_KEY, gNotes);
}

function creatTextNote() {
// TODO
}

function save(noteToSave) {
  console.log('note to save', noteToSave)
  console.log('gNotes[0]', gNotes[0]);
  const savedNote = noteToSave;
  const noteIdx = getIdxById(noteToSave.id);
  gNotes[noteIdx] = noteToSave;
  // console.log(gNotes[0].info.txt)
  storageService.store(STORAGE_KEY, gNotes);
  // return Promise.resolve(savedNote);
  return Promise.resolve();
}

function query(searchStr) {
  if (!gNotes) gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
  let notes = gNotes;
  notes = notes.filter((note) => {
    if (note.info.txt) {
      return note.info.txt.includes(searchStr);
    }
    if (note.info.todos) {
      let match = false;
      note.info.todos.forEach((todo) => {
        if (todo.txt.includes(searchStr)) {
          match = true;
        }
      });
      return match;
    }
    return false;
  });
  return Promise.resolve(notes);
}

function remove(noteId) {
  const noteIdx = getIdxById(noteId);
  gNotes.splice(noteIdx, 1);
  storageService.store(STORAGE_KEY, gNotes);
  return Promise.resolve();
}

function getById(noteId) {
  return Promise.resolve(gNotes.find(b => b.id === noteId));
}

function getIdxById(noteId) {
  return gNotes.findIndex(note => note.id === noteId);
}

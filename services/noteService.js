import { makeId } from './utilService.js';
import { storageService } from './storageService.js';
import getDefaultNotes from './defaultNotesService.js';

export default {
  query,
  save,
  createTextNote,
  createImageNote,
  remove,
};

const STORAGE_KEY = 'notes';
const gDefaultNotes = getDefaultNotes();
let gNotes = null;
createNotes();

function createNotes() {
  gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
  storageService.store(STORAGE_KEY, gNotes);
}

function createTextNote(txt) {
  const newNote = {
    id: makeId(12),
    type: 'NoteText',
    isPinned: false,
    color: 'white',
    info: {
      txt,
    },
    lastModified: Date.now(),
  };
  gNotes.push(newNote);
  storageService.store(STORAGE_KEY, gNotes);
  return Promise.resolve(newNote);
}

function createImageNote(url) {
  const newNote = {
    id: makeId(12),
    type: 'NoteImg',
    isPinned: false,
    color: 'white',
    info: {
      title: 'Click to edit title',
      url,
    },
    lastModified: Date.now(),
  };
  gNotes.push(newNote);
  storageService.store(STORAGE_KEY, gNotes);
  return Promise.resolve(newNote);
}

function save(noteToSave) {
  const noteIdx = getIdxById(noteToSave.id);
  gNotes[noteIdx] = noteToSave;
  storageService.store(STORAGE_KEY, gNotes);
  return Promise.resolve();
}

function query(searchStr) {
  if (!gNotes) gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
  let notes = gNotes;
  notes = notes.filter((note) => {
    if (note.info.txt) {
      return note.info.txt.toLowerCase().includes(searchStr.toLowerCase());
    }
    if (note.info.title) {
      return note.info.title.toLowerCase().includes(searchStr.toLowerCase());
    }
    if (note.info.todos) {
      let match = false;
      note.info.todos.forEach((todo) => {
        if (todo.txt.toLowerCase().includes(searchStr.toLowerCase())) {
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

// function getById(noteId) {
//   return Promise.resolve(gNotes.find(b => b.id === noteId));
// }

function getIdxById(noteId) {
  return gNotes.findIndex(note => note.id === noteId);
}

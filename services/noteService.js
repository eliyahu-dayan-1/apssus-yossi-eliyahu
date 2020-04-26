import { makeId } from './utilService.js';
import { storageService } from './storageService.js';
import getDefaultNotes from './defaultNotesService.js';

export default {
  query,
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
  const savedNote = noteToSave;
  const noteIdx = getIdxById(noteToSave.id);
  gNotes[noteIdx] = noteToSave;
  storageService.store(STORAGE_KEY, gNotes);
  return Promise.resolve(savedNote);
}

function query(filterBy) {
  if (!gNotes) gNotes = storageService.load(STORAGE_KEY, gDefaultNotes);
  let notes = gNotes;
  if (filterBy) {
    const { title } = filterBy;
    notes = gNotes.filter(note => note.info.txt.includes(title));
  }
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

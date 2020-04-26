import { makeId } from './utilService.js';
import { storageService } from './storageService.js';

export default {
  query,
};

const STORAGE_KEY = 'notes';
const gDefaultNotes = [
  {
    id: 'T_jj54If45Hii',
    type: 'NoteText',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
    id: 'z2gf2eef25sri',
    type: 'NoteImg',
    info: {
      url: 'http://some-img/me',
      title: 'Me playing Mi',
    },
    style: {
      backgroundColor: '#00d',
    },
  },
  {
    id: 'psa4_nnytre11',
    type: 'NoteTodos',
    info: {
      label: 'How was it:',
      todos: [
        { txt: 'Do that', doneAt: null },
        { txt: 'Do this', doneAt: 187111111 },
      ],
    },
  },
];
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

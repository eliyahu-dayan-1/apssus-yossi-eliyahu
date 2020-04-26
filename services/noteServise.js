/* eslint-disable no-underscore-dangle */
import getDefaultBooks from './getDefaultBooks.js';
import { makeId } from './utilService.js';
import storageService from './storageService.js';

export default {
  query,
  save,
  remove,
  getById,
  searchGoogleBooks,
  addGoogleBook,
};

const STORAGE_KEY = 'books';
const API_KEY = 'AIzaSyCkyFv2kU_JQvfmTtNxt3vSIr7QRDs3CLU';
const gDefaultBooks = getDefaultBooks();
let gBooks = null;
createBooks();

function getQueryUrl(queryTxt) {
  return `https://www.googleapis.com/books/v1/volumes?q=${queryTxt}&key=${API_KEY}`;
}

function searchGoogleBooks(queryTxt) {
  return fetch(getQueryUrl(queryTxt))
    .then(res => res.json())
    .then((data) => {
      return Promise.resolve(data);
    });
  // return Promise.resolve(exampleData);
}

function createBooks() {
  gBooks = storageService.load(STORAGE_KEY, gDefaultBooks);
  storageService.store(STORAGE_KEY, gBooks);
}

function createBook(
  id,
  title,
  subtitle,
  authors,
  publishedDate,
  description,
  pageCount,
  categories,
  thumbnail,
  language,
  amount,
  currencyCode,
  isOnSale,
) {
  return {
    id: id || makeId(11),
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    listPrice: {
      amount,
      currencyCode,
      isOnSale,
    },
  };
}

function save(bookToSave) {
  const savedBook = bookToSave;
  if (bookToSave.id) {
    const bookIdx = getIdxById(bookToSave.id);
    gBooks[bookIdx] = bookToSave;
  } else {
    const {
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail,
      language,
    } = bookToSave;
    const {
      amount,
      currencyCode,
      isOnSale,
    } = bookToSave.listPrice;
    const newbook = createBook(
      title,
      subtitle,
      authors,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail,
      language,
      amount,
      currencyCode,
      isOnSale,
    );
    gBooks.push(newbook);
  }
  storageService.store(STORAGE_KEY, gBooks);
  return Promise.resolve(savedBook);
}

function addGoogleBook(googleBook) {
  // console.log(googleBook)
  const { id, volumeInfo } = googleBook;
  const {
    title,
    publishedDate,
    pageCount,
    imageLinks,
    language,
  } = volumeInfo;
  const { thumbnail } = imageLinks;
  const subtitle = volumeInfo.subtitle || 'no subtitle';
  const description = volumeInfo.description || 'no description';
  const authors = volumeInfo.authors || [];
  const categories = volumeInfo.categories || [];
  const amount = 100;
  const currencyCode = 'ILS';
  const isOnSale = false;
  const formattedBook = createBook(
    id,
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    amount,
    currencyCode,
    isOnSale,
  );
  gBooks.push(formattedBook);
  save(formattedBook);
}

function query(filterBy) {
  if (!gBooks) gBooks = storageService.load(STORAGE_KEY, gDefaultBooks);
  let books = gBooks;
  if (filterBy) {
    const { title } = filterBy;
    let { maxPrice, minPrice } = filterBy;
    maxPrice = maxPrice || Infinity;
    minPrice = minPrice || 0;
    books = gBooks.filter(book => book.title.includes(title)
        && (book.listPrice.amount < maxPrice)
        && book.listPrice.amount > minPrice);
  }
  return Promise.resolve(books);
}

function remove(bookId) {
  const bookIdx = getIdxById(bookId);
  gBooks.splice(bookIdx, 1);
  storageService.store(STORAGE_KEY, gBooks);
  return Promise.resolve();
}

function getById(bookId) {
  return Promise.resolve(gBooks.find(b => b.id === bookId));
}

function getIdxById(bookId) {
  return gBooks.findIndex(book => book.id === bookId);
}

const exampleData = [
  {
    type: 'NoteText',
    isPinned: true,
    info: {
      txt: 'Fullstack Me Baby!',
    },
  },
  {
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

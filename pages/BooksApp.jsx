import bookService from '../services/bookService.js';
import BookList from '../cmps/books/BookList.jsx';
import BookFilter from '../cmps/books/BookFilter.jsx';

const { Link } = ReactRouterDOM;

export default class BooksApp extends React.Component {
  state = {
    books: null,
    filterBy: null,
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    bookService.query(this.state.filterBy)
      .then(books => this.setState({ books }));
  }

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.loadBooks());
  }

  onDelete = (bookId) => {
    bookService.remove(bookId)
      .then(() => this.loadBooks());
  }

  render() {
    const { books, filterBy } = this.state;
    return (
      <main className="books-page-container">
        <Link to="/book/add">Add Book</Link>
        <BookFilter filterBy={ filterBy } onSetFilter={ this.onSetFilter }/>
        { books && <BookList books={ books }></BookList> }
      </main>
    );
  }
}

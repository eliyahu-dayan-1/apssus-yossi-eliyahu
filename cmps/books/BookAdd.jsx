import bookService from '../../services/bookService.js';
import eventBus from '../../services/eventBusService.js';

export default class BookAdd extends React.Component {
  state = {
    books: [],
    queryTxt: '',
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    bookService.searchGoogleBooks(value)
      .then(({ items }) => {
        this.setState(prevState => ({
          ...prevState,
          books: items || [],
          [name]: value,
        }));
      });
  }

  addBook(e, book) {
    e.preventDefault();
    bookService.addGoogleBook(book);
    const { id, volumeInfo } = book;
    const { title } = volumeInfo;
    this.props.history.push(`/book/${id}/${title}`);
    eventBus.emit('show-msg', { txt: 'The book has been successfully added!', type: 'success' });
  }

  getBook(book) {
    return (
      <li className="book-search-item" key={ book.id }>
        { book.volumeInfo.title }
        <button className="add-book-button" onClick={ e => this.addBook(e, book) }></button>
      </li>
    );
  }

  render() {
    const { queryTxt, books } = this.state;
    return (
      <main className="add-book-container">
        <div className="add-book-inner">
          <h2 className="add-book-title">Add Book</h2>
          <input className="books-search-input" type="text" autoFocus name="queryTxt" value={ queryTxt } onChange={ this.handleInput }/>
          <ul>
            { books.map(book => this.getBook(book)) }
          </ul>
          <button className="back-button" onClick={ () => { this.props.history.goBack(); } }></button>
        </div>
      </main>
    );
  }
}

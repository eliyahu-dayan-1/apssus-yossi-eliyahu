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
          books: items,
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
      <li key={ book.id }>
        { book.volumeInfo.title }
        <button onClick={ e => this.addBook(e, book) }>+</button>
      </li>
    );
  }

  render() {
    const { queryTxt, books } = this.state;
    return (
      <div>
        <h2>Add Book</h2>
        <input className="books-search-input" type="text" autoFocus name="queryTxt" value={ queryTxt } onChange={ this.handleInput }/>
        <ul>
          { books.map(book => this.getBook(book)) }
        </ul>
        <button onClick={ () => { this.props.history.goBack(); } }>Back</button>
      </div>
    );
  }
}

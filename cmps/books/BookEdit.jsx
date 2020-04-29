/* eslint-disable no-console */
import bookService from '../../services/bookService.js';

export default class BookEdit extends React.Component {
  state = {
    book: {
      title: '',
      subtitle: '',
      authors: [],
      publishedDate: 0,
      description: '',
      pageCount: 0,
      categories: [],
      thumbnail: '',
      language: '',
      listPrice: {
        amount: 0,
        currencyCode: '',
        isOnSale: '',
      },
    },
  }

  componentDidMount() {
    const bookId = this.props.match.params.theBookId;
    if (bookId) {
      bookService.getById(bookId)
        .then(book => this.setState({ book }));
    }
  }

  handleInput = ({ target }) => {
    const field = target.name;
    const value = (target.type === 'number') ? +target.value : target.value;
    if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {
      this.setState(prevState => ({
        book: {
          ...prevState.book,
          listPrice: {
            ...prevState.book.listPrice,
            [field]: value,
          },
        },
      }));
    } else if (field === 'authors' || field === 'categories') {
      this.setState(prevState => ({
        book: {
          ...prevState.book,
          [field]: value.split(', '),
        },
      }));
    } else {
      this.setState(prevState => ({
        book: {
          ...prevState.book,
          [field]: value,
        },
      }));
    }
  }

  onSaveBook = (ev) => {
    ev.preventDefault();
    bookService.save(this.state.book)
      .then((/* savedBook */) => {
        // console.log('Book succesfuly saved:', savedBook);
        this.props.history.push('/book');
      })
      .catch(err => console.log('OOPs', err));
  }


  render() {
    const { book } = this.state;
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
      listPrice,
    } = book;
    const {
      amount,
      currencyCode,
      isOnSale,
    } = listPrice;
    return (
      <main className="edit-book-container">
        <div className="edit-book-inner">
          <h2 className="edit-book-title">Edit Book:</h2>
          <form onSubmit={ this.onSaveBook }>
            <div className="edit-book-row">
              <label>Title</label>
              <input autoFocus type="text" value={ title } placeholder="Book Name" onChange={ this.handleInput } name="title" />
            </div>
            <div className="edit-book-row">
              <label>Subtitle</label>
              <input type="text" value={ subtitle } placeholder="Book Subtitle" onChange={ this.handleInput } name="subtitle" />
            </div>
            <div className="edit-book-row">
              <label>Authors</label>
              <input type="text" value={ authors.join(', ') } placeholder="Book Authors" onChange={ this.handleInput } name="authors" />
            </div>
            <div className="edit-book-row">
              <label>Published: </label>
              <input type="number" value={ publishedDate || '' } placeholder="Published Year" onChange={ this.handleInput } name="publishedDate" />
            </div>
            <div className="edit-book-row">
              <label>Description</label>
              <input type="text" value={ description } placeholder="Book Description" onChange={ this.handleInput } name="description" />
            </div>
            <div className="edit-book-row">
              <label>Page count: </label>
              <input type="number" value={ pageCount || '' } placeholder="Page Count" onChange={ this.handleInput } name="pageCount" />
            </div>
            <div className="edit-book-row">
              <label>Categories</label>
              <input type="text" value={ categories.join(', ') } placeholder="Book Categories" onChange={ this.handleInput } name="categories" />
            </div>
            <div className="edit-book-row">
              <label>Preview image</label>
              <input type="text" value={ thumbnail } placeholder="Preview URL" onChange={ this.handleInput } name="thumbnail" />
            </div>
            <div className="edit-book-row">
              <label>language</label>
              <input type="text" value={ language } placeholder="Book Language" onChange={ this.handleInput } name="language" />
            </div>
            <div className="edit-book-row">
              <label>Price</label>
              <input type="number" value={ amount || '' } placeholder="Book Price" onChange={ this.handleInput } name="amount" />
            </div>
            <div className="edit-book-row">
              <label>Currency code</label>
              <input type="text" value={ currencyCode } placeholder="Currency code" onChange={ this.handleInput } name="currencyCode" />
            </div>
            <div className="edit-book-row">
              <label>Is book on sale?</label>
              <input type="checkbox" value={ isOnSale } onChange={ this.handleInput } name="isOnSale"/>
            </div>
            <div className="edit-book-buttons-row">
              <button className="back-button" onClick={ () => { this.props.history.goBack(); } } title="Back"></button>
              <button type="submit" className="save-button" title="Edit"></button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

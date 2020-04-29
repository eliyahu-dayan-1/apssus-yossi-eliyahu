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
      <div>
        <h1>Add Book:</h1>
        <form onSubmit={ this.onSaveBook }>
          <label>Title</label>
          <input autoFocus type="text" value={ title } placeholder="Book Name" onChange={ this.handleInput } name="title" />
          <label>Subtitle</label>
          <input type="text" value={ subtitle } placeholder="Book Subtitle" onChange={ this.handleInput } name="subtitle" />
          <label>Authors</label>
          <input type="text" value={ authors.join(', ') } placeholder="Book Authors" onChange={ this.handleInput } name="authors" />
          <label>Published: </label>
          <input type="number" value={ publishedDate || '' } placeholder="Published Year" onChange={ this.handleInput } name="publishedDate" />
          <label>Description</label>
          <input type="text" value={ description } placeholder="Book Description" onChange={ this.handleInput } name="description" />
          <label>Page Count: </label>
          <input type="number" value={ pageCount || '' } placeholder="Page Count" onChange={ this.handleInput } name="pageCount" />
          <label>Categories</label>
          <input type="text" value={ categories.join(', ') } placeholder="Book Categories" onChange={ this.handleInput } name="categories" />
          <label>Preview Image</label>
          <input type="text" value={ thumbnail } placeholder="Preview URL" onChange={ this.handleInput } name="thumbnail" />
          <label>language</label>
          <input type="text" value={ language } placeholder="Book Language" onChange={ this.handleInput } name="language" />
          <label>Price</label>
          <input type="number" value={ amount || '' } placeholder="Book Price" onChange={ this.handleInput } name="amount" />
          <label>Currency Code</label>
          <input type="text" value={ currencyCode } placeholder="Currency code" onChange={ this.handleInput } name="currencyCode" />
          <label>Is Book On Sale?</label>
          <input type="checkbox" value={ isOnSale } onChange={ this.handleInput } name="isOnSale"/>
          <button>Save</button>
          <button onClick={ () => { this.props.history.goBack(); } }>Back</button>
        </form>
      </div>
    );
  }
}

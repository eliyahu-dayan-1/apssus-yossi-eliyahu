/* eslint-disable no-console */
/* eslint-disable no-alert */
import { getCurrencySign } from '../../services/utilService.js';
import LongTxt from './LongTxt.jsx';
import bookService from '../../services/bookService.js';

export default class BookDetails extends React.Component {
  state = {
    isLongTxtShown: false,
    book: null,
  }

  componentDidMount() {
    const id = this.props.match.params.theBookId;
    bookService.getById(id)
      // .then((book)=> {
      //   console.log(book);
      //   return Promise.resolve(book);
      // })
      .then(book => this.setState({ book }));
  }

  removeBook = () => {
    bookService.remove(this.state.book.id)
      .then(() => {
        console.log('Book was removed');
        this.props.history.push('/book');
      })
      .catch((err) => {
        alert('OOPs, try again');
        console.log('ERR:', err);
      });
  }

  getAuthorsHTML(autor, i, autors) {
    if (i !== autors.length - 1) {
      return <span key={ i }>{autor}, </span>;
    }
    return <span key={ i }>{autor}.</span>;
  }

  getCategoriesHTML(category, i, categories) {
    if (i !== categories.length - 1) {
      return <span key={ i }>{category}, </span>;
    }
    return <span key={ i }>{category}.</span>;
  }

  getReadingHTML(pageCount) {
    if (pageCount < 100) return <span> - Light Reading</span>;
    if (pageCount > 200 && pageCount < 500) return <span> - Decent Reading</span>;
    if (pageCount > 500) return <span> - Long Reading</span>;
    return '';
  }

  getAgeHTML(publishedDate) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - publishedDate;
    if (age < 1) return <span> - New!</span>;
    if (age > 10) return <span> - Veteran Book!</span>;
    return '';
  }

  getColorClass(price) {
    if (price > 150) return 'red';
    if (price < 20) return 'green';
    return '';
  }

  onShowHideFullDescription(e) {
    e.preventDefault();
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
  }

  render() {
    const Loading = <p>Loading...</p>;
    const { book, isLongTxtShown } = this.state;
    if (!book) return Loading;
    const {
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
      listPrice,
    } = book;
    const {
      amount,
      currencyCode,
      isOnSale,
    } = listPrice;
    const currencySign = getCurrencySign(currencyCode);
    return (
      !book ? Loading :
      <main className="book-details-container">
        <div className="book-details-inner">
          <h2 className="book-details-title">{ title }</h2>
          <h3 className="book-details-subtitle">{ subtitle }</h3>
          <img className="book-details-image" src={ thumbnail } alt={ title } />
          <p className={ `book-info book-price ${this.getColorClass(amount)}` }>
            Price:&nbsp;
            { currencySign }
            { amount }
          </p>
          <p className="book-info book-id">Id: { id }</p>
          <p className="book-info book-authors">
            Authors:&nbsp;
            { authors.map(this.getAuthorsHTML) }
          </p>
          <p className="book-info book-published-date">Published: { publishedDate }{ this.getAgeHTML(publishedDate) }</p>
          <p className="book-info book-description">
            Description: { <LongTxt text={ description } isLongTxtShown={ isLongTxtShown }/> }
            { description.length > 99 && !isLongTxtShown &&
            <a className="read-more-link" onClick={ this.onShowHideFullDescription.bind(this) }>read more</a> }
            { description.length > 99 && isLongTxtShown &&
            <a className="hide-link" onClick={ this.onShowHideFullDescription.bind(this) }>hide</a> }
          </p>
          <p className="book-info book-page-count">Pages: { pageCount }{ this.getReadingHTML(pageCount) }</p>
          <p className="book-info book-categories">
            Categories:&nbsp;
            { categories.map(this.getCategoriesHTML) }
          </p>
          <p className="book-info book-page-count">language: { language }</p>
          { isOnSale && <img src="./assets/img/sale.png" className="sale-icon" /> }
          <button className="back-button" onClick={ () => { this.props.history.goBack(); } }></button>
        </div>
      </main>
    );
  }
}

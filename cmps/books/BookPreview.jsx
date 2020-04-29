import { getCurrencySign } from '../../services/utilService.js';

const { Link } = ReactRouterDOM;

export default function BookPreview({ book }) {
  const { id, title, thumbnail } = book;
  const { amount, currencyCode } = book.listPrice;
  const currencySign = getCurrencySign(currencyCode);
  return (
      <article className="book-preview">
        <Link className="book-preview-details-link" to={ `/book/${id}/${title}` } title="Book details">
          <img className="book-preview-image" src={ thumbnail } alt={ title } />
        </Link>
        <div className="book-preview-info">
          <h2 className="book-preview-title">{ title }</h2>
          <p className="book-preview-price">{ currencySign }{ amount }</p>
          <Link className="book-preview-edit-link" to={ `/book/edit/${id}` } title="Edit book"></Link>
        </div>
      </article>
  );
}

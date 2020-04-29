import { getCurrencySign } from '../../services/utilService.js';

const { Link } = ReactRouterDOM;

export default function BookPreview({ book }) {
  const { id, title, thumbnail } = book;
  const { amount, currencyCode } = book.listPrice;
  const currencySign = getCurrencySign(currencyCode);
  return (
      <article className="book-preview">
        <img className="book-preview-image" src={ thumbnail } alt={ title } />
        <p>title: { title }</p>
        <p>Price: { currencySign }{ amount }</p>
        <Link to={ `/book/${id}/${title}` }>Details</Link> |
        <Link to={ `/book/edit/${id}` }>Edit</Link>
      </article>
  );
}

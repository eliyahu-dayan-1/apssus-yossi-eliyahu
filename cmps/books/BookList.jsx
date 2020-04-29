import BookPreview from './BookPreview.jsx';

const { Link } = ReactRouterDOM;

export default function bookList({ books }) {
  return (
    <section className="book-list">
      { books.map(book =>
        <BookPreview key={ book.id } book={ book } />) }
      <Link className="book-preview add-book-link" to="/book/add">
        <img className="add-book-image" src="./assets/img/add-book.png" alt="Add book"/>
      </Link>
    </section>
  );
}

import BookPreview from './BookPreview.jsx';

export default function bookList({ books }) {
  return (
    <section className="book-list">
      { books.map(book =>
        <BookPreview key={ book.id } book={ book } />) }
    </section>
  );
}

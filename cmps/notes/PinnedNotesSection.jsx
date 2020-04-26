import Note from './Note.jsx';

export default class PinnedNotesSection extends React.Component {
  render() {
    const { notes } = this.props;
    return (
      <section className="pinned-notes-section">
        <h2 className="notes-section-header">Pinned</h2>
        <div className="pinned-notes-container">
          {notes
          .filter(note => note.isPinned)
          .map(note => <Note key={ note.id } note={ note } />)}
        </div>
      </section>
    );
  }
}

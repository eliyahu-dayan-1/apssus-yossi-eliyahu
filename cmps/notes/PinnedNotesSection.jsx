import Note from './Note.jsx';

export default class PinnedNotesSection extends React.Component {
  render() {
    const { notes } = this.props;
    return (
      <section className="pinned-notes-section">
        {notes
        .filter(note => note.isPinned)
        .map(note => <Note key={ note.id } note="note" />)}
      </section>
    );
  }
}

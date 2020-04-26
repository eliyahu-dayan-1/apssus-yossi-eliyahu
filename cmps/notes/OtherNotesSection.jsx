import Note from './Note.jsx';

export default class OtherNotesSection extends React.Component {
  render() {
    const { notes } = this.props;
    return (
      <section className="other-notes-section">
        <h2 className="notes-section-header">Others</h2>
        <div className="other-notes-container">
          {notes
          .filter(note => !note.isPinned)
          .map(note => <Note key={ note.id } note={ note } />)}
        </div>
      </section>
    );
  }
}

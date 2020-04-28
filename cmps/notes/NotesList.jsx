import NoteDynamicCmp from './NoteDynamicCmp.jsx';

export default class NotesList extends React.Component {
  render() {
    const { notes, searchTxt, headingTxt } = this.props;
    return (
      <section className="notes-section">
        <h2 className="notes-section-header">{ headingTxt }</h2>
        <div className="notes-container">
          {notes.map(note =>
            <NoteDynamicCmp key={ note.id } note={ note } searchTxt={ searchTxt } />)}
        </div>
      </section>
    );
  }
}

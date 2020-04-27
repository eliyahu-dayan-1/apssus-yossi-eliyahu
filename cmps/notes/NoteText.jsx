import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';

export default class NoteText extends React.Component {
  state = {
    note: {},
  }

  componentDidMount() {
    this.loadNote();
  }

  loadNote() {
    this.setState(prevState =>
      ({ ...prevState, note: this.props.note }));
  }

  togglePin = () => {
    this.setState(prevState =>
      ({ ...prevState, note: { ...prevState.note, isPinned: !prevState.note.isPinned } }), () => {
      noteService.save(this.state.note);
      eventBus.emit('search-notes', this.props.searchTxt);
    });
  }

  removeNote = () => {
    noteService.remove(this.state.note.id);
    eventBus.emit('search-notes', this.props.searchTxt);
  }

  handleChange = ({ target }) => {
    const txt = target.innerText;
    this.setState(prevState =>
      ({ ...prevState, note: { ...prevState.note, info: { txt } } }), () => {
      noteService.save(this.state.note);
    });
  }

  render() {
    const { note } = this.state;
    const { isPinned } = note;
    const { txt } = note.info || this.props.note.info;
    return (
      <article className="note text-note">
        <section
          className="note-content-section"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          onBlur={ this.handleChange }>
          {txt}
        </section>
        <section className="note-controls-section">
          <button className="toggle-pin-button" onClick={ this.togglePin }>
            {isPinned ? 'Unpin' : 'Pin'}
          </button>
          <button className="remove-note-button" onClick={ this.removeNote }>
            Delete
          </button>
        </section>
      </article>
    );
  }
}

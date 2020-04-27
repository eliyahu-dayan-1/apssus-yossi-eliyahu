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

  buttonStyle = () => {
    const { isPinned } = this.state.note;
    if (isPinned) {
      return {
        backgroundImage: "url('/assets/img/pin-black.png')",
      };
    }
    return {
      backgroundImage: "url('/assets/img/pin-gray.png')",
    };
  };

  render() {
    const { note } = this.state;
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
          <button className="toggle-pin-button" onClick={ this.togglePin } style={ this.buttonStyle() }></button>
          <button className="remove-note-button" onClick={ this.removeNote }></button>
        </section>
      </article>
    );
  }
}

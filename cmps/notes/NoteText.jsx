import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';

export default class NoteText extends React.Component {
  state = {
    // isContentEditable: false,
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

  // makeEditable = () => {
  //   this.setState(prevState =>
  //     ({ ...prevState, isContentEditable: true }));
  // }

  // unMakeEditable = () => {
  //   this.setState(prevState =>
  //     ({ ...prevState, isContentEditable: false }));
  // }

  handleChange = ({ target }) => {
    const txt = target.innerText;
    this.setState(prevState =>
      ({ ...prevState, note: { ...prevState.note, info: { txt } } }), () => {
      noteService.save(this.state.note);
    });
  }

  render() {
    const { isContentEditable, note } = this.state;
    // console.log(isContentEditable);
    const { isPinned } = note;
    const { txt } = note.info || this.props.note.info;
    return (
      <article className="note text-note">
        <section
          className="note-content-section"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          // onClick={ this.makeEditable }
          onBlur={ this.handleChange }>
          {txt}
        </section>
        <section className="note-controls-section">
          <button className="toggle-pin-button" onClick={ this.togglePin }>
            {isPinned ? 'Unpin' : 'Pin'}
          </button>
        </section>
      </article>
    );
  }
}

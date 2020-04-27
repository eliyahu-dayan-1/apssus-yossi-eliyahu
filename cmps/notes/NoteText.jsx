import noteService from '../../services/noteService.js';

export default class NoteText extends React.Component {
  state = {
    isContentEditable: false,
    note: {
      isPinned: false,
      info: {
        txt: '',
      },
    },
  }

  componentDidMount() {
    this.loadNote();
  }

  loadNote() {
    this.setState(prevState =>
      ({ ...prevState, note: this.props }));
  }

  togglePin = () => {
    this.setState(prevState =>
      ({ ...prevState, note: { ...prevState.note, isPinned: !prevState.note.isPinned } }));
  }

  makeEditable = () => {
    this.setState(prevState =>
      ({ ...prevState, isContentEditable: true }));
  }

  unMakeEditable = () => {
    this.setState(prevState =>
      ({ ...prevState, isContentEditable: false }));
  }

  handleChange = ({ target }) => {
    const txt = target.innerText;
    this.setState(prevState =>
      ({ ...prevState, note: { ...prevState.note, info: { txt } } }), () => {
      console.log('this state:', this.state)
      noteService.save(this.state.note)
        .then(this.loadNote());
    });
  }

  render() {
    // console.log(this.state)
    const { isContentEditable, note } = this.state;
    const { isPinned } = note;
    const { txt } = note.info || this.props.note.info;
    return (
      <article className="note text-note">
        <section
          className="note-content-section"
          contentEditable={ isContentEditable }
          onClick={ this.makeEditable }
          onBlur={ this.handleChange }>
          {txt}
        </section>
        <section className="note-controls-section">
          {/* <button className="toggle-pin-button" onClick={ this.togglePin }>
            {}
          </button> */}
        </section>
      </article>
    );
  }
}

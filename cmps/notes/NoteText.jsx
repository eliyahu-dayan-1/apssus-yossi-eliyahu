import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';
import Palette from '../notes/Palette.jsx';

export default class NoteText extends React.Component {
  state = {
    isPaletteShown: false,
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
      ({
        ...prevState,
        note: {
          ...prevState.note,
          isPinned: !prevState.note.isPinned,
          lastModified: Date.now(),
        },
      }), () => {
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
      ({
        ...prevState,
        note: {
          ...prevState.note,
          lastModified: Date.now(),
          info: { txt },
        },
      }), () => {
      noteService.save(this.state.note);
    });
  }

  togglePalette = () => {
    this.setState(prevState =>
      ({ ...prevState, isPaletteShown: !prevState.isPaletteShown }));
  }

  pinButtonStyle = () => {
    const { isPinned } = this.state.note;
    if (isPinned) {
      return {
        backgroundImage: "url('./assets/img/pin-black.png')",
      };
    }
    return {
      backgroundImage: "url('./assets/img/pin-gray.png')",
    };
  };

  paletteButtonStyle = () => {
    const { isPaletteShown } = this.state;
    if (isPaletteShown) {
      return {
        backgroundImage: "url('./assets/img/palette-gray.png')",
      };
    }
    return {
      backgroundImage: "url('./assets/img/palette-black.png')",
    };
  };

  changeColor = ({ target }) => {
    const { name } = target;
    this.setState(prevState =>
      ({
        ...prevState,
        isPaletteShown: false,
        note: {
          ...prevState.note,
          style: {
            ...prevState.note.style,
            backgroundColor: name,
          },
        },
      }), () => {
      noteService.save(this.state.note);
    });
  }

  render() {
    const { note, isPaletteShown } = this.state;
    const { info, style } = note;
    const { txt } = info || this.props.note.info;
    return (
      <article className="note text-note" style={ style }>
        <section
          className="note-content-section"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          onBlur={ this.handleChange }>
          {txt}
        </section>
        <section className="note-controls-section">
          <button className="toggle-pin-button" onClick={ this.togglePin } style={ this.pinButtonStyle() }></button>
          <button className="remove-note-button" onClick={ this.removeNote }></button>
          <button className="toggle-palette-button" onClick={ this.togglePalette } style={ this.paletteButtonStyle() }></button>
        </section>
        { isPaletteShown && <Palette changeColor={ this.changeColor } /> }
      </article>
    );
  }
}

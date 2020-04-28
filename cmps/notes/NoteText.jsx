import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';

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
        { isPaletteShown &&
          <section className="palette">
            <button name="white" className="white" title="White" onClick={ this.changeColor }></button>
            <button name="lightcoral" className="lightcoral" title="Red" onClick={ this.changeColor }></button>
            <button name="goldenrod" className="goldenrod" title="Orange" onClick={ this.changeColor }></button>
            <button name="khaki" className="khaki" title="Yellow" onClick={ this.changeColor }></button>
            <button name="palegreen" className="palegreen" title="Green" onClick={ this.changeColor }></button>
            <button name="paleturquoise" className="paleturquoise" title="Teal" onClick={ this.changeColor }></button>
            <button name="lightcyan" className="lightcyan" title="Blue" onClick={ this.changeColor }></button>
            <button name="lightblue" className="lightblue" title="Dark blue" onClick={ this.changeColor }></button>
            <button name="plum" className="plum" title="Purple" onClick={ this.changeColor }></button>
            <button name="mistyrose" className="mistyrose" title="Pink" onClick={ this.changeColor }></button>
            <button name="wheat" className="wheat" title="Brown" onClick={ this.changeColor }></button>
            <button name="lavender" className="lavender" title="Gray" onClick={ this.changeColor }></button>
          </section> }
      </article>
    );
  }
}

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

  togglePalette = () => {
    this.setState(prevState =>
      ({ ...prevState, isPaletteShown: !prevState.isPaletteShown }));
  }

  pinButtonStyle = () => {
    const { isPinned } = this.state.note;
    if (isPinned) {
      return {
        backgroundImage: "url('../assets/img/pin-black.png')",
      };
    }
    return {
      backgroundImage: "url('../assets/img/pin-gray.png')",
    };
  };

  paletteButtonStyle = () => {
    const { isPaletteShown } = this.state;
    if (isPaletteShown) {
      return {
        backgroundImage: "url('../assets/img/palette-gray.png')",
      };
    }
    return {
      backgroundImage: "url('../assets/img/palette-black.png')",
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
          color: name,
        },
      }), () => {
      noteService.save(this.state.note);
    });
  }

  noteStyle = () => {
    const { color } = this.state.note;
    const style = {};
    switch (color) {
      case 'white':
      default:
        style.backgroundColor = 'white';
        break;
      case 'red':
        style.backgroundColor = 'lightcoral';
        break;
      case 'orange':
        style.backgroundColor = 'goldenrod';
        break;
      case 'yellow':
        style.backgroundColor = 'khaki';
        break;
      case 'green':
        style.backgroundColor = 'palegreen';
        break;
      case 'teal':
        style.backgroundColor = 'paleturquoise';
        break;
      case 'blue':
        style.backgroundColor = 'lightcyan';
        break;
      case 'darkblue':
        style.backgroundColor = 'lightblue';
        break;
      case 'purple':
        style.backgroundColor = 'plum';
        break;
      case 'pink':
        style.backgroundColor = 'mistyrose';
        break;
      case 'brown':
        style.backgroundColor = 'wheat';
        break;
      case 'gray':
        style.backgroundColor = 'lavender';
        break;
    }
    return style;
  };

  render() {
    const { note, isPaletteShown } = this.state;
    const { txt } = note.info || this.props.note.info;
    return (
      <article className="note text-note" style={ this.noteStyle() }>
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
            <button name="white" className="white" onClick={ this.changeColor }></button>
            <button name="red" className="red" onClick={ this.changeColor }></button>
            <button name="orange" className="orange" onClick={ this.changeColor }></button>
            <button name="yellow" className="yellow" onClick={ this.changeColor }></button>
            <button name="green" className="green" onClick={ this.changeColor }></button>
            <button name="teal" className="teal" onClick={ this.changeColor }></button>
            <button name="blue" className="blue" onClick={ this.changeColor }></button>
            <button name="darkblue" className="darkblue" onClick={ this.changeColor }></button>
            <button name="purple" className="purple" onClick={ this.changeColor }></button>
            <button name="pink" className="pink" onClick={ this.changeColor }></button>
            <button name="brown" className="brown" onClick={ this.changeColor }></button>
            <button name="gray" className="gray" onClick={ this.changeColor }></button>
          </section> }
      </article>
    );
  }
}

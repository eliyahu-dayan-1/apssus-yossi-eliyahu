import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';
import Palette from '../notes/Palette.jsx';

export default class NoteImg extends React.Component {
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
      const { note } = this.state;
      noteService.save(note)
        .then(() => {
          eventBus.emit('search-notes', this.props.searchTxt);
          eventBus.emit('show-msg', { txt: note.isPinned ? 'Pinned!' : 'Unpinned!', type: 'success' });
        })
        .catch(() => eventBus.emit('show-msg', { txt: 'Something went wrong!', type: 'error' }));
    });
  }

  removeNote = () => {
    noteService.remove(this.state.note.id)
      .then(() => {
        eventBus.emit('search-notes', this.props.searchTxt);
        eventBus.emit('show-msg', { txt: 'Note has been successfully deleted!', type: 'success' });
      })
      .catch(() => eventBus.emit('show-msg', { txt: 'Something went wrong!', type: 'error' }));
  }

  handleChange = ({ target }) => {
    const title = target.innerText;
    this.setState(prevState =>
      ({
        ...prevState,
        note: {
          ...prevState.note,
          lastModified: Date.now(),
          info: {
            ...prevState.note.info,
            title,
          },
        },
      }), () => {
      noteService.save(this.state.note)
        .then(() => {
          eventBus.emit('search-notes', this.props.searchTxt);
          eventBus.emit('show-msg', { txt: 'Note has been successfully updated!', type: 'success' });
        })
        .catch(() => eventBus.emit('show-msg', { txt: 'Something went wrong!', type: 'error' }));
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
    const { title, url } = info || this.props.note.info;
    return (
      <article className="note image-note" style={ style }>
        <section
          className="note-title-section"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          onBlur={ this.handleChange }>
          <h3 className="note-title">{title}</h3>
        </section>
        <img className="note-image" src={ url } alt={ title } />
        <section className="note-controls-section">
          <button className="note-action-button toggle-pin-button" onClick={ this.togglePin } style={ this.pinButtonStyle() }></button>
          <button className="note-action-button remove-note-button" onClick={ this.removeNote }></button>
          <button className="note-action-button toggle-palette-button" onClick={ this.togglePalette } style={ this.paletteButtonStyle() }></button>
        </section>
        { isPaletteShown && <Palette changeColor={ this.changeColor } /> }
      </article>
    );
  }
}

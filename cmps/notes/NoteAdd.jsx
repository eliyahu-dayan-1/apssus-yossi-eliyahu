import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';

export default class NoteAdd extends React.Component {
  state = {
    type: 'NoteText',
    txt: null,
  }

  setType = ({ target }) => {
    const { name } = target;
    this.setState(prevState => ({ ...prevState, type: name }));
  }

  createNote = (e) => {
    e.preventDefault();
    const { type } = this.state;
    const txt = e.target.innerText;
    if (txt === '') return;
    this.setState(prevState =>
      ({ ...prevState, txt: null }), () => {
      if (type === 'NoteText') {
        noteService.createTextNote(txt)
          .then(() => {
            eventBus.emit('search-notes', this.props.searchTxt);
            this.setState(prevState =>
              ({ ...prevState, txt: '' }));
          });
      }
      if (type === 'NoteImg') {
        noteService.createImageNote(txt)
          .then(() => {
            eventBus.emit('search-notes', this.props.searchTxt);
            this.setState(prevState =>
              ({ ...prevState, txt: '' }));
          });
      }
      if (type === 'NoteVideo') {
        noteService.createVideoNote(txt)
          .then(() => {
            eventBus.emit('search-notes', this.props.searchTxt);
            this.setState(prevState =>
              ({ ...prevState, txt: '' }));
          });
      }
    });
  }

  render() {
    const { txt, type } = this.state;
    let placeholderText = '';
    if (type === 'NoteText') {
      placeholderText = 'Take a note...';
    }
    if (type === 'NoteImg') {
      placeholderText = 'Enter image URL...';
    }
    if (type === 'NoteVideo') {
      placeholderText = 'Enter YouTube video URL...';
    }
    return (
      <section className="add-note-section">
        <div
          className="add-note-input"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          onBlur={ this.createNote }
          placeholder={ placeholderText }>
          {txt}
        </div>
        <button name="NoteText" className="set-type-text-button" onClick={ this.setType }></button>
        <button name="NoteImg" className="set-type-image-button" onClick={ this.setType }></button>
        <button name="NoteVideo" className="set-type-video-button" onClick={ this.setType }></button>
      </section>
    );
  }
}

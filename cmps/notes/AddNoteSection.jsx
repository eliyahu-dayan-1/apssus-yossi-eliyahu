import noteService from '../../services/noteService.js';
import { eventBus } from '../../services/eventBusService.js';

export default class AddNoteSection extends React.Component {
  state = {
    type: 'NodeText',
    txt: '',
  }

  setTypeText = () => {
    this.setState(prevState => ({ ...prevState, type: 'NodeText' }));
  }

  handleChange = ({ target }) => {
    const txt = target.innerText;
    this.setState(prevState =>
      ({ ...prevState, txt }), () => {
      noteService.createTextNote(txt);
      eventBus.emit('search-notes', this.props.searchTxt);
    });
  }

  render() {
    const { txt } = this.state;
    return (
      <section className="add-note-section">
        {/* <input type="text" className="add-note-input" placeholder="Take a note..."/> */}
        <div
          className="add-note-input"
          contentEditable={ true }
          suppressContentEditableWarning={ true }
          onBlur={ this.handleChange }
          placeholder="Take a note...">
          {txt}
        </div>
        {/* <button
        className="set-type-text-button"
        onClick={ this.setTypeText }>
        Text Note
        </button> */}
      </section>
    );
  }
}

import NoteAdd from '../cmps/notes/NoteAdd.jsx';
import NotesList from '../cmps/notes/NotesList.jsx';
import noteService from '../services/noteService.js';
import { eventBus } from '../services/eventBusService.js';

export default class NotesPage extends React.Component {
  state = {
    notes: [],
    filter: {
      searchTxt: '',
    },
  }

  componentDidMount() {
    this.unsubscribeFromEventBus = eventBus.on('search-notes', searchTxt =>
      this.onSetFilter(searchTxt));
    this.loadNotes();
  }

  componentWillUnmount() {
    this.unsubscribeFromEventBus();
  }

  loadNotes() {
    noteService.query(this.state.filter.searchTxt)
      .then(notes => this.setState(prevState => ({ ...prevState, notes })));
  }

  onSetFilter = (searchTxt) => {
    this.setState(prevState => ({ ...prevState, filter: { searchTxt } }), () => this.loadNotes());
  }

  render() {
    const { notes, filter } = this.state;
    const { searchTxt } = filter;
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    return (
      <main className="notes-page-container">
        <NoteAdd searchTxt={ searchTxt } />
        <NotesList notes={ sortedNotes.filter(note => note.isPinned) } searchTxt={ searchTxt } headingTxt="Pinned" />
        <NotesList notes={ sortedNotes.filter(note => !note.isPinned) } searchTxt={ searchTxt } headingTxt="Others" />
      </main>
    );
  }
}

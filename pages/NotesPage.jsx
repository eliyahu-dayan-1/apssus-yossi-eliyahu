import AddNoteSection from '../cmps/notes/AddNoteSection.jsx';
import PinnedNotesSection from '../cmps/notes/PinnedNotesSection.jsx';
import OtherNotesSection from '../cmps/notes/OtherNotesSection.jsx';
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
    return (
      <main className="notes-page-container">
        <AddNoteSection />
        <PinnedNotesSection notes={ notes } searchTxt={ searchTxt } />
        <OtherNotesSection notes={ notes } searchTxt={ searchTxt } />
      </main>
    );
  }
}

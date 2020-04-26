// import NavBarNote from '../cmps/notes/NavBarNote.jsx';
import AddNoteSection from '../cmps/notes/AddNoteSection.jsx';
import PinnedNotesSection from '../cmps/notes/PinnedNotesSection.jsx';
import OtherNotesSection from '../cmps/notes/OtherNotesSection.jsx';
import noteService from '../services/noteService.js';

export default class NotesPage extends React.Component {
  state = {
    notes: [],
    filter: {
      searchTxt: '',
    },
  }

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes() {
    noteService.query(this.state.filterBy)
      .then(notes => this.setState(prevState => ({ ...prevState, notes })));
  }

  onSetFilter = (searchTxt) => {
    this.setState(prevState => ({ ...prevState, filter: { searchTxt } }), () => this.loadNotes());
  }

  render() {
    const { notes } = this.state;
    // console.log(notes)
    return (
      <main className="notes-page-container">
        <AddNoteSection />
        <PinnedNotesSection notes={ notes } />
        <OtherNotesSection notes={ notes } />
      </main>
    );
  }
}

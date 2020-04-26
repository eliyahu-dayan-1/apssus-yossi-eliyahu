// import NavBarNote from '../cmps/notes/NavBarNote.jsx';
import AddNoteSection from '../cmps/notes/AddNoteSection.jsx';
import PinnedNotesSection from '../cmps/notes/PinnedNotesSection.jsx';
import OtherNotesSection from '../cmps/notes/OtherNotesSection.jsx';

export default class NotePage extends React.Component {
  render() {
    return (
      <main className="note-page-container">
        <AddNoteSection />
        <PinnedNotesSection />
        <OtherNotesSection />
      </main>
    );
  }
}

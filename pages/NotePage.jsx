import NavBarNote from '../cmps/NavBarNote.jsx';
import AddNoteSection from '../cmps/AddNoteSection.jsx';
import PinnedNotesSection from '../cmps/PinnedNotesSection.jsx';
import OtherNotesSection from '../cmps/OtherNotesSection.jsx';

export default class NotePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBarNote />
        <main className="note-page-container">
          <AddNoteSection />
          <PinnedNotesSection />
          <OtherNotesSection />
        </main>
      </ React.Fragment>
    );
  }
}

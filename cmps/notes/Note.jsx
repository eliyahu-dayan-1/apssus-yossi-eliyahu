import NoteText from './NoteText.jsx';
import NoteImg from './NoteImg.jsx';
import NoteTodos from './NoteTodos.jsx';

const Note = (props) => {
  const { type } = props.note;
  switch (type) {
    case 'NoteText':
      return <NoteText { ...props } />;
    case 'NoteImg':
      return <NoteImg { ...props } />;
    case 'NoteTodos':
      return <NoteTodos { ...props } />;
    default:
      return '';
  }
};

export default Note;

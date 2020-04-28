import NoteText from './NoteText.jsx';
import NoteImg from './NoteImg.jsx';
import NoteTodos from './NoteTodos.jsx';
import NoteVideo from './NoteVideo.jsx';

const NoteDynamicCmp = (props) => {
  const { type } = props.note;
  // console.log(props);
  // console.log(type);
  switch (type) {
    case 'NoteText':
      return <NoteText { ...props } />;
    case 'NoteImg':
      return <NoteImg { ...props } />;
    case 'NoteTodos':
      return <NoteTodos { ...props } />;
    case 'NoteVideo':
      return <NoteVideo { ...props } />;
    default:
      return '';
  }
};

export default NoteDynamicCmp;

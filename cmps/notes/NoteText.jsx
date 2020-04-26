export default class NoteText extends React.Component {
  render() {
    const { txt } = this.props.note.info;
    // console.log(txt)
    return (
      <div className="note text-note">
        {txt}
      </div>
    );
  }
}

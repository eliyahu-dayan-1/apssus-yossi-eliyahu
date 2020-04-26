export default class NotesSearch extends React.Component {
  state = {
    filter: {
      searchStr: '',
    },
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const { value } = target;
    this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
    });
  }

  render() {
    const { searchStr } = this.state.filter;
    return (
      <input type="text" name="searchStr" value={ searchStr } className="search-notes-input" onChange={ this.handleChange } autoFocus />
    );
  }
}

import { eventBus } from '../../services/eventBusService.js';

export default class NotesSearch extends React.Component {
  state = {
    filter: {
      searchStr: '',
    },
  }

  onSearch = () => {
    eventBus.emit('search-notes', this.state.filter.searchStr);
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const { value } = target;
    this.setState(prevState =>
      ({ filter: { ...prevState.filter, [field]: value } }), () => this.onSearch());
  }

  render() {
    const { searchStr } = this.state.filter;
    return (
      <input
        type="text"
        name="searchStr"
        value={ searchStr }
        className="search-notes-input"
        onChange={ this.handleChange }
        placeholder="Search" />
    );
  }
}

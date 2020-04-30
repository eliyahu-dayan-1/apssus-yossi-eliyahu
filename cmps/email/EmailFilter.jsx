import { eventBus } from "../../services/eventBusService.js";

export class EmailFilter extends React.Component {

    state = {
        previewCategory: [],
        searchValue: '',
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ searchValue: value })
        )
    }

    onSearch = (ev) => {
        ev.preventDefault();
        console.log(this.state)
        eventBus.emit('show-msg', this.state);

    }

    onSelectSearchCategory = (ev) => {
        const userChoose = ev.target.value;
        this.setState(prevState => (
            { previewCategory: [userChoose] }
        ));
    }

    render() {
        const { searchValue } = this.state
        return (
            <form className="email-filter" onSubmit={this.onSearch}>
                <input className="search-input" type="text" name='searchValue' value={searchValue} onChange={this.handleChange} />
                <select id="search-option" onChange={(event) => { this.onSelectSearchCategory(event) }}>
                    <option value="">choose your option</option>
                    <option value="subject">Subject</option>
                    <option value="body">Body</option>
                    <option value="from">From</option>
                </select>
            </form>
        )
    }
}
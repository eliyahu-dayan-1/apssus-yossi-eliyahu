import { eventBus } from "../../services/eventBusService.js";

export class EmailFilter extends React.Component {

    state = {
        searchBy: '', 
        searchValue: '',
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ searchValue: value } )
        )}

    onSearch = (ev) => {
        ev.preventDefault()
        eventBus.emit('show-msg', this.state)
    }

    onSelectSearchCategory = (ev) => {
        const userChoose = ev.target.value;
        this.setState(prevState => (
            {searchBy: userChoose }
        ), () => console.log(this.state.searchBy));
    }

    render() {
        const { searchValue } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.onSearch}>
                    <input type="text" name='searchBy' value={searchValue} onChange={this.handleChange} />
                </form>
                <select id="search-option" onChange={(event) => { this.onSelectSearchCategory(event) }}>
                    <option value="">choose your option</option>
                    <option value="subject">Subject</option>
                    <option value="body">Body</option>
                    <option value="from">From</option>
                    <option value="audi">Audi</option>
                </select>
            </React.Fragment>
        )
    }
}
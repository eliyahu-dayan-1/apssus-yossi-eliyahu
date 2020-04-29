export default class Filter extends React.Component {
  state = {
    filter: {
      title: '',
      maxPrice: '',
      minPrice: '',
    },
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = (target.type === 'number') ? +target.value : target.value;

    this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
      this.props.onSetFilter(this.state.filter);
    });
  }

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filter);
  }

  render() {
    const { title, maxPrice, minPrice } = this.state.filter;
    return (
      <section className="books-filter-section">
        <form onSubmit={ this.onFilter }>
            <input className="books-filter-input" type="text" name="title" value={ title } placeholder="Title..." onChange={ this.handleChange } />
            <input className="books-filter-input" type="number" name="minPrice" value={ minPrice } placeholder="Min price..." onChange={ this.handleChange } />
            <input className="books-filter-input" type="number" name="maxPrice" value={ maxPrice } placeholder="Max price..." onChange={ this.handleChange } />
            <button className="books-filter-button" type="submit">Filter</button>
        </form>
      </section>
    );
  }
}

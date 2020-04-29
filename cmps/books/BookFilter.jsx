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
        <React.Fragment>
            <h1>Filter:</h1>
            <form onSubmit={ this.onFilter }>
                <label htmlFor="">By title</label>
                <input type="text" name="title" value={ title } onChange={ this.handleChange } />
                <label htmlFor="">min price</label>
                <input type="number" name="minPrice" value={ minPrice } onChange={ this.handleChange } />
                <label htmlFor="">max price</label>
                <input type="number" name="maxPrice" value={ maxPrice } onChange={ this.handleChange } />
                <button>Filter</button>
            </form>
        </React.Fragment>
    );
  }
}

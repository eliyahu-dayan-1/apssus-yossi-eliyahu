const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const history = History.createBrowserHistory();

export class EmailDetails extends React.Component {

    componentDidMount() {
        console.log(this.props)
    }

    componentDidUpdate() {
        console.log(this.props)
    }


  render() {
        return (
            
            <main>
                <h2>EmailDetails</h2>
            </main>
        )
    }
}
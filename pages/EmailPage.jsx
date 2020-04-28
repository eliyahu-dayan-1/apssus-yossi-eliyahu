const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;


import { eventBus } from "../services/eventBusService.js";
import { EmailList } from '../cmps/email/EmailList.jsx';
import { EmailDetails } from '../cmps/email/EmailDetails.jsx';
import { EmailNavBarSide } from '../cmps/email/EmailNavBarSide.jsx';



export default class EmailPage extends React.Component {
    state = {
        emailsToShow: null,
        selectedEmail: null,
        searchBy: '',
        searchValue: '',
    }

    componentDidMount(){
        eventBus.on('url-change', () => this.setState({}, () => console.log('setstate'))
        )
    }

    render() {

        return (
            <Router >
                <main className="email-main flex">
                    <EmailNavBarSide history={this.props.history} />

                    <Switch>
                        <Route component={EmailDetails} path="/:previewCategory/:emailId" />
                        <Route exact component={EmailList} path="/:previewCategory" />
                    </Switch>
                </main>
            </Router >
        )
    }
}

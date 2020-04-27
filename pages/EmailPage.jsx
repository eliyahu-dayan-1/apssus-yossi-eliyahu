const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const history = History.createBrowserHistory();


import { emailService } from '../services/emailService.js';
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


    componentDidMount() {
        this.loadEmails()
        eventBus.on('show-msg', (msg) => this.setState(prevState => msg, () => this.loadEmails())
        )
    }

    componentDidUpdate() {
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadEmails())
    }

    onSelectEmail = (selectedEmail) => {
        this.setState({ selectedEmail }, () => this.props.history.push(`/email/${selectedEmail}`))
    }

    onUnSelectEmail = () => {
        this.setState({ selectedEmail: null })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadEmails())
    }

    loadEmails() {
        emailService.query(this.state.searchValue, this.state.searchBy)
            .then(emailsToShow => {
                this.setState({ emailsToShow }, () => console.log(this.state.emailsToShow))
            })
    }



    render() {

        const { emailsToShow, selectedEmail } = this.state


        return (
            <Router >
                <main className="email-main flex">
                    <EmailNavBarSide />

                    <Switch>
                        <Route exact component={EmailList} path="/email/:previewType" />
                        <Route component={EmailDetails} path="/email/:previewType/:emailId" />
                    </Switch>
                </main>
            </Router >
        )
    }
}

{/* {selectedEmail && <EmailDetails selectedEmail={selectedEmail} />}
{!selectedEmail && emailsToShow && <EmailList onSelectEmail={this.onSelectEmail} emails={emailsToShow} />} */}

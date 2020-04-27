const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const history = History.createBrowserHistory();


import { emailService } from '../services/emailService.js';
import { EmailFilter } from '../cmps/email/EmailFilter.jsx';
import { EmailList } from '../cmps/email/EmailList.jsx';
import { EmailStatus } from '../cmps/email/EmailStatus.jsx';
import { EmailDetails } from '../cmps/email/EmailDetails.jsx';
import { EmailNevigationUp } from '../cmps/email/EmailNevigationUp.jsx';
import { EmailNevigationSide } from '../cmps/email/EmailNevigationSide.jsx';
import { eventBus } from "../services/eventBusService.js";



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

        const { emailsToShow, selectedEmail} = this.state


        return (

            <main>
                {<EmailNevigationUp />}
                {<EmailNevigationSide />}
                {emailsToShow && <EmailStatus />}
                
                {selectedEmail && <EmailDetails selectedEmail={selectedEmail} />}
                {!selectedEmail && emailsToShow && <EmailList onSelectEmail={this.onSelectEmail} emails={emailsToShow} />}
            </main>
        )
    }
}
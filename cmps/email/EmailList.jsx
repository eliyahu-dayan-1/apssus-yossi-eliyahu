const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const history = History.createBrowserHistory();

import { EmailPreview } from './EmailPreview.jsx'
import { Loading } from '../Loading.jsx'
import { emailService } from '../../services/emailService.js';
import { eventBus } from "../../services/eventBusService.js";
import { EmailNavBarUp } from '../../cmps/email/EmailNavBarUp.jsx';




export class EmailList extends React.Component {

    state = {
        emails: null,
        searchCategory: null,
        searchValue: null,
        selectedEmail: null,
    }

    componentDidMount() {
        console.log(this.props.match.params.previewType)
        this.loadEmails()
        eventBus.on('show-msg', (msg) => this.setState(prevState => msg, () => this.loadEmails())
        )
    }

    loadEmails() {
        emailService.query(this.state.searchValue, this.state.searchCategory)
            .then(emails => {
                this.setState({ emails }, () => console.log(this.state.emails))
            })
    }

    onSetFilter = (searchCategory) => {
        this.setState({ searchCategory }, () => this.loadEmails())
    }

    onSelectEmail = (selectedEmail) => {
        this.setState({ selectedEmail }, () => this.props.history.push(`/email/emails/${selectedEmail}`))
    }

    // onUnSelectEmail = () => {
    //     this.setState({ selectedEmail: null })
    // }


    componentDidUpdate() {
    }

    render() {
        const { emails } = this.state
        const { onSelectEmail } = this

        if (!emails) return <Loading />
        console.log(emails)
        return (
            <div className="email-list flex column grow-1">
                <EmailNavBarUp />
                <div className="emails-preview flex column">
                    {emails.map(email => <EmailPreview onSelectEmail={onSelectEmail} key={email.id} email={email} />)}
                </div>
            </div >
        )
    }
}
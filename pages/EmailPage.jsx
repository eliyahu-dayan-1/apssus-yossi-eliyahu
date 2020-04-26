const { Link } = ReactRouterDOM;


import { emailService } from '../services/emailService.js';
import { EmailFilter } from '../cmps/email/EmailFilter.jsx';
import { EmailList } from '../cmps/email/EmailList.jsx';
import { EmailStatus } from '../cmps/email/EmailStatus.jsx';


export default class EmailPage extends React.Component {
    state = {
        emailsToShow: null,
        selectedEmail: null,
        filterBy: null,
    }


    componentDidMount() {
        this.loadEmails()
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadEmails())
    }

    onSelectEmail = (selectedEmail) => {
        this.setState({ selectedEmail: selectedEmail })
    }

    onUnSelectEmail = () => {
        this.setState({ selectedEmail: null })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadEmails())
    }

    loadEmails() {
        emailService.query(this.state.filterBy)
            .then(emailsToShow => {
                this.setState({ emailsToShow }, () => console.log(this.state.emailsToShow))
            })

    }

    render() {

        const { emailsToShow, selectedEmail , filterBy } = this.state


        return (

            <main>
                {selectedEmail && <EmailStatus />}
                {!selectedEmail && emailsToShow && <EmailFilter />}
                {!selectedEmail && emailsToShow && <EmailList onSelectEmail={this.onSelectEmail} emails={emailsToShow} />}
            </main>
        )
    }
}
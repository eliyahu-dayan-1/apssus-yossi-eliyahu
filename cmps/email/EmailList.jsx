import { EmailPreview } from './EmailPreview.jsx'
import { Loading } from '../Loading.jsx'
import { emailService } from '../../services/emailService.js';
import { eventBus } from "../../services/eventBusService.js";
import { EmailNavBarUp } from '../../cmps/email/EmailNavBarUp.jsx';




export class EmailList extends React.Component {

    state = {
        emails: null,
        previewCategory: null,
        searchValue: null,
        selectedEmail: null,
    }

    componentDidMount() {
        const previewCategory = this.props.match.params.previewCategory
        console.log(previewCategory)
        this.setState({ previewCategory: [`is${this.capitalize(previewCategory)}`] }, () => {
            console.log(this.state.previewCategory)
            this.loadEmails()
        })

        eventBus.on('show-msg', (msg) => this.setState(prevState => msg, () => this.loadEmails())
        )
    }

    capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
    }

    loadEmails() {
        console.log(this.state)
        emailService.query(this.state.searchValue, this.state.previewCategory)
            .then(emails => {
                this.setState({ emails }, () => console.log(this.state.emails))
            })
            .catch(err => console.log(err))
    }

    onSetFilter = (previewCategory) => {
        this.setState({ previewCategory: [previewCategory] }, () => this.loadEmails())
    }

    onSelectEmail = (selectedEmail) => {
        // window.location.href += /${selectedEmail}
        this.setState({ selectedEmail }, () => this.props.history.push(`${this.state.previewCategory}/${selectedEmail}`))
        eventBus.emit('url-change', '')
    }

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
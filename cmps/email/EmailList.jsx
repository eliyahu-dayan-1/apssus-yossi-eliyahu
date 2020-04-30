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
        orderBy: { category: 'sentAt', direction: true }
    }

    componentDidMount() {
        this.loadEmails()
        eventBus.on('show-msg', (msg) => this.setState(prevState => {
            return {previewCategory: msg.previewCategory,
                     searchValue: msg.searchValue}
        }, () => this.loadEmails()))
    }


    componentDidUpdate(prevProps) {
        if (prevProps.match.params.previewCategory !== this.props.match.params.previewCategory) {
            this.loadEmails()
        }
    }

    capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    onToggleLabel = (ev, label, id) => {
        ev.stopPropagation();
        ev.preventDefault();
        emailService.toggleLabel(label, id)
            .then(() => this.loadEmails())
    }

    onDeleteMail = (ev, id) => {
        ev.stopPropagation()
        ev.preventDefault()
        emailService.deleteEmailById(id)
    }

    loadEmails = () => {
        let previewCategory = this.props.match.params.previewCategory
        previewCategory = [`is${this.capitalize(previewCategory)}`]
    
        emailService.query(this.state.searchValue, previewCategory, this.state.orderBy)
            .then(emails => {
                this.setState({ emails, previewCategory })
            })
    }

    onSetFilter = (previewCategory) => {
        this.setState({ previewCategory: [previewCategory] }, () => this.loadEmails())
    }

    onSelectEmail = (selectedEmail) => {
        const { pathname } = this.props.history.location
        this.setState({ selectedEmail }, () => this.props.history.push(`${pathname}/${selectedEmail}`))
        eventBus.emit('url-change', "")
    }



    render() {
        const { emails } = this.state
        const { onSelectEmail, onToggleLabel, onDeleteMail } = this

        if (!emails) return <Loading />

        return (
            <div className="email-list flex column grow-1">
                <EmailNavBarUp />
                <div className="emails-preview flex column">
                    {emails.map(email => <EmailPreview onDeleteMail={onDeleteMail} onToggleLabel={onToggleLabel} onSelectEmail={onSelectEmail} key={email.id} email={email} />)}
                </div>
            </div >
        )
    }
}
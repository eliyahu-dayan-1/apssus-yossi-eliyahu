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
        setPreviewCategory()
        eventBus.on('show-msg', (msg) => this.setState(prevState => msg, () => this.loadEmails()))
        eventBus.on('url-change', () => this.setPreviewCategory())
    }

    componentDidUpdate() {
    }

    setPreviewCategory = () => {
        const previewCategory = this.props.match.params.previewCategory
        this.setState({ previewCategory: [`is${this.capitalize(previewCategory)}`] }, () => {
            this.loadEmails()
        })
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
    }

    loadEmails = () => {
        console.log('load is here')
        emailService.query(this.state.searchValue, this.state.previewCategory)
            .then(emails => {
                this.setState({ emails }, () => console.log(this.state.emails))
            })
            .catch(err => console.log('cant load emails'))
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
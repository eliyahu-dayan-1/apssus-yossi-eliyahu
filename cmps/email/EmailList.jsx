import { EmailPreview } from './EmailPreview.jsx'


export function EmailList(props) {


    console.log(props.emails)
    return (
        <div className="emails-preview flex column">
            {props.emails.map(email => <EmailPreview onSelectEmail={props.onSelectEmail} key={email.id} email={email} />)}
        </div>
    )

}
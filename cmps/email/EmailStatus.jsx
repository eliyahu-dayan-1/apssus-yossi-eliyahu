import { Loading } from "../Loading.jsx";

export class EmailStatus extends React.Component {

    state = {
        emailStatus: null
    }

    componentDidMount() {
        this.showReadStatus()
    }


    componentDidUpdate(prevProps) {
        this.showReadStatus()
    }

    showReadStatus = () => {
        const emails = this.props.emails || [];
        const readEmails = emails.filter(email => email.isRead) || [];
        const emailStatus = parseInt(readEmails.length / (emails.length || 1) * 100);
        this.setState(prevState => {
            if(prevState.emailStatus !== emailStatus) return{ emailStatus }
        });
    }

    render() {

        const { emailStatus } = this.state;

        if (!this.props.emails) return <Loading />

        return (

            <div>
                <div className="status-container">
                    <div className="status-bar" style={{ width: emailStatus }} >
                        <span>{emailStatus + '%'}</span>
                    </div>
                </div>
            </div>
        )
    }
}
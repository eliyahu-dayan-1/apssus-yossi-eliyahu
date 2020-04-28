import { emailService } from "../../services/emailService.js";
import { Loading } from "../Loading.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;
const history = History.createBrowserHistory();

export class EmailDetails extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        const { emailId } = this.props.match.params

        emailService.getById(emailId)
            .then(email => this.setState({ email })
            )
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    convertTimeStamp = () => {
        var date = new Date(this.state.email.sentAt);

        var day = date.getDate()

        var Month = date.getMonth() + 1

        var year = date.getFullYear()
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var clock = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return `${day}/${Month}/${year} ${clock}`
    }


    render() {
        const { email } = this.state;
        const { convertTimeStamp } = this;

        if (!email) return <Loading />

        return (
            <div className="email-details flex column grow-1">
                <div className="return" onClick={() => {
            history.goBack();
        }}><img src="../../assets/img/icons/return.png" alt=""/></div>
                    <div className="details grow-1">
                    <div className="choose"></div>
                    <div className="star">*</div>
                    <div className="bookmark">^</div>
                    <div className="from"></div>
                    <div className="subject">{email.subject}</div>
                    <div className="body">{email.body}</div>}
                <div className="date">{convertTimeStamp()}</div>
                </div>
            </div>
        )
    }
}
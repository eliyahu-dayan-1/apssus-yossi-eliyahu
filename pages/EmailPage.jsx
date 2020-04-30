const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;


import { eventBus } from "../services/eventBusService.js";
import { utilService } from "../services/utilService.js";
import { EmailList } from '../cmps/email/EmailList.jsx';
import { EmailDetails } from '../cmps/email/EmailDetails.jsx';
import { EmailNavBarSide } from '../cmps/email/EmailNavBarSide.jsx';
import { NewEmail } from '../cmps/email/NewEmail.jsx';
import { emailService } from "../services/emailService.js";



export default class EmailPage extends React.Component {
    state = {
        isNewMail: true,
        currUrl: null,
        queryStringData: null,
        isNewMessageOpen: false,
        emails: null,
        previewCategory: null,
        searchValue: null,
        selectedEmail: null,

    }


    componentDidMount() {
        this.loadEmails()
        this.readUrl(undefined)
        eventBus.on('close-new-message', (email) => {
            emailService.addEmail(email)
            // this.setState({ isNewMessageOpen: false})
            var value = this.props.location.pathname
            this.props.history.push(`${value}`)
            this.readUrl(undefined)
        })
    }

    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.previewCategory !== this.props.match.params.previewCategory) {
            this.loadEmails()
        }
        this.readUrl(prevProps)
    }

    loadEmails = () => {
        let previewCategory = this.props.match.params.previewCategory
        previewCategory = [`is${this.capitalize(previewCategory)}`]

        emailService.query(this.state.searchValue, previewCategory)
            .then(emails => {
                this.setState({ emails, previewCategory })
            })
    }

    capitalize = (str) => {
        return str[0].toUpperCase() + str.slice(1);
    }

    readUrl = (prevProps) => {
        const queryString = this.props.location.search;
        let prevQueryString = null
        if (prevProps && prevProps.location) prevQueryString = prevProps.location.search;
        const queryStringData = utilService.getJsonFromUrl(queryString)

        if (!queryStringData.compose && this.state.isNewMessageOpen) this.setState({ isNewMessageOpen: false, queryStringData: { compose: "empty" } }, () => console.log(this.state))
        if (!this.state.isNewMessageOpen && queryStringData.compose === 'newMessage') {
            this.setState({ isNewMessageOpen: true, queryStringData }, () => console.log(this.state))
        }
    }

    getEmails = () => {

    }

    render() {
        const { queryStringData, isNewMessageOpen, emails } = this.state

        return (
            <Router >
                <main className="email-main flex">
                    <EmailNavBarSide history={this.props.history} emails={emails}/>

                    <Switch>
                        <Route component={EmailDetails} path="/email/:previewCategory/:emailId" />
                        <Route exact component={EmailList} path="/email/:previewCategory" />
                    </Switch>

                    {isNewMessageOpen && <NewEmail />}

                </main>
            </Router >
        )
    }
}

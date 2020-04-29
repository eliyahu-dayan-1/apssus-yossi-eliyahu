const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, Link } = ReactRouterDOM;


import { utilService } from "../services/utilService.js";
import { EmailList } from '../cmps/email/EmailList.jsx';
import { EmailDetails } from '../cmps/email/EmailDetails.jsx';
import { EmailNavBarSide } from '../cmps/email/EmailNavBarSide.jsx';
import { NewEmail } from '../cmps/email/NewEmail.jsx';



export default class EmailPage extends React.Component {
    state = {
        isNewMail: true,
        currUrl: null,
        queryStringData: null,
        isNewMessageOpen: false
    }


    componentDidMount() {
        this.readUrl(undefined)
    }

    componentDidUpdate(prevProps) {
        this.readUrl(prevProps)
    }

    readUrl = (prevProps) => {
        const queryString = this.props.location.search;
        let prevQueryString = null
        if(prevProps && prevProps.location) prevQueryString = prevProps.location.search;
        const queryStringData = utilService.getJsonFromUrl(queryString)
        if(!queryStringData.compose && this.state.isNewMessageOpen) this.setState({ isNewMessageOpen: false  ,queryStringData :{compose: "empty"}}, () => console.log(this.state))
        if (!this.state.isNewMessageOpen && queryStringData.compose === 'newMessage') {
            this.setState({ isNewMessageOpen: true ,queryStringData}, () => console.log(this.state))
        }
    }

    render() {
        const { queryStringData, isNewMessageOpen } = this.state

        console.log('email page')
        return (
            <Router >
                <main className="email-main flex">
                    <EmailNavBarSide history={this.props.history} />

                    <Switch>
                        <Route component={EmailDetails} path="/:previewCategory/:emailId" />
                        <Route exact component={EmailList} path="/:previewCategory" />
                    </Switch>

                    {isNewMessageOpen && <NewEmail />}

                </main>
            </Router >
        )
    }
}

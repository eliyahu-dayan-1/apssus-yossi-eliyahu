const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
const history = History.createBrowserHistory()

import HomePage from './pages/HomePage.jsx'
import NotePage from './pages/NotePage.jsx'
import BookPage from './pages/BookPage.jsx'
import MailPage from './pages/MailPage.jsx'
import Footer from './cmps/Footer.jsx'
import NavBar from './cmps/NavBar.jsx'


export class App extends React.Component {

    render() {
        return (
            <Router >
                <div className="page-container flex column">
                    {/* <header> */}
                    <NavBar />
                    {/* main */}
                    <Switch>
                        <Route exact component={HomePage} path="/" />
                        <Route component={NotePage} path="/note" />
                        <Route component={BookPage} path="/book" />
                        <Route component={MailPage} path="/mail" />
                    </Switch>
                    {/*footer */}
                    <Footer />
                </div>
            </Router >

        )
    }
}


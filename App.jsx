import HomePage from './pages/HomePage.jsx';
import NotesPage from './pages/NotesPage.jsx';
import BookPage from './pages/BookPage.jsx';
import EmailPage from './pages/EmailPage.jsx';
import Footer from './cmps/Footer.jsx';
import NavBar from './cmps/NavBar.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <Router >
        <div className="page-container flex column">
          <NavBar />
          <Switch>
              <Route exact component={ HomePage } path="/" />
              <Route component={ NotesPage } path="/notes" />
              <Route component={ BookPage } path="/book" />
              <Route component={ EmailPage } path="/email/:emailId" />
              <Route component={ EmailPage } path="/email" />
          </Switch>
          <Footer />
        </div>
      </Router >
    );
  }
}

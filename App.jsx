import HomePage from './pages/HomePage.jsx';
import NotesApp from './pages/NotesApp.jsx';
import BookPage from './pages/BookPage.jsx';
import EmailPage from './pages/EmailPage.jsx';
import Footer from './cmps/Footer.jsx';
import NavBar from './cmps/NavBar.jsx';
import UserMsg from './cmps/UserMsg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
// const history = History.createBrowserHistory();

export default class App extends React.Component {
  render() {
    return (
      <Router >
        <UserMsg />
        <div className="page-container flex column">
          <NavBar />
          <Switch>
              <Route exact component={ HomePage } path="/" />
              <Route component={ NotesApp } path="/notes" />
              <Route component={ BookPage } path="/book" />
              <Route component={ EmailPage } path="/:previewCategory" />
          </Switch>
          <Footer />
        </div>
      </Router >
    );
  }
}

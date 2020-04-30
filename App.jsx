import HomePage from './pages/HomePage.jsx';
import NotesApp from './pages/NotesApp.jsx';
import BooksApp from './pages/BooksApp.jsx';
import EmailPage from './pages/EmailPage.jsx';
import Footer from './cmps/Footer.jsx';
import NavBar from './cmps/NavBar.jsx';
import UserMsg from './cmps/UserMsg.jsx';
import BookAdd from './cmps/books/BookAdd.jsx';
import BookEdit from './cmps/books/BookEdit.jsx';
import BookDetails from './cmps/books/BookDetails.jsx';

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
              <Route exact component={ BooksApp } path="/book" />

              <Route exact component={ BookAdd } path="/book/add" />
              <Route exact component={ BookEdit } path="/book/edit/:theBookId" />
              <Route component={ BookDetails } path="/book/:theBookId/:theBookName" />

              <Route component={ EmailPage } path="/email/:previewCategory" />
          </Switch>
          <Footer />
        </div>
      </Router >
    );
  }
}

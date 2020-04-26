import UserMsg from './UserMsg.jsx';
import NotesSearch from '../cmps/notes/NotesSearch.jsx';
import {EmailFilter} from '../cmps/email/EmailFilter.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, NavLink } = ReactRouterDOM;
// const history = History.createBrowserHistory();

export default function NavBar() {
  return <Router>
    <nav>
      <header className="main-header flex align-center space-between" >
        <div className="logo-container flex">
          <div className="logo"><a href="#">Appsus</a></div>
        </div>
        <Switch className="switch-search flex">
          <Route component={ NotesSearch } path="/note" />
          <Route component={ EmailFilter } path="/email" />
        </Switch>
        <div className="link-container flex">
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/note">Note</NavLink>
            <NavLink exact to="/book">Book</NavLink>
            <NavLink exact to="/email">Mail</NavLink>
        </div>
      </header>
      </nav>
      <UserMsg />
    </Router >;
}

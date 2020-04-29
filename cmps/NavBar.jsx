import NotesFilter from './notes/NotesFilter.jsx';
import { EmailFilter } from '../cmps/email/EmailFilter.jsx';

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
          <Route component={ NotesFilter } path="/notes" />
          <Route component={ EmailFilter } path="/email" />
        </Switch>
        <div className="link-container flex">
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/notes">Note</NavLink>
            <NavLink exact to="/book">Book</NavLink>
            <NavLink exact to="/inbox">Email</NavLink>
        </div>
      </header>
      </nav>
    </Router >;
}

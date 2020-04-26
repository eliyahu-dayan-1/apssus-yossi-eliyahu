import UserMsg from './UserMsg.jsx';
import NotesSearch from '../cmps/notes/NotesSearch.jsx';

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
        <Switch>
          <Route component={ NotesSearch } path="/note" />
          {/* <Route component={ EmailSearch } path="/email" /> */}
        </Switch>
        <div className="link-container flex">
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/notes">Note</NavLink>
            <NavLink exact to="/book">Book</NavLink>
            <NavLink exact to="/mail">Mail</NavLink>
        </div>
      </header>
      </nav>
      <UserMsg />
    </Router >;
}

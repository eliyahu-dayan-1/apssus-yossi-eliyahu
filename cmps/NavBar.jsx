import NotesFilter from './notes/NotesFilter.jsx';
import { EmailFilter } from '../cmps/email/EmailFilter.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch, NavLink } = ReactRouterDOM;

export default function NavBar() {
  return <Router>
    <nav>
      <header className="main-header">
          <NavLink className="logo-container" exact to="/">
            <img className="logo-image" src="./assets/img/horse.png" alt="Appsus"/>
            <h1 className="logo">Appsus</h1>
          </NavLink>
        <Switch>
          <Route component={ NotesFilter } path="/notes" />
          <Route component={ EmailFilter } path="/email" />
        </Switch>
        <nav className="main-nav">
            <NavLink className="main-nav-link" exact to="/">Home</NavLink>
            <NavLink className="main-nav-link" exact to="/notes">Notes</NavLink>
            <NavLink className="main-nav-link" exact to="/book">Books</NavLink>
            <NavLink className="main-nav-link" exact to="/inbox">Email</NavLink>
        </nav>
      </header>
      </nav>
    </Router >;
}

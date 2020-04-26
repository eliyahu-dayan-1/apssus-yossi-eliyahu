const { NavLink } = ReactRouterDOM;

// import {UserMsg} from './UserMsg.jsx'

export default function NavBar(props) {
  return (
  <nav>
    <header className="main-header flex align-center space-between">
      <div className="logo-container flex">
        <div className="logo"><a href="#">Appsus</a></div>
      </div>
      <div className="link-container flex">
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/note">Note</NavLink>
        <NavLink exact to="/book">Book</NavLink>
        <NavLink exact to="/mail">Mail</NavLink>
      </div>
    </header>
  </nav>
  );
}

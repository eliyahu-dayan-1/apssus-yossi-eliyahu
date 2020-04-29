const { NavLink } = ReactRouterDOM;

export default function Footer() {
  return (
    <footer className="main-footer">
      <NavLink className="footer-logo-container" exact to="/">
        <img className="footer-logo-image" src="./assets/img/horse.png" alt="Appsus"/>
        <h1 className="footer-logo">Appsus</h1>
      </NavLink>
        <small className="copy-right">
          &copy; 2020&nbsp;
          <a className="footer-link" href="https://github.com/eliyahu-dayan-1" target="_blank" rel="noopener noreferrer">Eliyahu Dayan</a> &&nbsp;
          <a className="footer-link" href="https://github.com/joisadler" target="_blank" rel="noopener noreferrer">Yossi Adler</a>
        </small>
    </footer>
  );
}

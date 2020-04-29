const { NavLink } = ReactRouterDOM;
const HomePage = () =>
  (
    <main className="homepage-container">
        <NavLink className="homepage-app-link homepage-notes-link" exact to="/notes"></NavLink>
        <NavLink className="homepage-app-link homepage-books-link" exact to="/book"></NavLink>
        <NavLink className="homepage-app-link homepage-email-link" exact to="/inbox"></NavLink>
    </main>
  );

export default HomePage;

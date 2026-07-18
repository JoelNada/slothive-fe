import {} from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <a href="index.html" class="logo">
        SlotHive
      </a>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link to="listings.html">Browse</Link>
          </li>
          <li>
            <a href="host-dashboard.html">Become a Host</a>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;

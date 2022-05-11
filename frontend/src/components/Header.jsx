import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
function Header() {
  return (
    <header className="header">
      <div className="logo">Support Desk</div>
      <ul>
        <li>
          <Link to={"/register"}>
            <FaUser />
            Register
          </Link>
        </li>
        <li>
          <Link to={"/login"}>
            <FaSignInAlt />
            login
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;

import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <Link to={"/"}>
        <div className="logo">Support Desk</div>
      </Link>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;

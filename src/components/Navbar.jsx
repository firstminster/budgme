import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authUserSlice";
// import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();

  //  retrieve the transaction data from the global store
  const {
    authUser: { userInfo },
  } = useSelector((state) => state);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="nav">
      <div className="nav-items">
        <div className="">
          <Link to="/" className="nav-logo">
            Budgify
          </Link>{" "}
        </div>
        <ul className="nav-links">
          {userInfo ? (
            <li onClick={logoutHandler}>
              <Link to="/login" className="nav-link">
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {/* <li>
            <Link href="/register" className="nav-link">
              Get Started
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import "./App.css";
export default function Navbar({ isLogout }) {
  return (
    <>
      <div className="main_navbar">
        <div className="navbar">
          <h2>APP3</h2>
          <Link to="/">Home</Link>
          {!isLogout && <Link to="/signup">Signup</Link>}
          {!isLogout && <Link to="/login">Login</Link>}
          <Link to="/protected">Protected</Link>

          {isLogout && (
            <Link style={{ color: "red" }} to="/logout">
              <b>Logout</b>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

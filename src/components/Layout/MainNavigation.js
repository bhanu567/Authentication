import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
// import { useEffect, useState } from "react";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logOutHandler = () => {
    // localStorage.removeItem("token");
    // localStorage["token"] = null;
    // setIsLoggedIn(true);
    authCtx.logout();
    history.replace("/");
  };
  // useEffect(() => {
  //   if (localStorage.getItem("token")!=="null") setIsLoggedIn(true);
  // }, []);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

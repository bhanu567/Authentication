import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";

const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logOutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(true);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
  }, []);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
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
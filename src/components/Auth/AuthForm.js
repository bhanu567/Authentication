import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";
export const myKey = "";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let url;
    let alertMessage;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        myKey;
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        myKey;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) throw data.error;

      // localStorage.setItem("token", data.idToken);
      authCtx.login(data.idToken);

      if (isLogin)
        alertMessage = "Successfully LoggedIn with Email : " + data.email;
      else alertMessage = "Successfully Registered with Email : " + data.email;

      alert(alertMessage);
      setIsLoading(false);
      history.replace("/");
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            "Sending Request..."
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

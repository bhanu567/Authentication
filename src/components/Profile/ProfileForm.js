import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { myKey } from "../Auth/AuthForm";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const changePasswordRef = useRef();
  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const newPassword = changePasswordRef.current.value;
    if (newPassword.length > 7) {
      try {
        // const myTokenId = localStorage.getItem("token");
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
            myKey,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtx.token,
              password: newPassword,
              returnSecureToken: false,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!data.error) alert("Password Updated Successfully");
        else throw data.error;

        history.replace("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Enter Password Should have more than 7 characters");
    }
  };
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={changePasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button onClick={changePasswordHandler}>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
